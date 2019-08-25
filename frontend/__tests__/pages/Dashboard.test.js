import React from 'react';
import { render, waitForElement } from '@testing-library/react';

import { schedule } from '../helper/objects';
import { apiMock } from '../helper/mocks';
import Dashboard from '~/pages/Dashboard';

jest.mock('react-router-dom');

describe('Dashboard page', () => {
  it('should get schedule', async () => {
    const { getByTestId } = render(<Dashboard />);

    apiMock.onGet('schedule').reply(200, [schedule]);

    await waitForElement(() => getByTestId(String(schedule.id)));
  });
});
