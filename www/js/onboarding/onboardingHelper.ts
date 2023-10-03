import { DateTime } from "luxon";
import { getAngularService } from "../angular-react-helper";
import { getConfig } from "../config/dynamicConfig";

export const INTRO_DONE_KEY = 'intro_done';

type OnboardingRoute = 'welcome' | 'summary' | 'consent' | 'survey' | 'save-qr' | false;
export type OnboardingState = {
  opcode: string,
  route: OnboardingRoute,
}

export let summaryDone = false;
export const setSummaryDone = (b) => summaryDone = b;

export let saveQrDone = false;
export const setSaveQrDone = (b) => saveQrDone = b;

export let registerUserDone = false;
export const setRegisterUserDone = (b) => registerUserDone = b;

export function getPendingOnboardingState(): Promise<OnboardingState> {
  return Promise.all([getConfig(), readConsented(), readIntroDone()]).then(([config, isConsented, isIntroDone]) => {
    if (isIntroDone) return null; // onboarding is done; no pending state
    let route: OnboardingRoute = false;
    if (!config) {
      route = 'welcome';
    } else if (!isConsented && !summaryDone) {
      route = 'summary';
    } else if (!isConsented) {
      route = 'consent';
    } else if (!saveQrDone) {
      route = 'save-qr';
    } else {
      route = 'survey';
    }
    return { route, opcode: config?.joined?.opcode };
  });
};

async function readConsented() {
  const StartPrefs = getAngularService('StartPrefs');
  return StartPrefs.readConsentState().then(StartPrefs.isConsented) as Promise<boolean>;
}

async function readIntroDone() {
  const KVStore = getAngularService('KVStore');
  return KVStore.get(INTRO_DONE_KEY).then((read_val) => !!read_val) as Promise<boolean>;
}

export async function markIntroDone() {
  const currDateTime = DateTime.now().toISO();
  const KVStore = getAngularService('KVStore');
  return KVStore.set(INTRO_DONE_KEY, currDateTime);
}
