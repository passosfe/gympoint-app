import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 450px;
  z-index: 999;
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  div {
    display: flex;
    flex-direction: column;
  }

  strong {
    font-size: 14px;
    color: #444;
    margin-bottom: 8px;
  }

  p {
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
  }

  textarea {
    overflow: auto;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    resize: none;
    border: 1px solid #eee;
    margin-bottom: 21px;
    border-radius: 4px;
    font-size: 14px;
    color: #666;
    padding: 13px 15px;
    height: 120px;

    &::placeholder {
      color: #999;
    }
  }
`;

export const Submit = styled.button`
  width: 100%;
  align-items: center;
  padding: 8px 16px;
  border: 0;
  border-radius: 4px;
  background: #ee4d64;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.2s;

  &:hover {
    background: ${props =>
      props.back ? darken(0.08, '#ccc') : darken(0.08, '#ee4d64')};
  }
`;
