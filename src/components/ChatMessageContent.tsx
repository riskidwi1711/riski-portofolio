import React from 'react';

interface ChatMessageContentProps {
  text: string;
}

const ChatMessageContent: React.FC<ChatMessageContentProps> = ({ text }) => {
  const renderContent = () => {
    const parts = text.split(/(```.*?```)/gs);

    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3).trim();
        return (
          <pre key={index} className="bg-gray-700 p-2 rounded-md overflow-x-auto my-1">
            <code className="text-sm text-green-300">{code}</code>
          </pre>
        );
      } else {
        return <span key={index} className="break-words">{part}</span>;
      }
    });
  };

  return <div>{renderContent()}</div>;
};

export default ChatMessageContent;
