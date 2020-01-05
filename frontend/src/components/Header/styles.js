import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 16px 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      height: 24px;
      margin-right: 13px;
    }

    strong {
      font-size: 15px;
      color: #ee4d64;
      margin-right: 30px;
      padding-right: 30px;
      border-right: 1px solid #eee;
    }

    a {
      font-size: 15px;
      font-weight: bold;
      margin-right: 20px;
      color: #999;

      &.selected {
        color: #444;
      }

      &:hover {
        border-bottom: 1px solid #444;
      }
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    strong {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }

    button {
      background: none;
      border: 0;
      color: #de3b3b;
    }
  }
`;
