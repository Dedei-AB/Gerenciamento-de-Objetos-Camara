#!/bin/sh

# wait-for.sh host:port -- comando

HOST_PORT=$1
shift
CMD="$@"

HOST=$(echo "$HOST_PORT" | cut -d: -f1)
PORT=$(echo "$HOST_PORT" | cut -d: -f2)

echo "Aguardando $HOST:$PORT ficar disponível..."

while ! nc -z "$HOST" "$PORT"; do
  sleep 2
done

echo "$HOST:$PORT está disponível, iniciando o app..."
exec $CMD
