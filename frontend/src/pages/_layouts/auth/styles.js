import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  padding: 50px 30px;

  img {
    width: 100px;
  }

  h1 {
    margin-top: 10px;
    color: #ee4d64;
    font-size: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 25px;

    strong {
      margin-top: 5px;
      text-align: left;
      font-size: 14px;
      line-height: 16px;
      color: #444;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 8px 0 15px;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      height: 44px;
      background: #ee4d64;
      border: 0;
      border-radius: 4px;
      font-weight: bold;
      color: #fff;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }
    }
  }
`;
