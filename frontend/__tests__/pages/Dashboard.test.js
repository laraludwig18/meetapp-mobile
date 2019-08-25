import React from 'react';
import { render } from '@testing-library/react';

import { schedule } from '../helper/objects';
import { apiMock } from '../helper/mocks';
import Dashboard from '~/pages/Dashboard';

jest.mock('react-router-dom');

describe('Dashboard page', () => {
  it('should get schedule', () => {
    const { getByTestId, getByText } = render(<Dashboard />);

    apiMock.onGet('schedule').reply(200, [schedule]);

    setTimeout(() => {
      expect(getByTestId('meetup-list')).toContainElement(
        getByText(schedule.title)
      );
    }, 100);
  });
});
