import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  button {
    background: #ee4d64;
    border: 0;
    padding: 10px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  span {
    margin: 0 10px;
    font-size: 18px;
  }
`;
