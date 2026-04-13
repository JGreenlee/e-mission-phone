import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { I18nextProvider } from 'react-i18next';
import { PaperProvider } from 'react-native-paper';
import initializedI18next from '../js/i18nextInit';
import { getTheme } from '../js/appTheme';

const theme = getTheme();

const TestProviders = ({ children }: PropsWithChildren) => {
  return (
    <I18nextProvider i18n={initializedI18next}>
      <PaperProvider theme={theme}>{children}</PaperProvider>
    </I18nextProvider>
  );
};

export const renderWithProviders = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(ui, { wrapper: TestProviders, ...options });
};
