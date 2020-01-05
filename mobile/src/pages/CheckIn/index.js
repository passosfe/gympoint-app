import React, { useState, useCallback, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import Header from '~/components/Header';

import {
  HeaderWrapper,
  Container,
  CheckinItem,
  CheckinNumber,
  CheckinTime,
  NewCkeckinButton,
} from './styles';

export default function CheckIn() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const id = useSelector(state => state.student.studentId);

  const loadCheckins = useCallback(() => {
    async function load() {
      setCurrentPage(1);
      setLoading(true);
      const response = await api.get(`/students/${id}/checkins`);

      const { count, num_pages } = response.headers;

      setTotalPages(num_pages);
      setTotalItems(count);

      const data = response.data.map((checkin, index) => ({
        ...checkin,
        number: count - index - (currentPage - 1) * 10,
        timeDistance: formatDistance(parseISO(checkin.createdAt), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      }));

      setCheckins(data);
      setLoading(false);
    }

    load();
  }, [id]); // eslint-disable-line

  useEffect(() => {
    loadCheckins();
  }, [loadCheckins]);

  async function handleNewCkeckin() {
    try {
      await api.post(`/students/${id}/checkins`);

      loadCheckins();
    } catch (err) {
      Alert.alert(
        'Erro ao fazer check-in',
        'Só é possivel fazer 5 checkins em um periodo de 7 dias'
      );
    }
  }

  async function loadMore() {
    setLoading(true);
    const page = currentPage + 1;
    const response = await api.get(`/students/${id}/checkins`, {
      params: {
        page,
      },
    });

    const data = response.data.map((checkin, index) => ({
      ...checkin,
      number: totalItems - index - (page - 1) * 10,
      timeDistance: formatDistance(parseISO(checkin.createdAt), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    }));

    setCurrentPage(page);
    setCheckins([...checkins, ...data]);
    setLoading(false);
  }

  return (
    <>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>

      <Container>
        <NewCkeckinButton onPress={handleNewCkeckin}>
          Novo check-in
        </NewCkeckinButton>

        <FlatList
          data={checkins}
          refreshing={loading}
          onRefresh={loadCheckins}
          keyExtractor={checkin => String(checkin.id)}
          onEndReached={() => {
            if (currentPage < totalPages) loadMore();
          }}
          onEndReachedThreshold={2}
          renderItem={({ item }) => (
            <CheckinItem>
              <CheckinNumber>{`Check-in #${item.number}`}</CheckinNumber>
              <CheckinTime>{item.timeDistance}</CheckinTime>
            </CheckinItem>
          )}
        />
      </Container>
    </>
  );
}

CheckIn.navigationOptions = {
  tabBarLabel: 'Check-ins',
  // eslint-disable-next-line react/prop-types
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
