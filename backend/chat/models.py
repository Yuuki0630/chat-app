from django.db import models

class ChatRoom(models.Model):
    name = models.CharField(max_length=255, unique=True)  # ルーム名
    created_at = models.DateTimeField(auto_now_add=True)  # 作成日時

    def __str__(self):
        return self.name

class ChatMessage(models.Model):
    room = models.ForeignKey(ChatRoom, related_name="messages", on_delete=models.CASCADE)  # ルームに紐づけ
    sender = models.CharField(max_length=255)  # 送信者
    message = models.TextField()  # メッセージ内容
    timestamp = models.DateTimeField(auto_now_add=True)  # 送信時刻

    def __str__(self):
        return f"[{self.timestamp}] {self.sender}: {self.message}"

