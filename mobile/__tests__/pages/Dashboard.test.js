import React from 'react';
import {
  render,
  wait,
  fireEvent,
  waitForElement,
} from '@testing-library/react-native';
import { addDays, subDays } from 'date-fns';

import { meetup, meetupRequest } from '../helper/objects';
import { apiMock } from '../helper/mocks';
import Dashboard from '~/pages/Dashboard';

describe('Dashboard page', () => {
  it('should get meetups', async () => {
    jest.setTimeout(30000);
    const { getByTestId } = render(<Dashboard />);

    apiMock.onGet('meetups').reply(200, meetupRequest);

    await wait(() => {
      expect(getByTestId('meetup-list')).toHaveProp('data', [meetup]);
    });
  });
});
