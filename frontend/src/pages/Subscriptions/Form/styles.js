import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  strong {
    font-size: 14px;
    color: #444;
  }

  span {
    margin-top: 10px;
    color: #fb6f91;
  }

  & > input {
    margin-bottom: 20px;
  }

  input {
    margin-top: 8px;
    padding: 13px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;

    &::placeholder {
      color: #999;
    }

    &:disabled {
      background: #f5f5f5;
    }
  }

  div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 15px;

    div {
      display: flex;
      flex-direction: column;
    }
  }
`;
