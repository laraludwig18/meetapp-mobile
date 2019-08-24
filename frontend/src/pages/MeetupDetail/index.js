import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdCreate, MdDateRange, MdDelete, MdLocationOn } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  removeMeetup,
  saveMeetupRequest,
} from '~/store/modules/meetup/actions';
import { Container, Meetup } from './styles';

export default function MeetupDetail({ match }) {
  const meetup = useSelector(state => state.meetup.info);
  const loading = useSelector(state => state.meetup.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveMeetupRequest(match.params.id));
  }, [dispatch, match.params, match.params.id]);

  const dateFormatted = useMemo(() => {
    if (meetup) {
      return format(parseISO(meetup.date), "d 'de' MMMM', às' HH'h'", {
        locale: pt,
      });
    }
    return null;
  }, [meetup]);

  function cancelMeetup() {
    dispatch(removeMeetup(meetup.id));
  }

  return (
    <Container>
      {loading ? (
        <p data-testid="loading">Carregando...</p>
      ) : (
        <>
          <div>
            <h1 data-testid="title">{meetup.title}</h1>
            <div>
              <Link to={`/meetup/${meetup.id}`}>
                <MdCreate size={20} color="#fff" />
                Editar
              </Link>
              <button
                data-testid="cancel-meetup"
                type="button"
                onClick={cancelMeetup}
              >
                <MdDelete size={20} color="#fff" />
                Cancelar
              </button>
            </div>
          </div>
          <Meetup>
            <img src={meetup.banner.url} alt={meetup.title} />
            <p data-testid="description">{meetup.description}</p>
            <div>
              <MdDateRange size={20} color="rgba(255, 255, 255, 0.6)" />
              <span>{dateFormatted}</span>

              <MdLocationOn size={20} color="rgba(255, 255, 255, 0.6)" />
              <span data-testid="location">{meetup.location}</span>
            </div>
          </Meetup>
        </>
      )}
    </Container>
  );
}

MeetupDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
