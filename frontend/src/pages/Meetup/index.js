import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import * as Yup from 'yup';

import {
  createMeetup,
  updateMeetup,
  saveMeetupRequest,
} from '~/store/modules/meetup/actions';
import DatePicker from '~/components/DatePicker';
import BannerInput from './BannerInput';
import { Container } from './styles';

const schema = Yup.object().shape({
  banner_id: Yup.string().required('O banner é obrigatório'),
  title: Yup.string().required('O campo título é obrigatório'),
  description: Yup.string().required('O campo descrição é obrigatório'),
  date: Yup.date('Data inválida').required('O campo data é obrigatório'),
  location: Yup.string().required('O campo localização é obrigatório'),
});

export default function Meetup({ match }) {
  const [hasMeetup] = useState(!!match.params.id);
  const dispatch = useDispatch();
  const meetup = useSelector(state => (hasMeetup ? state.meetup.info : null));
  const loading = useSelector(state => state.meetup.loading);

  useEffect(() => {
    if (hasMeetup) {
      dispatch(saveMeetupRequest(match.params.id));
    }
  }, [dispatch, hasMeetup, match]);

  function handleSubmit(data) {
    if (hasMeetup) {
      dispatch(updateMeetup(data, meetup.id));
    } else {
      dispatch(createMeetup(data));
    }
  }

  return (
    <Container>
      {loading && hasMeetup ? (
        <p>Carregando...</p>
      ) : (
        <Form schema={schema} onSubmit={handleSubmit} initialData={meetup}>
          <BannerInput name="banner_id" />
          <Input name="title" placeholder="Título do Meetup" />
          <Input
            name="description"
            multiline
            placeholder="Descrição completa"
          />
          <DatePicker name="date" />
          <Input name="location" placeholder="Localização" />

          <button className="save-meetup" type="submit">
            <MdAddCircleOutline size={20} />
            Salvar meetup
          </button>
        </Form>
      )}
    </Container>
  );
}

Meetup.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
