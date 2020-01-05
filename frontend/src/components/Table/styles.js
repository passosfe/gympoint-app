import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;

  thead {
    tr {
      padding-bottom: 20px;
    }
    th {
      color: #444;
      font-size: 16px;
      text-align: left;
    }
  }

  tbody {
    color: #666;

    tr:first-child > td {
      padding: 16px 0;
    }

    tr + tr > td {
      padding: 16px 0;
      border-top: 1px solid #eee;
    }

    tr > td > div {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;

      a {
        font-size: 15px;
        color: #4d85ee;
      }
    }
  }
`;
