import React from 'react';

import { Container, Logo, Title } from './styles';

import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <Container>
      <Logo source={logo} size={20} />
      <Title>GYMPOINT</Title>
    </Container>
  );
}
