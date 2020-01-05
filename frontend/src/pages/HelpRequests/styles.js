import styled from 'styled-components';
import { TextButton } from '~/components/TextButton/styles';

export const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  background: #fff;
  padding: 30px 30px 14px;
  border-radius: 4px;
`;

export const AnswerButton = styled(TextButton)`
  align-self: flex-end;
`;
