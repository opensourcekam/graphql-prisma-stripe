import React from "react";
import { gql } from "apollo-boost";
import { Mutation } from "react-apollo";
import { AccountInput } from "../components";

const LOGIN_MUTATION = gql`
  mutation RegisterMutation($email: String!, $password: String!) {
    signup(email: $email, password: $password)
  }
`;

export default props => {
  return (
    <Mutation mutation={LOGIN_MUTATION}>
      {mutation => (
        <div>
          Register
          <AccountInput
          onSubmit={async ({ email, password }) => {
            const res = await mutation({ variables: { email, password } });
            console.log(res);
            if (res.data.signup) {
              // SHOW SUCCESS
              props.history.push("/login");
            } else {
              // SHOW FAIL
              console.error(res);
            }
          }}
        />
        </div>
      )}
    </Mutation>
  );
};
