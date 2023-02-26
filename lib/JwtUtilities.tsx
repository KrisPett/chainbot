import jwt from "jsonwebtoken";

interface DecodedToken {
  sub: string;
  exp: number;
}

export function decodeJwt(token: string): DecodedToken | null {
  try {
    return jwt.decode(token) as DecodedToken;
  } catch (err) {
    console.error('Error decoding JWT:', err);
    return null;
  }
}
