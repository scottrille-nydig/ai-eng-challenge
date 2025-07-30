'use client';

import { useState, useEffect } from 'react';
import StatusIndicator from '../components/StatusIndicator';
import ChatWindow from '../components/ChatWindow';
import InputForm from '../components/InputForm';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiStatus, setApiStatus] = useState<boolean>(false);

  // Check API status on component mount
  useEffect(() => {
    checkApiStatus();
    // Check API status every 10 seconds
    const interval = setInterval(checkApiStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const checkApiStatus = async () => {
    try {
      const response = await fetch('/api/health');
      const data = await response.json();
      // Specifically check if the status is "ok" to set the indicator to green
      const isOk = data && data.status === 'ok';
      setApiStatus(isOk);
      console.log(`API Status Check: ${isOk ? 'Online' : 'Offline'}`);
    } catch (error) {
      console.error('API Status Check Error:', error);
      setApiStatus(false);
    }
  };

  const handleSendMessage = async (userInput: string) => {
    // Prevent empty messages
    if (!userInput.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      role: 'user',
      content: userInput,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare developer message (system instruction)
      const developerMessage = "You are a helpful assistant that provides concise and accurate answers.";
      
      // Make API request to chat endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          developer_message: developerMessage,
          user_message: userInput,
          model: 'gpt-4.1-mini',
          api_key: process.env.NEXT_PUBLIC_OPENAI_API_KEY || prompt('Please enter your OpenAI API key:')
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      if (!reader) throw new Error('Failed to get response reader');

      let responseText = '';
      
      // Add empty assistant message that we'll update as we receive chunks
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      // Process the stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Decode the chunk and add to response text
        const chunk = new TextDecoder().decode(value);
        responseText += chunk;
        
        // Update the assistant's message with accumulated text
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: responseText,
          };
          return updated;
        });
      }

    } catch (error) {
      console.error('Error:', error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again later.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <StatusIndicator isOnline={apiStatus} />
      <div className="chatContainer">
        <ChatWindow messages={messages} />
        <InputForm onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </main>
  );
}
