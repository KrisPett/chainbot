#!/bin/sh

# Stop and remove the existing Docker container (if it exists)
docker stop chainbot
docker rm chainbot

# Remove the existing Docker image (if it exists)
docker rmi chainbot

# Build the new Docker image
docker build -t chainbot .

# Start the Docker Compose service
docker-compose -d up

# Open a shell inside the container
docker exec -it chainbot sh
