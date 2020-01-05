import React from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function PageNavigation({ pages, currentPage, setCurrentPage }) {
  return (
    <Container>
      <button
        disabled={currentPage <= 1}
        type="button"
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        <MdKeyboardArrowLeft size={20} color="#fff" />
      </button>
      <span>{currentPage}</span>
      <button
        disabled={currentPage >= pages}
        type="button"
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <MdKeyboardArrowRight size={20} color="#fff" />
      </button>
    </Container>
  );
}

PageNavigation.propTypes = {
  pages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};
