// frontend / src / zustand / useConversation.js;
import { create } from 'zustand';

const useConversation = create((set, get) => ({
  selectedConversation: null,
  conversations: [],
  messages: [],
  unreadConversations: new Set(),

  // Set selected conversation and clear its unread status
  setSelectedConversation: (selectedConversation) => {
    const unreadSet = new Set(get().unreadConversations);

    if (selectedConversation && selectedConversation._id) {
      unreadSet.delete(selectedConversation._id);
    }

    set({
      selectedConversation,
      unreadConversations: unreadSet,
    });
  },

  setConversations: (conversations) => set({ conversations }),

  updateConversation: (conversationId, updatedConversation) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv._id === conversationId
          ? { ...conv, ...updatedConversation }
          : conv,
      ),
      selectedConversation:
        state.selectedConversation?._id === conversationId
          ? { ...state.selectedConversation, ...updatedConversation }
          : state.selectedConversation,
    })),

  setMessages: (messages) => set({ messages }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  updateMessageSeen: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv._id === conversationId && conv.lastMessage
          ? { ...conv, lastMessage: { ...conv.lastMessage, seen: true } }
          : conv,
      ),
      messages: state.messages.map((msg) =>
        msg.conversationId === conversationId ? { ...msg, seen: true } : msg,
      ),
    })),

  // Mark a conversation as unread
  markConversationAsUnread: (conversationId) => {
    const unreadSet = new Set(get().unreadConversations);
    unreadSet.add(conversationId);
    set({ unreadConversations: unreadSet });
  },

  // Optional method to clear unread manually
  clearUnread: (conversationId) => {
    const unreadSet = new Set(get().unreadConversations);
    unreadSet.delete(conversationId);
    set({ unreadConversations: unreadSet });
  },
}));

export default useConversation;
