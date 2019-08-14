import React, { useEffect, useMemo, useState } from 'react';
import { addDays, subDays } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Background from '~/components/Background';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';
import { dateFormat, dateTimeFormat } from '~/utils/format';

import {
  Container,
  DateText,
  DateContainer,
  DateButton,
  Loader,
  MeetupList,
} from './styles';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const [numPages, setNumPages] = useState(1);
  const [page, setPage] = useState(1);
  const [paginationLoading, setPaginationLoading] = useState(false);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(() => dateFormat(date), [date]);

  async function getMeetups(params) {
    const response = await api.get('meetups', {
      params,
    });

    const formattedMeetups = response.data.meetups.map(meetup => ({
      ...meetup,
      dateFormatted: dateTimeFormat(meetup.date),
    }));

    return { formattedMeetups, numPages: response.data.numPages };
  }

  async function loadMeetups() {
    const data = await getMeetups({ date });

    setMeetups(data.formattedMeetups);
    setNumPages(data.numPages);
    setPage(1);
  }

  useEffect(() => {
    loadMeetups();
    // eslint-disable-next-line
  }, [date]);

  async function loadPaginationMeetups() {
    const data = await getMeetups({ date, page: page + 1 });

    setMeetups(meetups.concat(data.formattedMeetups));
    setNumPages(data.numPages);
    setPaginationLoading(false);
    setPage(page + 1);
  }

  function onEndReached() {
    if (page < numPages) {
      setPaginationLoading(true);
      loadPaginationMeetups();
    }
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
  }

  function renderListFooter() {
    return paginationLoading && <Loader />;
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateContainer>
          <DateButton onPress={handlePrevDay}>
            <Icon name="chevron-left" color="#fff" size={30} />
          </DateButton>

          <DateText>{dateFormatted}</DateText>

          <DateButton onPress={handleNextDay}>
            <Icon name="chevron-right" color="#fff" size={30} />
          </DateButton>
        </DateContainer>

        <MeetupList
          data={meetups}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          ListFooterComponent={renderListFooter}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup item={item} />}
        />
      </Container>
    </Background>
  );
}
