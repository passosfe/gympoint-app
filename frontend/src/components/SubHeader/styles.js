import styled from 'styled-components';

export const SubHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
  margin-top: 10px;

  h1 {
    color: #444;
    font-size: 24px;
  }

  div {
    display: flex;
    flex-direction: row;

    button {
      margin-left: 16px;
    }
  }
`;
