#!/bin/sh
# Script básico de espera

HOST="$1"
shift
CMD="$@"

until nc -z $HOST; do
  echo "Aguardando $HOST..."
  sleep 2
done

exec $CMD
