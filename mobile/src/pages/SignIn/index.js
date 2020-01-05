import React, { useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

import { Container, Title, IDInput, LoginButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }
  return (
    <Container>
      <Image source={logo} />
      <Title>GYMPOINT</Title>

      <IDInput
        placeholder="Informe seu ID de cadastro"
        onChangeText={setId}
        keyboardType="number-pad"
        autoCorrect={false}
        value={id}
      />
      <LoginButton onPress={handleSubmit} loading={loading}>
        Entrar no sistema
      </LoginButton>
    </Container>
  );
}
