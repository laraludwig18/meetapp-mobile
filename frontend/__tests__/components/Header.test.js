import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import Header from '~/components/Header';
import { user } from '../helper/objects';
import { signOut } from '~/store/modules/auth/actions';

jest.mock('react-router-dom');
jest.mock('react-redux');

describe('Header component', () => {
  it('should render user name', () => {
    useSelector.mockImplementation(cb =>
      cb({
        user: {
          profile: user,
        },
      })
    );

    const { getByTestId, getByText } = render(<Header />);

    expect(getByTestId('user-name')).toContainElement(getByText(user.name));
  });

  it('should sign out', () => {
    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    const { getByTestId } = render(<Header />);

    fireEvent.click(getByTestId('sign-out'));

    expect(dispatch).toHaveBeenCalledWith(signOut());
  });
});
