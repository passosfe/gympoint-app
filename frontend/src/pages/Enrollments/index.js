import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import { MdCheckCircle } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, ContentWrapper } from './styles';

import Button from '~/components/Button';
import { SubHeader } from '~/components/SubHeader/styles';
import { Table } from '~/components/Table/styles';
import { TextButton } from '~/components/TextButton/styles';
import PageNavigation from '~/components/PageNavigation';
import EmptyContainer from '~/components/EmptyContainer';
import { Loading } from '~/components/Loading/styles';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadEnrollments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/enrollments', {
        params: {
          page: currentPage,
          per_page: 10,
        },
      });

      const data = response.data.map(subscription => ({
        ...subscription,
        formattedStart: format(
          parseISO(subscription.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        formattedEnd: format(
          parseISO(subscription.end_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
      }));

      setEnrollments(data);
      setPages(Number(response.headers.num_pages));
    } catch (err) {
      toast.error('Erro ao carregar lista de matrículas');
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadEnrollments();
  }, [loadEnrollments]);

  async function handleDelete(enrollment) {
    try {
      await api.delete(`/enrollments/${enrollment.id}`);
      toast.success('Matrícula cancelada com sucesso');

      if (currentPage === 1) {
        loadEnrollments();
      } else {
        setCurrentPage(1);
      }
    } catch (error) {
      toast.error('Erro ao cancelar matrícula');
    }
  }

  return (
    <Container>
      <SubHeader>
        <h1>Gerenciando matrículas</h1>
        <div>
          <Button onClick={() => history.push('/enrollments/add')}>
            CADASTRAR
          </Button>
        </div>
      </SubHeader>
      <ContentWrapper>
        {(loading && enrollments.length <= 0) || enrollments.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>ALUNO</th>
                  <th>PLANO</th>
                  <th>INÍCIO</th>
                  <th>TÉRMINO</th>
                  <th>ATIVA</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map(enrollment => (
                  <tr key={String(enrollment.id)}>
                    <td>{enrollment.student.name} </td>
                    <td>{enrollment.subscription.title}</td>
                    <td>{enrollment.formattedStart}</td>
                    <td>{enrollment.formattedEnd}</td>
                    <td>
                      <MdCheckCircle
                        size={20}
                        color={enrollment.is_valid ? '#42CB59' : '#DDDDDD'}
                      />
                    </td>
                    <td>
                      <div>
                        <Link to={`/enrollments/${enrollment.id}`}>editar</Link>
                        <TextButton
                          type="button"
                          onClick={() =>
                            // eslint-disable-next-line no-alert
                            window.confirm(
                              'Voce tem certeza que quer cancelar esta matrícula?'
                            ) && handleDelete(enrollment)
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
