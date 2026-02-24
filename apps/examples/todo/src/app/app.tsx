import React, { useState } from 'react';
import {
  AppWrapper,
  Card,
  Title,
  InputRow,
  StyledInput,
  AddButton,
  TaskList,
  TaskItem,
  TaskText,
  DeleteButton,
  EmptyMessage,
} from '../shared/components-ui';
import { useTodoStore } from './store';

// ─── Component ───────────────────────────────────────────────────────

const App: React.FC = () => {
  const { tasks, addTask, toggleTask, removeTask } = useTodoStore();
  const [input, setInput] = useState<string>('');

  const handleAdd = () => {
    if (input.trim()) {
      addTask(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleAdd();
  };

  return (
    <AppWrapper>
      <Card>
        <Title>Мои дела</Title>

        <InputRow>
          <StyledInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Что нужно сделать?"
          />
          <AddButton onClick={handleAdd}>Добавить</AddButton>
        </InputRow>

        <TaskList>
          {tasks.map((task) => (
            <TaskItem key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                style={{
                  width: '22px',
                  height: '22px',
                  accentColor: '#6366f1',
                  cursor: 'pointer',
                }}
              />
              <TaskText $completed={task.completed}>{task.text}</TaskText>
              <DeleteButton onClick={() => removeTask(task.id)}>×</DeleteButton>
            </TaskItem>
          ))}
        </TaskList>

        {tasks.length === 0 && (
          <EmptyMessage>Пока задач нет… Добавь первую! ✍️</EmptyMessage>
        )}
      </Card>
    </AppWrapper>
  );
};

export default App;
