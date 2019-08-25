import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';

import { meetup } from '../helper/objects';
import MeetupDetail from '~/pages/MeetupDetail';
import { removeMeetup } from '~/store/modules/meetup/actions';

jest.mock('react-router-dom');
jest.mock('react-redux');

const match = {
  params: {
    id: meetup.id,
  },
};

describe('MeetupDetail page', () => {
  it('should render loading', () => {
    useSelector.mockImplementation(cb =>
      cb({
        meetup: {
          info: null,
          loading: true,
        },
      })
    );

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    const { getByTestId, getByText } = render(<MeetupDetail match={match} />);

    expect(getByTestId('loading')).toContainElement(getByText('Carregando...'));
  });

  it('should render meetup detail', () => {
    useSelector.mockImplementation(cb =>
      cb({
        meetup: {
          info: meetup,
          loading: false,
        },
      })
    );

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    const { getByTestId, getByText } = render(<MeetupDetail match={match} />);

    expect(getByTestId('title')).toContainElement(getByText(meetup.title));
    expect(getByTestId('description')).toContainElement(
      getByText(meetup.description)
    );
    expect(getByTestId('location')).toContainElement(
      getByText(meetup.location)
    );
  });

  it('should cancel meetup', () => {
    useSelector.mockImplementation(cb =>
      cb({
        meetup: {
          info: meetup,
          loading: false,
        },
      })
    );

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    const { getByTestId } = render(<MeetupDetail match={match} />);

    fireEvent.click(getByTestId('cancel-meetup'));

    expect(dispatch).toHaveBeenCalledWith(removeMeetup(meetup.id));
  });
});
