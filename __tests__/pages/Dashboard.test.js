import React from 'react';
import { render, wait } from '@testing-library/react-native';

import { meetup, meetupRequest } from '../helper/objects';
import { apiMock } from '../helper/mocks';
import Dashboard from '~/pages/Dashboard';

jest.mock('date-fns', () => ({
  format: jest.fn().mockReturnValue('20 de julho, às 16h'),
  parseISO: jest.fn().mockReturnValue('2019-07-20'),
}));

describe('Dashboard page', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get meetups', async () => {
    const { getByTestId } = render(<Dashboard />);
    apiMock.onGet('meetups').reply(200, meetupRequest);
    await wait(() => {
      expect(getByTestId('meetup-list')).toHaveProp('data', [meetup]);
    });
  });
});
