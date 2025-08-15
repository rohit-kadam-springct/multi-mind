// hooks/useChat.ts
import { useState, useCallback } from "react";
import axios from "axios";

export interface Message {
  id: string;
  type: "user" | "persona" | "system";
  content: string;
  timestamp: Date;
  personaId?: string;
  personaName?: string;
}

type ResponseType = {
  type: "user" | "persona" | "system";
  content: string;
  personaId: "hitesh" | "piyush";
  personaName: string;
};

export interface SendOptions {
  stream?: boolean; // future scope
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setProcessing] = useState(false);
  const [typingPersona, setTyping] = useState<string | null>(null);

  const push = useCallback((partial: Omit<Message, "id" | "timestamp">) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        timestamp: new Date(),
        ...partial,
      },
    ]);
  }, []);

  const sendMessage = useCallback(
    async (content: string, opts: SendOptions = {}) => {
      if (!content.trim() || isProcessing) return;

      /* 1. push user message immediately */
      push({ type: "user", content: content.trim() });

      setProcessing(true);

      try {
        /* 2. ask the router which persona(s) should reply */
        const { data: router } = await axios.post<{
          tag: "hitesh" | "piyush" | "both";
        }>("/api/persona-router", { message: content });

        push({
          type: "system",
          content: `Router decided: ${router.tag.toUpperCase()} should answer`,
        });

        /* 3. dispatch to the requested persona(s) */
        const personaOrder =
          router.tag === "both"
            ? (["hitesh", "piyush"] as const)
            : ([router.tag] as const);

        for (const id of personaOrder) {
          setTyping(id); // show typing indicator

          const historyPayload = messages
            .filter((m) => m.type !== "system")
            .map((m) => ({
              role: m.type === "user" ? "user" : m.personaId || "unknown", // Send persona IDs (hitesh/piyush)
              content: m.content,
            }));

          const { data } = await axios.post<{
            response: string;
            persona: string;
          }>(`/api/persona/${id}`, {
            message: content,
            history: historyPayload,
          });

          const newMessage: ResponseType = {
            type: "persona",
            content: data.response,
            personaId: id,
            personaName: id === "hitesh" ? "Hitesh Choudhary" : "Piyush Garg",
          };

          push(newMessage);
          messages.push({
            ...newMessage,
            id: crypto.randomUUID(),
            timestamp: new Date(),
          });
        }
      } catch (err) {
        console.error(err);
        push({
          type: "system",
          content: "⚠️ Sorry, something went wrong. Please try again.",
        });
      } finally {
        setTyping(null);
        setProcessing(false);
      }
    },
    [isProcessing, messages, push]
  );

  const clearHistory = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isProcessing,
    typingPersona,
    sendMessage,
    clearHistory,
  };
};
