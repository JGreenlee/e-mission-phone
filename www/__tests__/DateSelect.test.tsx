import React from 'react';
import { screen } from '@testing-library/react-native';
import DateSelect from '../js/diary/list/DateSelect';
import { renderWithProviders } from './_uiTestUtils';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ bottom: 30, left: 0, right: 0, top: 30 }),
}));

describe('DateSelect', () => {
  it('renders correctly', () => {
    const onChooseMock = jest.fn();
    renderWithProviders(<DateSelect mode="range" onChoose={onChooseMock} />);

    expect(screen.getByTestId('button-container')).toBeTruthy();
    expect(screen.getByTestId('button')).toBeTruthy();
  });
});
