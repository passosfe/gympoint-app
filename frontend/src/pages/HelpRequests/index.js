import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { Container, ContentWrapper, AnswerButton } from './styles';

import { SubHeader } from '~/components/SubHeader/styles';
import { Table } from '~/components/Table/styles';
import PageNavigation from '~/components/PageNavigation';
import EmptyContainer from '~/components/EmptyContainer';
import { Loading } from '~/components/Loading/styles';
import Answer from './Answer';

export default function HelpRequests() {
  const [requests, setRequests] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadRequests = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/help-orders', {
        params: {
          page: currentPage,
          per_page: 10,
        },
      });

      setRequests(response.data);
      setPages(Number(response.headers.num_pages));
    } catch (err) {
      toast.error('Erro ao carregar lista de perguntas');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  function updateList() {
    currentPage > 1 ? setCurrentPage(1) : loadRequests();
  }

  return (
    <>
      <Container>
        <SubHeader>
          <h1>Pedidos de auxilio</h1>
        </SubHeader>
        <ContentWrapper>
          {(loading && requests.length <= 0) || requests.length > 0 ? (
            <>
              <Table>
                <thead>
                  <tr>
                    <th>ALUNO</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map(request => (
                    <tr key={String(request.id)}>
                      <td>{request.student.name} </td>
                      <td>
                        <div>
                          <AnswerButton
                            type="button"
                            onClick={() => Answer(request, updateList)}
                          >
                            responder
                          </AnswerButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <PageNavigation
                pages={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <EmptyContainer />
          )}
          {loading && <Loading />}
        </ContentWrapper>
      </Container>
    </>
  );
}
