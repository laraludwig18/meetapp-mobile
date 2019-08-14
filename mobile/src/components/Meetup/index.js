import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import {
  Banner,
  Container,
  SubscriptionButton,
  Text,
  TextContainer,
  Title,
  Wrapper,
} from './styles';

export default function Meetup({ item, isSubscribed }) {
  const buttonText = useMemo(() => {
    return `${isSubscribed ? 'Cancelar' : 'Realizar'} inscrição`;
  }, [isSubscribed]);

  return (
    <Container>
      <Banner
        source={{
          uri: item.banner.url,
        }}
      />
      <Wrapper>
        <Title>{item.title}</Title>
        <TextContainer>
          <Icon name="event" color="#999999" size={14} />
          <Text>{item.dateFormatted}</Text>
        </TextContainer>
        <TextContainer>
          <Icon name="place" color="#999999" size={14} />
          <Text>{item.location}</Text>
        </TextContainer>
        <TextContainer>
          <Icon name="person" color="#999999" size={14} />
          <Text>Organizador:</Text>
          <Text>{item.user.name}</Text>
        </TextContainer>
        <SubscriptionButton onPress={() => {}}>{buttonText}</SubscriptionButton>
      </Wrapper>
    </Container>
  );
}

Meetup.propTypes = {
  isSubscribed: PropTypes.bool,
};

Meetup.defaultProps = {
  isSubscribed: false,
};
