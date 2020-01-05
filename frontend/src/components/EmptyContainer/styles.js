import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    margin-left: 24px;

    strong {
      font-size: 24px;
      color: #666;
    }

    p {
      margin-top: 10px;
      font-size: 15px;
      color: #999;
    }
  }
`;
