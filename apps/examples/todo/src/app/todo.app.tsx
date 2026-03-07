import {
  AppWrapper,
  Card as TCard,
  Title as TTitle,
  InputRow,
  StyledInput,
  AddButton as TAddButton,
  TaskList as TTaskList,
  TaskItem as TTaskItem,
  TaskText as TTaskText,
  DeleteButton as TDeleteButton,
  EmptyMessage as TEmptyMessage,
} from '../shared/components-ui';
import { withLogging } from '../ai/hocs';
import { withAiSidebar } from '@contexprism/ai-sidebar';

import { useState } from 'react';
import { useTodoStore } from './store';
import { useToContextPrism } from '../ai/collectors/hooks.collectors';


const Card = withLogging(TCard, 'TCard', 'others');
const Title = withLogging(TTitle, 'Title', 'Обычный заголовок');
const AddButton = withLogging(TAddButton, 'AddButton', 'Кнопка добавить');

const TaskList = withLogging(TTaskList, 'TaskList', 'others');
const TaskItem = withLogging(TTaskItem, 'TaskItem', 'others');
const TaskText = withLogging(TTaskText, 'TaskText', 'others');
const DeleteButton = withLogging(TDeleteButton, 'DeleteButton', 'others');
const EmptyMessage = withLogging(TEmptyMessage, 'EmptyMessage', 'others');

export const TodoApp = withAiSidebar(function TodoAppOriginal() {
  const { tasks, addTask, toggleTask, removeTask } = useTodoStore();
  const [input, setInput] = useState<string>('');

  useToContextPrism<typeof tasks>({
    name: 'tasks',
    value: tasks,
    config: { descriptions: 'Hello soo' },
  });
  useToContextPrism<typeof tasks>('tasks', tasks, {
    descriptions: 'Hello soo',
  });
  useToContextPrism<typeof input>('input', input, {
    descriptions: 'Hello soo',
  });

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
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Что нужно сделать?'
          />
          <AddButton onClick={handleAdd}>Добавить</AddButton>
        </InputRow>
        <TaskList>
          {tasks.map(task => (
            <TaskItem key={task.id}>
              <input
                type='checkbox'
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
});
