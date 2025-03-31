'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Room {
  created_at: string;
  name: string;
}

const ChatRooms = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/chat/rooms/');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data: Room[] = await response.json();
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const enterRoom = (roomName: string) => {
    router.push(`/chat/${roomName}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat Rooms</h1>
      
      {loading ? (
        <p>Loading...</p>
      ) : rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li 
              key={room.id} 
              className="cursor-pointer text-blue-600 underline mb-2" 
              onClick={() => enterRoom(room.name)}
            >
              {room.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatRooms;
