import React from 'react';
import { MdKeyboardArrowLeft, MdCheck, MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';

import { ButtonContainer } from './styles';

export default function Button({ children, type, onClick: action }) {
  function handleIcon() {
    switch (children) {
      case 'CADASTRAR': {
        return <MdAdd size={20} color="#fff" />;
      }
      case 'SALVAR': {
        return <MdCheck size={20} color="#fff" />;
      }
      case 'VOLTAR': {
        return <MdKeyboardArrowLeft size={20} color="#fff" />;
      }
      default:
        return '';
    }
  }

  return (
    <ButtonContainer
      back={children === 'VOLTAR'}
      onClick={action ? () => action() : null}
      type={type}
    >
      <div>{handleIcon()}</div>
      {children}
    </ButtonContainer>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  onClick: null,
};
