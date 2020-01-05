import styled from 'styled-components/native';
import { Platform } from 'react-native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #fff;
  padding: 0 25px;

  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
  color: #ee4d64;
`;

export const IDInput = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  margin-top: 20px;
  font-size: 15px;
  padding: 13px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  align-self: stretch;
`;

export const LoginButton = styled(Button)`
  align-self: stretch;
  margin-top: 15px;
`;
