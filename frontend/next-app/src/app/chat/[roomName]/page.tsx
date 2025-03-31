'use client'

import { useParams } from 'next/navigation';
import Chat from '@/components/Chat';

const RoomChat = () => {
  const params = useParams();
  let roomName = params?.roomName; // params は Record<string, string | undefined> の型

  if (Array.isArray(roomName)) {
    roomName = roomName[0];
  }

  // roomName が未定義の場合は何も表示しない
  if (!roomName) {
    return null;
  }

  return <Chat roomName={roomName} />;
};

export default RoomChat;
