import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import StripeCheckout from "react-stripe-checkout";

const CREATE_SUBSCRIPTION_MUTATION = gql`
  mutation CreateSubscriptionMutation($source: String!, $ccLast4: String!) {
    createSubscription(source: $source, ccLast4: $ccLast4) {
      id
      email
    }
  }
`;

export default class SubscribeUser extends React.Component {
  render() {
    return (
      <Mutation mutation={CREATE_SUBSCRIPTION_MUTATION}>
        {mutate => (
          <StripeCheckout
            token={async token => {
              console.log(token)
              const response = await mutate({
                variables: { source: token.id, ccLast4: token.card.last4 }
              });

              console.log(response);
            }}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
          />
        )}
      </Mutation>
    );
  }
}
