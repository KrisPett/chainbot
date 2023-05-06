#!/bin/sh

# add the required environment variables to the .env file
echo "NEXT_PUBLIC_CLIENT_URL=" >> .env.local
echo "NEXT_PUBLIC_AWS_GATEWAY_URL_CHATBOT=" >> .env.local
echo "NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT=" >> .env.local
echo "NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT_FILTER_IMAGES=" >> .env.local
echo "NEXT_PUBLIC_WALLET_CONNECT_ID=" >> .env.local
echo "NEXTAUTH_URL=" >> .env.local
echo "NEXTAUTH_SECRET=" >> .env.local
echo "KEYCLOAK_ID=" >> .env.local
echo "KEYCLOAK_SECRET=" >> .env.local
echo "KEYCLOAK_ISSUER=" >> .env.local
