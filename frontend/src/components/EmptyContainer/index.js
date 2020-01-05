import React from 'react';
import { MdReport } from 'react-icons/md';

import { Container } from './styles';

export default function EmptyContainer() {
  return (
    <Container>
      <MdReport size={128} color="#ee4d64" />
      <div>
        <strong>Sem resultados</strong>
        <p>Altere seu filtro de busca ou adicione novos items</p>
      </div>
    </Container>
  );
}
