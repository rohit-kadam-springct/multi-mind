import { useState, useCallback } from "react";
import axios from "axios";

interface Message {
  id: string;
  type: "user" | "persona" | "system";
  content: string;
  timestamp: Date;
  personaId?: string;
  personaName?: string;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const saveChatHistory = useCallback(async (chatMessages: Message[]) => {
    try {
      await axios.post("/api/chat-history", { messages: chatMessages });
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  }, []);

  const addMessage = useCallback(
    (message: Message) => {
      setMessages((prev) => {
        const newMessages = [...prev, message];
        saveChatHistory(newMessages);
        return newMessages;
      });
    },
    [saveChatHistory]
  );

  return {
    messages,
    setMessages,
    isProcessing,
    setIsProcessing,
    addMessage,
  };
};
