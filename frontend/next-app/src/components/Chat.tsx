'use client'

import { useState, useEffect } from 'react';

interface ChatProps {
  roomName: string;
}

interface WebSocketMessage {
  message: string;
}

const Chat = ({ roomName }: ChatProps) => {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    // WebSocket接続を開始
    const socket = new WebSocket(`ws://backend:8000/chat/${roomName}/`);

    // WebSocketがメッセージを受信した際の処理
    socket.onmessage = (event: MessageEvent) => {
      const data: WebSocketMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data.message]);
    };

    // WebSocketが開いた際の処理
    socket.onopen = () => {
      console.log('WebSocket Connected');
    };

    // WebSocketがエラーを発生した際の処理
    socket.onerror = (error: Event) => {
      console.error('WebSocket Error:', error);
    };

    // WebSocketが閉じられた際の処理
    socket.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    // WebSocketインスタンスをstateにセット
    setWs(socket);

    // クリーンアップ: コンポーネントがアンマウントされるときにWebSocket接続を閉じる
    return () => {
      socket.close();
    };
  }, [roomName]);

  const sendMessage = () => {
    if (ws && message) {
      // WebSocketを通じてメッセージを送信
      const messageData: WebSocketMessage = { message };
      ws.send(JSON.stringify(messageData));
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Room: {roomName}</h2>

      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
