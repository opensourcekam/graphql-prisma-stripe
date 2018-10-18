import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { AccountInput } from "../components";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default props => {
  return (
    <Mutation mutation={LOGIN_MUTATION}>
      {mutation => (
        <div>
          Signin
          <AccountInput
            onSubmit={async ({ email, password }) => {
              const res = await mutation({ variables: { email, password } });
              if (res.data.login.token) {
                props.history.push("/account");
              } else {
                console.error(res);
              }
            }}
          />
        </div>
      )}
    </Mutation>
  );
};
