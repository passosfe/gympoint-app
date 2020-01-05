import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from 'react-redux';
import { formatDistance, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';

import api from '~/services/api';

import {
  Container,
  NewHelpRequest,
  HelpItem,
  Info,
  Answered,
  HelpTime,
  Question,
} from './styles';

export default function Help({ navigation }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const id = useSelector(state => state.student.studentId);

  const loadRequests = useCallback(() => {
    async function load() {
      setCurrentPage(1);
      setLoading(true);
      const response = await api.get(`/students/${id}/help-orders`);

      setTotalPages(response.headers.num_pages);

      const data = response.data.map(request => ({
        ...request,
        answered: !!request.answer,
        timeDistance: formatDistance(parseISO(request.created_at), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      }));

      setRequests(data);
      setLoading(false);
    }

    load();
  }, [id]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  async function loadMore() {
    setLoading(true);
    const page = currentPage + 1;

    const response = await api.get(`/students/${id}/help-orders`, {
      params: {
        page,
      },
    });

    const data = response.data.map(request => ({
      ...request,
      answered: !!request.answer,
      timeDistance: formatDistance(parseISO(request.created_at), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    }));

    setCurrentPage(page);
    setRequests([...requests, ...data]);
    setLoading(false);
  }

  return (
    <>
      <Container>
        <NewHelpRequest onPress={() => navigation.push('NewHelpRequest')}>
          Novo pedido de auxílio
        </NewHelpRequest>

        <FlatList
          data={requests}
          refreshing={loading}
          onRefresh={loadRequests}
          keyExtractor={request => String(request.id)}
          onEndReached={() => {
            if (currentPage < totalPages) loadMore();
          }}
          onEndReachedThreshold={0.2}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                navigation.navigate('QuestionDetails', { question: item })
              }
            >
              <HelpItem>
                <Info>
                  <Answered answered={item.answered}>
                    {item.answered ? 'Respondido' : 'Sem resposta'}
                  </Answered>
                  <HelpTime>{item.timeDistance}</HelpTime>
                </Info>

                <Question numberOfLines={3}>{item.question}</Question>
              </HelpItem>
            </TouchableWithoutFeedback>
          )}
        />
      </Container>
    </>
  );
}

Help.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
};
