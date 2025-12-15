import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notificationSound from '../assets/sounds/notification.mp3';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const {
    selectedConversation,
    messages,
    setMessages,
    markConversationAsUnread,
  } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;

      if (selectedConversation?._id === newMessage.conversationId) {
        // ➤ Append to current conversation messages
        setMessages([...messages, newMessage]);
      } else {
        // ➤ Mark as unread & play sound only for other conversations
        markConversationAsUnread(newMessage.conversationId);

        const sound = new Audio(notificationSound);
        sound.play();
      }
    };

    socket?.on('newMessage', handleNewMessage);

    return () => socket?.off('newMessage', handleNewMessage);
  }, [
    socket,
    selectedConversation?._id, // better dependency than whole object
    messages,
    setMessages,
    markConversationAsUnread,
  ]);
};

export default useListenMessages;
