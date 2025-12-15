/// /frontend/hooks/useSendMessage.js
import { useState } from 'react';
import useConversation from '../zustand/useConversation';
import toast from 'react-hot-toast';
import SERVER_URL from '../utils/SERVER_URL.js';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation, updateConversation } =
    useConversation();

  const sendMessage = async (text, conversationId) => {
    if (!conversationId || !text.trim()) {
      toast.error('No conversation selected or empty message');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${SERVER_URL}/api/messages/send/${conversationId}`,
        {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: text }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');

      // Update messages state
      setMessages([...messages, data]);

      // Update conversation's lastMessage
      if (selectedConversation?._id === conversationId) {
        updateConversation(conversationId, {
          lastMessage: {
            text: data.text,
            seen: data.seen || false,
            createdAt: data.createdAt || new Date().toISOString(),
          },
        });
      }
    } catch (error) {
      toast.error(error.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
