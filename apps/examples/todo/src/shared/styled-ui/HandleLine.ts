import styled from 'styled-components';
import { StyledSeparator } from './Separator';

export const HandleLine = styled.div`
  position: absolute;
  inset: 0 0 0 auto;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 60px;
  border-radius: 9999px;
  background: rgba(150, 150, 150, 0.35);
  opacity: 0;
  transform: translateX(-50%) scale(0.85);
  transition: all 0.22s ease-out;

  ${StyledSeparator}:hover & {
    opacity: 0.9;
    background: rgba(100, 100, 100, 0.7);
    transform: translateX(-50%) scale(1);
  }

  ${StyledSeparator}:active &,
  &[data-resize-handle-active] & {
    background: #3b82f6;
    opacity: 1;
    transform: translateX(-50%) scale(1.15);
  }
`;
