/**
 * since react doesn't quite support custom events, writing our own handler
 * having the ability to broadcast and emit events prevents files from being tightly coupled
 * if we want something else to happen when an event is emitted, we can just listen for it
 * instead of having to change the code at the point the event is emitted
 *
 * looser coupling = point of broadcast doesn't 'know' what is triggered by that event
 * leads to more extensible code
 * consistent event names help us know what happens when
 *
 * code based on: https://blog.logrocket.com/using-custom-events-react/
 * modified to not use 'document' events and instead use a simple object to store listeners
 */

import { logDebug } from './plugin/logger';

/**
 * central source for event names
 */
export const EVENTS = {
  CLOUD_NOTIFICATION_EVENT: 'cloud:push:notification',
  CONSENTED_EVENT: 'data_collection_consented',
  INTRO_DONE_EVENT: 'intro_done',
};

// object to store an array of 1 or more listeners for each event
const listeners: { [eventName: string]: Function[] } = {};

/**
 * @function starts listening to an event
 * @param eventName {string} the name of the event
 * @param listener event listener, function to execute on event
 */
export function subscribe(eventName: string, listener: Function) {
  logDebug('adding ' + eventName + ' listener');
  listeners[eventName] ||= [];
  listeners[eventName].push(listener);
}

/**
 * @function stops listening to an event
 * @param eventName {string} the name of the event
 * @param listener event listener, function to execute on event
 */
export function unsubscribe(eventName: string, listener: Function) {
  logDebug('removing ' + eventName + ' listener');
  listeners[eventName]?.splice(listeners[eventName].indexOf(listener), 1);
}

/**
 * @function broadcasts an event
 * the data is stored in the "detail" of the event
 * @param eventName {string} the name of the event
 * @param data any additional data to be added to event
 */
export function publish(eventName: string, data: any) {
  logDebug('publishing ' + eventName + ' with data ' + JSON.stringify(data));
  for (let listener of listeners[eventName] || []) {
    listener({ name: eventName, detail: data });
  }
}
