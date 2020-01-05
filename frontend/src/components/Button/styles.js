import styled from 'styled-components';
import { darken } from 'polished';

export const ButtonContainer = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  border: 0;
  border-radius: 4px;
  background: ${props => (props.back ? '#ccc' : '#ee4d64')};
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.2s;

  div {
    height: 20px;
    width: 20px;
    margin-right: 8px;
  }

  &:hover {
    background: ${props =>
      props.back ? darken(0.08, '#ccc') : darken(0.08, '#ee4d64')};
  }
`;
