import { Separator } from 'react-resizable-panels';
import styled from 'styled-components';

export const StyledSeparator = styled(Separator)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  width: 9px;
  user-select: none;
  touch-action: none;
  transition: width 0.2s ease-out;
  &:hover {
    width: 9px;
  }
`;

