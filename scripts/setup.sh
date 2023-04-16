#!/bin/sh

# create a new .env file or overwrite an existing one
touch .env

# add the required environment variables to the .env file
echo "NEXT_PUBLIC_CLIENT_URL=" >> .env
echo "NEXT_PUBLIC_AWS_GATEWAY_URL_CHATBOT=" >> .env
echo "NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT=" >> .env
echo "NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT_FILTER_IMAGES=" >> .env
echo "NEXT_PUBLIC_WALLET_CONNECT_ID=" >> .env
echo "NEXTAUTH_URL=" >> .env
echo "NEXTAUTH_SECRET=" >> .env
echo "KEYCLOAK_ID=" >> .env
echo "KEYCLOAK_SECRET=" >> .env
echo "KEYCLOAK_ISSUER=" >> .env
