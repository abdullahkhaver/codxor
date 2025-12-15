import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useConversation from '../../zustand/useConversation';
import Sidebar from "../../components/sidebar/Sidebar"
import MessageContainer from "../../components/messages/MessageContainer"
const Home = () => {
  const { username } = useParams();
  const { conversations, selectedConversation, setSelectedConversation } =
    useConversation();

  useEffect(() => {
    if (username && conversations.length > 0) {
      const match = conversations.find(
        (c) => c.username.toLowerCase() === username.toLowerCase(),
      );
      if (
        match &&
        (!selectedConversation || selectedConversation._id !== match._id)
      ) {
        setSelectedConversation(match);
      }
    }
  }, [username, conversations]);

  return (
    <div className="h-screen w-screen bg-[#0f1117] flex overflow-hidden font-inter">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full min-h-0 bg-[#1a1d24]">
        <MessageContainer />
      </div>
    </div>
  );
};

export  default Home
