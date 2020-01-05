import styled from 'styled-components';

export const Loading = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  left: calc(50% - 40px);
  top: calc(50% - 40px);
  &:after {
    content: '';
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #eb314c;
    border-color: #eb314c transparent #eb314c transparent;
    animation: dual-ring 1.2s linear infinite;
    z-index: 9999;
  }
  &:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #0002;
  }
  @keyframes dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
