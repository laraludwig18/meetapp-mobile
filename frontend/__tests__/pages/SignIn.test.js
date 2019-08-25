import React from 'react';
import { useDispatch } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import { login } from '../helper/objects';
import SignIn from '~/pages/SignIn';
import { signInRequest } from '~/store/modules/auth/actions';

jest.mock('react-router-dom');
jest.mock('react-redux');

describe('SignIn page', () => {
  it('should call signInRequest', () => {
    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    const { getByTestId } = render(<SignIn />);

    fireEvent.change(getByTestId('email'), {
      target: { value: login.email },
    });
    fireEvent.change(getByTestId('password'), {
      target: { value: login.password },
    });
    fireEvent.submit(getByTestId('form'));

    setTimeout(() => {
      expect(dispatch).toHaveBeenCalledWith(
        signInRequest(login.email, login.password)
      );
    }, 100);
  });
});
