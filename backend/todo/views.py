from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer
from rest_framework import viewsets

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

    @action(detail=False, methods=['delete'])
    def delete_multiple(self, request):
        # チェックボックスで選択されたタスクのIDを取得
        ids = request.data.get('ids', [])
        if not ids:
            return Response({"detail": "No IDs provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Todoオブジェクトを一括削除
        todos = Todo.objects.filter(id__in=ids)
        deleted_count, _ = todos.delete()

        return Response({"detail": f"{deleted_count} todos deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

