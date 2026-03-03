// ─── Styled Components ───────────────────────────────────────────────

import styled from 'styled-components';

export const AppWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 100%);
  display: flex;
  justify-content: center;
  font-family:
    system-ui,
    -apple-system,
    sans-serif;
`;

export const Card = styled.div`
  background: #f0f4f8;
  border-radius: 24px;
  padding: 32px 28px;
  width: 100%;
  max-width: 480px;
  box-shadow:
    inset 0 2px 8px rgba(255, 255, 255, 0.7),
    0 12px 32px rgba(0, 0, 0, 0.12),
    0 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

export const Title = styled.h1`
  margin: 0 0 28px 0;
  font-size: 2.1rem;
  font-weight: 600;
  color: #334155;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
  text-align: center;
`;

export const InputRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
`;

export const StyledInput = styled.input`
  flex: 1;
  padding: 14px 18px;
  font-size: 1.05rem;
  border: none;
  border-radius: 16px;
  background: #ffffff;
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.06),
    0 1px 2px rgba(0, 0, 0, 0.04);
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    box-shadow:
      inset 0 2px 6px rgba(0, 0, 0, 0.08),
      0 0 0 3px rgba(99, 102, 241, 0.2);
  }
`;

export const AddButton = styled.button`
  padding: 0 24px;
  font-size: 1.05rem;
  font-weight: 500;
  color: white;
  background: linear-gradient(145deg, #6366f1, #4f46e5);
  border: none;
  border-radius: 16px;
  box-shadow:
    0 4px 12px rgba(99, 102, 241, 0.4),
    inset 0 -2px 4px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.18s ease;

  &:active {
    transform: translateY(2px);
    box-shadow:
      0 2px 6px rgba(99, 102, 241, 0.3),
      inset 0 -1px 2px rgba(0, 0, 0, 0.2);
  }
`;

export const TaskList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const TaskItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  margin-bottom: 12px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow:
    0 3px 10px rgba(0, 0, 0, 0.08),
    inset 0 1px 2px rgba(255, 255, 255, 0.7);
  transition: all 0.2s ease;
`;

export const TaskText = styled.span<{ $completed: boolean }>`
  flex: 1;
  font-size: 1.05rem;
  color: ${({ $completed }) => ($completed ? '#94a3b8' : '#1e293b')};
  text-decoration: ${({ $completed }) =>
    $completed ? 'line-through' : 'none'};
  opacity: ${({ $completed }) => ($completed ? 0.7 : 1)};
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background: #fee2e2;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: #94a3b8;
  margin-top: 40px;
  font-size: 1.1rem;
`;
