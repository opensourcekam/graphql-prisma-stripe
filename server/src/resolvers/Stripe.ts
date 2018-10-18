import { getUserId } from '../utils';

export default {
  createSubscription: async (_, { source, ccLast4 }, ctx) => {
    const id = getUserId(ctx);

    const user = await ctx.db.user({ id });
    
    if (!user) {
      throw new Error();
    }

    let stripeId = user.stripeId;

    if (!stripeId) {
      const customer = await ctx.stripe.customers.create({
        email: user.email,
        source,
        plan: process.env.STRIPE_PLAN!
      });

      stripeId = customer.id;
    } else {
      await ctx.stripe.customers.update(stripeId, {
        source
      });

      await ctx.stripe.subscriptions.create({
        customer: stripeId,
        items: [
          {
            plan: process.env.STRIPE_PLAN!
          }
        ]
      });
    }

    return await ctx.db.updateUser({
      where: { id },
      data: {
        type: "PAID",
        ccLast4: ccLast4,
        stripeId: stripeId
      },
    });


  },
  changeCreditCard: async (_, { source, ccLast4 }, ctx) => {
    const id = getUserId(ctx);
    const user = await ctx.db.user({ id });

    if (!user || !user.stripeId || user.type !== "PAID") {
      throw new Error();
    }

    await ctx.stripe.customers.update(user.stripeId, { source });

    return await ctx.db.updateUser({
      where: { id },
      data: {
        ccLast4: ccLast4,
      },
    });
  },
  cancelSubscription: async (_, __, ctx) => {
    const id = getUserId(ctx);
    const user = await ctx.db.user({ id });

    if (!user || !user.stripeId || user.type !== "PAID") {
      throw new Error();
    }

    const stripeCustomer = await ctx.stripe.customers.retrieve(user.stripeId);

    const [subscription] = stripeCustomer.subscriptions.data;

    await ctx.stripe.subscriptions.del(subscription.id);

    await ctx.stripe.customers.deleteCard(
      user.stripeId,
      stripeCustomer.default_source as string
    );

    return await ctx.db.updateUser({
      where: { id },
      data: {
        type: "TRIAL"
      },
    });
  }
};
