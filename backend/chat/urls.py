from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ChatMessageViewSet, ChatRoomViewSet

router = DefaultRouter()
router.register(r'chat_messages', ChatMessageViewSet)
router.register(r'rooms', ChatRoomViewSet)

urlpatterns = [
    path('chat/', include(router.urls)),
]
