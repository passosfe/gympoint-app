import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #ee4e62;
  margin-left: 8px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 35px;
`;
