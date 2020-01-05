import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

export const ContentWrapper = styled.div`
  background: #fff;
  padding: 30px 30px 14px;
  border-radius: 4px;
`;

export const Search = styled.input`
  margin-left: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px 40px;
  font-size: 14px;
  color: #666;

  &::placeholder {
    font-size: 14px;
    color: #999;
  }
`;
