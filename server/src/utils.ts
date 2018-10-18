import { verify } from 'jsonwebtoken'

export const APP_SECRET = 'appsecret321'

class AuthError extends Error {
  constructor() {
    super('Not authorized')
  }
}

export function getUserId(ctx) {
  if (!ctx.req.session || !ctx.req.session.userId) {
    throw new Error("not authenticated");
  }
  
  const { userId } = ctx.req.session;

  if (userId) {
    return userId;
  }

  throw new AuthError()
}
