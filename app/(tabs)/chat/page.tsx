import ListChat from "@/components/list-chat";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { unstable_cache as nextCache } from "next/cache";

const getChats = async (userId: number) => {
  const chats = await db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      messages: {
        take: 1,
        orderBy: {
          created_at: "desc",
        },
      },
      users: {
        where: {
          id: {
            not: userId,
          },
        },
        select: {
          avatar: true,
          username: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  return chats;
};

const getCachedChats = nextCache(getChats, ["chat-list"], {
  tags: ["chat-list"],
});

const ChatPage = async () => {
  const session = await getSession();
  const chats = await getCachedChats(session.id!);
  return (
    <div>
      <h1 className="text-white text-4xl">Chats</h1>
      {chats.map((chat, idx) => (
        <ListChat
          id={chat.id}
          key={idx}
          messages={chat.messages}
          users={chat.users}
          userId={session.id!}
        />
      ))}
    </div>
  );
};

export default ChatPage;
