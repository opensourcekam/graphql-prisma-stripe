import React from 'react'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo';

const ME_QUERY = gql`
{
  me {
    id
    name
    email
    type
    createdAt
  }
}
`;

export default () => {
  return (
    <Query query={ME_QUERY}>
      {({ data, loading, error }) =>
        <pre>
          {JSON.stringify(data, null, 3)}
        </pre>
      }
    </Query>
  )
}

