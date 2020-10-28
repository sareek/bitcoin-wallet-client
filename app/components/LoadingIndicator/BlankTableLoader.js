import styled, { keyframes } from 'styled-components';
const LoadingAnim = keyframes`
from {
    background-position: 0 25px;
  }
  to {
    background-position: 100% 25px;
  }
`;
const TableLoader = styled.div`
  background-image: linear-gradient(90deg, #fff 0%, #ccc 100%);
  background-size: 50% 5px;
  background-position: 0 25px;
  background-repeat: repeat-x;
  animation: ${LoadingAnim} 0.5s ease-in-out infinite;
`;

export default TableLoader;
