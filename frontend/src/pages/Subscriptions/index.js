import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceStrict, addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import api from '~/services/api';
import { formatPrice } from '~/util/format';
import history from '~/services/history';

import { Container, ContentWrapper } from './styles';

import Button from '~/components/Button';
import { SubHeader } from '~/components/SubHeader/styles';
import { Table } from '~/components/Table/styles';
import { TextButton } from '~/components/TextButton/styles';
import PageNavigation from '~/components/PageNavigation';
import EmptyContainer from '~/components/EmptyContainer';
import { Loading } from '~/components/Loading/styles';

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/subscriptions', {
        params: {
          page: currentPage,
          per_page: 10,
        },
      });

      const data = response.data.map(subscription => ({
        ...subscription,
        formattedDuration: formatDistanceStrict(
          addMonths(new Date(), subscription.duration),
          new Date(),
          { locale: pt, unit: 'month' }
        ),
        formattedPrice: formatPrice(subscription.price),
      }));

      setSubscriptions(data);
      setPages(Number(response.headers.num_pages));
    } catch (err) {
      toast.error('Erro ao carregar lista de planos');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadSubscriptions();
  }, [loadSubscriptions]);

  async function handleDelete(subscription) {
    try {
      await api.delete(`/subscriptions/${subscription.id}`);
      toast.success('Plano deletado com sucesso');

      if (currentPage === 1) {
        loadSubscriptions();
      } else {
        setCurrentPage(1);
      }
    } catch (error) {
      toast.error('Erro ao deletar plano');
    }
  }

  return (
    <Container>
      <SubHeader>
        <h1>Gerenciando planos</h1>
        <div>
          <Button onClick={() => history.push('/subscriptions/add')}>
            CADASTRAR
          </Button>
        </div>
      </SubHeader>
      <ContentWrapper>
        {(loading && subscriptions.length <= 0) || subscriptions.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>TÍTULO</th>
                  <th>DURAÇÃO</th>
                  <th>VALOR p/ MÊS</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.map(subscription => (
                  <tr key={String(subscription.id)}>
                    <td>{subscription.title} </td>
                    <td>{subscription.formattedDuration}</td>
                    <td>{subscription.formattedPrice}</td>
                    <td>
                      <div>
                        <Link to={`/subscriptions/${subscription.id}`}>
                          editar
                        </Link>
                        <TextButton
                          type="button"
                          onClick={() =>
                            // eslint-disable-next-line no-alert
                            window.confirm(
                              'Voce tem certeza que quer excluir este plano?'
                            ) && handleDelete(subscription)
                          }
                        >
                          apagar
                        </TextButton>
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
  );
}
