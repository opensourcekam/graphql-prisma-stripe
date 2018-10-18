import { getUserId } from "../utils";

export const Query = {
  me: (_parent, _args, ctx) => {
    const id = getUserId(ctx);
    return ctx.db.user({ id });
  }
};
