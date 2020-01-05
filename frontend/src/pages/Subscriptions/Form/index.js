import React, { useState, useEffect } from 'react';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';

import { formatPrice } from '~/util/format';
import history from '~/services/history';
import api from '~/services/api';

import { Container, ContentWrapper } from './styles';
import { SubHeader } from '~/components/SubHeader/styles';
import Button from '~/components/Button';

export default function SubscriptionForm({ match }) {
  const [subscription, setSubscription] = useState({});
  const [price, setPrice] = useState(0);

  const { id } = match.params;

  const schema = Yup.object().shape({
    title: Yup.string().required('Título é obrigatório'),
    duration: Yup.number()
      .typeError('Duração deve ser um numero')
      .required('Insira uma duração'),
  });

  useEffect(() => {
    async function loadSubscription() {
      const response = await api.get(`subscriptions/${id}`);

      const { title, duration, price: unfPrice } = response.data;

      setSubscription({
        title,
        duration,
        total: formatPrice(Number(duration) * Number(unfPrice)),
      });
      setPrice(unfPrice);
    }

    if (id) {
      loadSubscription();
    }
  }, [id]);

  async function handleSubmit({ title, duration }) {
    if (id) {
      try {
        await api.put(`subscriptions/${id}`, {
          title,
          duration,
          price,
        });
        toast.success('Plano atualizado');
        history.goBack();
      } catch (err) {
        toast.error('Erro ao atualizar, verifique novamente os dados');
      }
    } else {
      try {
        await api.post('/subscriptions', {
          title,
          duration,
          price,
        });
        toast.success('Plano cadastrado');
        history.goBack();
      } catch (err) {
        toast.error('Erro ao cadastrar, verifique novamente os dados');
      }
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} initialData={subscription} schema={schema}>
        <SubHeader>
          <h1>{id ? 'Edição de plano' : 'Cadastro de plano'}</h1>
          <div>
            <Button onClick={() => history.goBack()}>VOLTAR</Button>
            <Button type="submit">SALVAR</Button>
          </div>
        </SubHeader>
        <ContentWrapper>
          <strong>TÍTULO DO PLANO</strong>
          <Input name="title" />

          <div>
            <div>
              <strong>DURAÇÃO (em meses)</strong>
              <Input name="duration" type="number" />
            </div>
            <div>
              <strong>PREÇO MENSAL</strong>
              <NumberFormat
                name="price"
                value={price}
                thousandSeparator
                prefix="R$ "
                onValueChange={({ floatValue }) => {
                  setPrice(floatValue);
                }}
                decimalScale="2"
                allowNegative={false}
              />
            </div>
            <div>
              <strong>PREÇO TOTAL</strong>
              <Input name="total" disabled />
            </div>
          </div>
        </ContentWrapper>
      </Form>
    </Container>
  );
}

SubscriptionForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

SubscriptionForm.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: null,
    }),
  }),
};
