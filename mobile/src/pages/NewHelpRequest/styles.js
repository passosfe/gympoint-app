import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  padding: 20px;
  background: #f2f2f2;
  flex: 1;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

export const QuestionInput = styled.TextInput`
  height: 300px;
  color: #666;
  font-size: 16px;
  line-height: 25px;
  padding: 20px;
  border: 1px solid ${props => (props.error ? '#ee4e62' : '#ddd')};
  border-radius: 4px;
  background: #fff;
`;

export const ErrorMessage = styled.Text`
  margin-top: 5px;
  color: #ee4e62;
`;
