import styled from 'styled-components/native';
import Button from '~/components/Button';

export const HeaderWrapper = styled.SafeAreaView`
  border: 1px solid #ddd;
`;

export const Container = styled.View`
  padding: 20px 20px 0;
  background: #f2f2f2;
  flex: 1;
`;

export const NewCkeckinButton = styled(Button)`
  margin-bottom: 10px;
`;

export const CheckinItem = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px 20px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

export const CheckinNumber = styled.Text`
  color: #444;
  font-weight: bold;
`;

export const CheckinTime = styled.Text`
  color: #666;
`;
