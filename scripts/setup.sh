#!/bin/sh

# add the required environment variables to the .env file
echo "NEXT_PUBLIC_CLIENT_URL=http://localhost:3000" >> .env.local
echo "NEXT_PUBLIC_AWS_GATEWAY_URL_CHATBOT=undefined" >> .env.local
echo "NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT=undefined" >> .env.local
echo "NEXT_PUBLIC_AWS_GATEWAY_URL_IMAGEBOT_FILTER_IMAGES=undefined" >> .env.local
echo "NEXT_PUBLIC_WALLET_CONNECT_ID=" >> .env.local
echo "NEXTAUTH_URL=http://localhost:3000" >> .env.local
echo "NEXTAUTH_SECRET=secretsecretsecretsecretsecretsecretsecr" >> .env.local
echo "KEYCLOAK_ID=chatbot-client" >> .env.local
echo "KEYCLOAK_SECRET=<contact_owner>" >> .env.local
echo "KEYCLOAK_ISSUER=https://auth.chaincuet.com/auth/realms/chainbot" >> .env.local
