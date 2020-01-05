import React, { useState, useEffect } from 'react';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import { Container, ContentWrapper } from './styles';
import { SubHeader } from '~/components/SubHeader/styles';
import Button from '~/components/Button';

export default function StudentForm({ match }) {
  const [student, setStudent] = useState({});

  const { id } = match.params;

  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('Insira um e-mail'),
    age: Yup.number()
      .typeError('Idade deve ser um número')
      .min(10, 'Digite uma idade válida')
      .required('A idade é obrigatória'),
    weight: Yup.number()
      .min(1, 'Digite um peso válida')
      .typeError('O peso deve ser um número')
      .required('O peso é obrigatório'),
    height: Yup.number()
      .min(1, 'Digite uma altura válida')
      .typeError('A idade deve conter um valor numérico')
      .required('A altura é obrigatória'),
  });

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`students/${id}`);
      const { name, email, age, weight, height } = response.data;

      setStudent({ name, email, age, weight, height });
    }

    if (id) {
      loadStudent();
    }
  }, [id]);

  async function handleSubmit({ name, email, age, weight, height }) {
    if (id) {
      const new_email = email !== student.email ? email : null;
      email = student.email;

      try {
        await api.put(`students/${id}`, {
          name,
          email,
          ...(email !== student.email && { new_email }),
          age,
          weight,
          height,
        });
        toast.success('Aluno atualizado');
        history.goBack();
      } catch (err) {
        toast.error('Erro ao atualizar, verifique novamente os dados');
      }
    } else {
      try {
        await api.post('/students', {
          name,
          email,
          age,
          weight,
          height,
        });
        toast.success('Aluno cadastrado');
        history.goBack();
      } catch (err) {
        toast.error('Erro ao cadastrar, verifique novamente os dados');
      }
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={student} schema={schema}>
        <SubHeader>
          <h1>{id ? 'Edição de aluno' : 'Cadastro de aluno'}</h1>
          <div>
            <Button onClick={() => history.goBack()}>VOLTAR</Button>
            <Button type="submit">SALVAR</Button>
          </div>
        </SubHeader>
        <ContentWrapper>
          <strong>NOME COMPLETO</strong>
          <Input name="name" placeholder="John Doe" />

          <strong>ENDEREÇO DE E-MAIL</strong>
          <Input name="email" placeholder="exemplo@email.com" />

          <div>
            <div>
              <strong>IDADE</strong>
              <Input name="age" />
            </div>
            <div>
              <strong>PESO (em kg)</strong>
              <Input name="weight" />
            </div>
            <div>
              <strong>ALTURA</strong>
              <Input name="height" />
            </div>
          </div>
        </ContentWrapper>
      </Form>
    </Container>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

StudentForm.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
