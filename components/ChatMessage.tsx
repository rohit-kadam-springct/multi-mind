import { Message } from '@/hooks/useChat';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export interface ChatMessageProps {
  message: Message;
  getPersonaColor: (id: string) => string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, getPersonaColor }) => {
  const codeClass = 'bg-gray-700/50 text-gray-200 font-mono px-1 py-0.5 rounded text-xs';
  const listSpacing = 'mb-1';

  return (
    <div className="max-w-xs lg:max-w-2xl">
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/60
                      backdrop-blur-sm text-white px-5 py-3 rounded-3xl rounded-tl-lg
                      shadow-lg border border-gray-600/30">
        {/* HEADER (name + status dot) */}
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-xs font-semibold text-gray-300">
            {message.personaName}
          </span>
          <div
            className={`w-1.5 h-1.5 rounded-full bg-${getPersonaColor(message.personaId ?? "")}-400`}
          />
        </div>

        {/* MARKDOWN BODY */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            /* paragraphs */
            p: ({ children }) => <p className="text-sm leading-relaxed mb-2 last:mb-0">{children}</p>,
            /* bold / italic */
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            /* inline & block code */
            code: ({ children }) => <code className={codeClass}>{children}</code>,
            pre: ({ children }) => <pre className={`p-2 mt-2 mb-2 overflow-x-auto ${codeClass}`}>{children}</pre>,
            /* lists */
            ul: ({ children }) => <ul className={`list-disc list-inside ml-4 ${listSpacing}`}>{children}</ul>,
            ol: ({ children }) => <ol className={`list-decimal list-inside ml-4 ${listSpacing}`}>{children}</ol>,
            li: ({ children }) => <li className={listSpacing}>{children}</li>,
            /* links */
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {children}
              </a>
            ),
            /* blockquote */
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-gray-500 pl-3 italic text-gray-300 my-2">
                {children}
              </blockquote>
            ),
            /* headings */
            h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-base font-semibold mb-2">{children}</h2>,
            h3: ({ children }) => <h3 className="text-sm font-semibold mb-2">{children}</h3>,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>

      {/* TIMESTAMP */}
      <p className="text-xs text-gray-500 mt-2">
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  );
};

export default ChatMessage;
