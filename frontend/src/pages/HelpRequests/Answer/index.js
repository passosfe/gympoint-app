import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import '~/styles/alternative-confirm-alert.css';

import api from '~/services/api';

import { Container, Submit } from './styles';

export default function Answer({ id, question }, updateList) {
  async function handleSubmit({ answer }) {
    if (answer.length === 0) {
      toast.error('Escreva uma resposta antes de enviar');
      return false;
    } else if (answer.length <= 10) {
      toast.error('Escreva uma resposta mais detalhada');
      return false;
    }
    try {
      await api.post(`/help-orders/${id}/answer`, {
        answer,
      });

      updateList();
      toast.success('Resposta enviada');
      return true;
    } catch (err) {
      toast.error('Erro ao enviar resposta');
      return false;
    }
  }

  return confirmAlert({
    // eslint-disable-next-line react/prop-types
    customUI: ({ onClose }) => {
      return (
        <>
          <Container>
            <Form
              onSubmit={async data => (await handleSubmit(data)) && onClose()}
            >
              <strong>PERGUNTA DO ALUNO</strong>
              <p>{question}</p>

              <div>
                <strong>SUA RESPOSTA</strong>
                <Input
                  name="answer"
                  type="text"
                  multiline
                  placeholder="Responda aqui"
                />
              </div>

              <Submit type="submit">Responder aluno</Submit>
            </Form>
          </Container>
        </>
      );
    },
  });
}

Answer.propTypes = {
  id: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  updateList: PropTypes.func.isRequired,
};
