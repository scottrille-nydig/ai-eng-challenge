import React, { useState, KeyboardEvent, FormEvent } from 'react';
import styles from '../styles/Chat.module.css';

type InputFormProps = {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
};

const InputForm: React.FC<InputFormProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <textarea
        className={styles.inputField}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={isLoading}
        rows={1}
      />
      <button 
        className={styles.sendButton} 
        type="submit"
        disabled={!input.trim() || isLoading}
      >
        {isLoading ? "..." : "Send"}
      </button>
    </form>
  );
};

export default InputForm;
