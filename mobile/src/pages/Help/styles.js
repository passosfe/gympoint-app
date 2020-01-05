import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  padding: 20px 20px 0;
  background: #f2f2f2;
  flex: 1;
`;

export const NewHelpRequest = styled(Button)`
  margin-bottom: 10px;
`;

export const HelpItem = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  flex-direction: column;
  margin-top: 10px;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Answered = styled.Text`
  color: ${props => (props.answered ? '#42cb59' : '#999')};
  font-weight: bold;
  margin-left: 20px;
`;

export const HelpTime = styled.Text`
  color: #666;
`;

export const Question = styled.Text`
  margin-top: 16px;
  color: #666;
  line-height: 26px;
`;
