import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '~/services/api';

import Button from '~/components/Button';
import { SubHeader } from '~/components/SubHeader/styles';
import { Table } from '~/components/Table/styles';
import { TextButton } from '~/components/TextButton/styles';

import { Container, ContentWrapper, Search } from './styles';
import history from '~/services/history';
import PageNavigation from '~/components/PageNavigation';
import EmptyContainer from '~/components/EmptyContainer';
import { Loading } from '~/components/Loading/styles';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState('');
  const [pages, setPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/students', {
        params: {
          page: currentPage,
          per_page: 10,
          name: filter,
        },
      });

      setStudents(response.data);
      setPages(Number(response.headers.num_pages));
    } catch (err) {
      toast.error('Erro ao carregar lista de alunos');
    } finally {
      setLoading(false);
    }
  }, [currentPage, filter]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  async function handleDelete(student) {
    try {
      await api.delete(`/students/${student.id}`);
      toast.success('Aluno deletado com sucesso');

      if (currentPage === 1) {
        loadStudents();
      } else {
        setCurrentPage(1);
      }
    } catch (error) {
      toast.error('Erro ao deletar aluno');
    }
  }

  return (
    <Container>
      <SubHeader>
        <h1>Gerenciando alunos</h1>
        <div>
          <Button onClick={() => history.push('/students/add')}>
            CADASTRAR
          </Button>
          <Search
            type="text"
            placeholder="Buscar aluno"
            onChange={e => setFilter(e.target.value)}
          />
        </div>
      </SubHeader>
      <ContentWrapper>
        {(loading && students.length <= 0) || students.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>E-MAIL</th>
                  <th>IDADE</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={String(student.id)}>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>
                      <div>
                        <Link
                          to={{
                            pathname: `/students/${student.id}`,
                            state: student,
                          }}
                        >
                          editar
                        </Link>
                        <TextButton
                          type="button"
                          onClick={() =>
                            // eslint-disable-next-line no-alert
                            window.confirm(
                              'Voce tem certeza que quer excluir este aluno?'
                            ) && handleDelete(student)
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
