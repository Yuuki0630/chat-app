import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # ルーム名を URL から取得
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # グループに参加
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        # WebSocket 接続を承認
        await self.accept()

    async def disconnect(self, close_code):
        # グループから切断
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        # メッセージを受信
        data = json.loads(text_data)
        message = data['message']

        # グループ内のすべてのクライアントにメッセージを送信
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event):
        # メッセージを WebSocket クライアントに送信
        await self.send(text_data=json.dumps({
            'message': event['message']
        }))
