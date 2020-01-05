import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/logo.svg';

import { Container, Content } from './styles';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  function handleLogOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />
          <strong>GYMPOINT</strong>

          <NavLink to="/students" activeClassName="selected">
            ALUNOS
          </NavLink>
          <NavLink to="/subscriptions" activeClassName="selected">
            PLANOS
          </NavLink>
          <NavLink to="/enrollments" activeClassName="selected">
            MATRÍCULAS
          </NavLink>
          <NavLink to="/requests" activeClassName="selected">
            PEDIDOS
          </NavLink>
        </nav>

        <aside>
          <strong>Felipe Passos</strong>
          <button type="button" onClick={handleLogOut}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
