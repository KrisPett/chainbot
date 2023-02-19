#!/bin/sh

# create a new .env file or overwrite an existing one
touch .env

# add the required environment variables to the .env file
echo "NEXT_PUBLIC_NEXTAUTH_URL=" >> .env
echo "NEXTAUTH_SECRET=" >> .env
echo "KEYCLOAK_ID=" >> .env
echo "KEYCLOAK_SECRET=" >> .env
echo "KEYCLOAK_ISSUER=" >> .env
