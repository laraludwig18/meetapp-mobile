import React, { useEffect, useState } from 'react';

import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { dateTimeFormat } from '~/utils/format';

import { Container, MeetupList } from './styles';

export default function Subscriptions() {
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups() {
    const response = await api.get('subscriptions');

    const formattedMeetups = response.data.map(meetup => ({
      ...meetup,
      dateFormatted: dateTimeFormat(meetup.date),
    }));

    setMeetups(formattedMeetups);
  }

  useEffect(() => {
    loadMeetups();
  }, []);

  return (
    <Background>
      <Header />
      <Container>
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup isSubscribed item={item} />}
        />
      </Container>
    </Background>
  );
}
