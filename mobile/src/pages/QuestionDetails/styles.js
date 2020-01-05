import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
  background: #f2f2f2;
  flex: 1;
`;

export const QuestionWrapper = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px 20px 0;
  flex-direction: column;
  margin-top: 10px;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Section = styled.Text`
  color: #444;
  font-weight: bold;
`;

export const QuestionTime = styled.Text`
  color: #666;
`;

export const Text = styled.Text`
  margin-top: 16px;
  margin-bottom: 20px;
  color: #666;
  line-height: 26px;
`;
