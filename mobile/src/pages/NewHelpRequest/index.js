import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import api from '~/services/api';

import { Container, QuestionInput, SubmitButton, ErrorMessage } from './styles';

export default function NewHelpRequest({ navigation }) {
  const [question, setNewQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const id = useSelector(state => state.student.studentId);

  async function handleSubmit() {
    if (question.length === 0) {
      setError('Insira seu pedido');
    } else if (question.length <= 10) {
      setError('Favor inserir mais detalhes');
    } else {
      setLoading(true);
      try {
        await api.post(`/students/${id}/help-orders`, { question });

        setLoading(false);
        navigation.goBack();
      } catch (err) {
        setLoading(false);

        Alert.alert('Erro ao enviar a sua dúvida', 'Favor tente novamente');
      }
    }
  }

  return (
    <Container>
      <QuestionInput
        placeholder="Inclua seu pedido de auxílio"
        multiline
        onChangeText={value => {
          setNewQuestion(value);
          setError(false);
        }}
        textAlignVertical="top"
        value={question}
        autoCapitalize="sentences"
        autoFocus
        onSubmitEditing={handleSubmit}
        returnKeyType="send"
        error={!!error}
      />
      {!!error && <ErrorMessage>{error}</ErrorMessage>}

      <SubmitButton loading={loading} onPress={handleSubmit}>
        Enviar pedido
      </SubmitButton>
    </Container>
  );
}

NewHelpRequest.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
