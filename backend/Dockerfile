FROM python:3.10

WORKDIR /app

# ホストの `wait-for-it.sh` をコンテナにコピー
COPY ./wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

COPY ./requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

# コンテナ起動時に `wait-for-it.sh` を使ってMySQL接続を待機し、Djangoサーバを起動する
CMD ["sh", "-c", "/wait-for-it.sh db:3306 -- python manage.py runserver 0.0.0.0:8000"]
