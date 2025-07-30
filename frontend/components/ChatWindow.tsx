import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Chat.module.css';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type ChatWindowProps = {
  messages: Message[];
};

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.messageContainer}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.messageItem} ${
            message.role === 'user' ? styles.userMessage : styles.assistantMessage
          }`}
        >
          {message.content}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
