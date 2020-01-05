import styled from 'styled-components';
import AsyncSelect from 'react-select/async';

export const Input = styled(AsyncSelect)`
  & > div {
    padding: 4.5px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;

    &::placeholder {
      color: #999;
    }
  }
`;
