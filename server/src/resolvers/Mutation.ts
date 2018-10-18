import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { APP_SECRET } from "../utils";
import stripe from "./Stripe";

export const Mutation = {
  signup: async (_parent, { password, name, email }, ctx) => {
    const hashedPassword = await hash(password, 10);
    const user = await ctx.db.createUser({
      name,
      email,
      password: hashedPassword
    });

    if (user.id) {
      return true
    }

    return false
  },
  login: async (_parent, { email, password }, ctx) => {
    const user = await ctx.db.user({ email });

    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }

    const valid = await compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    ctx.req.session.userId = user.id;

    return {
      token: sign({ userId: user.id }, APP_SECRET),
      user
    };
  },
  logout: async (_, __, { req, res }) => {
    await new Promise(res => req.session.destroy(() => res()));
    res.clearCookie("connect.sid");
    return true;
  },
  ...stripe
};
