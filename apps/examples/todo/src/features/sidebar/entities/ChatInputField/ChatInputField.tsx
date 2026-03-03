import { FormEvent } from 'react';

type ChatInputProps = {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
};

export function ChatInputField({ input, onInputChange, onSend }: ChatInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSend();
  };

  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Напиши сообщение..."
          className="flex-1 rounded-lg border px-4 py-3 focus:ring-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground rounded-lg px-6"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}
