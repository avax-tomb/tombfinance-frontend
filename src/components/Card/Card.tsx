import React from 'react';
import styled from 'styled-components';

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>;

const StyledCard = styled.div`
  background-color: rgba(255, 255, 255, 0.9); //${(props) => props.theme.color.grey[800]};
  color: #1C8242 !important;
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 10px;
`;

export default Card;
