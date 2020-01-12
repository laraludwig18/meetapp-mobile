import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { dateTimeFormat } from '~/utils/format';

import {
  Container,
  EmptyListContainer,
  EmptyListText,
  MeetupList,
} from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  async function loadSubscriptions() {
    const response = await api.get('subscriptions');

    const formattedMeetups = response.data.map(subscription => ({
      subscriptionId: subscription.id,
      meetup: {
        ...subscription.meetup,
        dateFormatted: dateTimeFormat(subscription.meetup.date),
      },
    }));

    setSubscriptions(formattedMeetups);
  }

  async function cancelSubscribe(subscription) {
    try {
      await api.delete(`subscriptions/${subscription.subscriptionId}`);
      loadSubscriptions();
    } catch (error) {
      const { data } = error.response;
      Alert.alert('Houve um erro ao cancelar a sua inscrição', data.error);
    }
  }

  useEffect(() => {
    loadSubscriptions();
  }, [isFocused]);

  return (
    <Background>
      <Header />
      <Container>
        <MeetupList
          data={subscriptions}
          keyExtractor={item => String(item.subscriptionId)}
          ListEmptyComponent={
            <EmptyListContainer>
              <EmptyListText>
                Você não se inscreveu em nenhum evento futuro.
              </EmptyListText>
            </EmptyListContainer>
          }
          renderItem={({ item }) => (
            <Meetup
              isSubscribed
              buttonAction={() => cancelSubscribe(item)}
              item={item.meetup}
            />
          )}
        />
      </Container>
    </Background>
  );
}

export default withNavigationFocus(Subscriptions);

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};
