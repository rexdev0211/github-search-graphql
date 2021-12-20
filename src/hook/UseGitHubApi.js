import { gql } from '@urql/core'
import React from 'react'
import { useQuery } from 'urql'

// When the Users option is checked, this runs
const USER_QUERY = gql`
 query UserSearchQuery($query: String!, $first: Int!, $after: String) {
  search(query: $query, type: USER, first: $first, after: $after) {
   edges {
    node {
     ... on User {
      id
      name
      login
      avatarUrl(size: 80)
      location
      url
      bio
      twitterUsername
      followers(first: 10) {
       totalCount
      }
      following(first: 10) {
       totalCount
      }
      repositories(first: 10) {
       totalCount
      }
     }
    }
   }
   userCount
   pageInfo {
     endCursor
   }
  }
 }
`

const REPO_BY_USER_QUERY = gql`
query RepoByUserSearchQuery($query: String!, $first: Int!, $after: String) {
  search(query: $query, type: REPOSITORY, first: $first, after: $after) {
    edges {
      node {
        ... on Repository {
          id
          nameWithOwner
          shortDescriptionHTML(limit: 80)
          owner {
            id
            login
            avatarUrl(size: 30)
          }
          languages(first: 1, orderBy: { field: SIZE, direction: DESC }) {
            nodes {
              name
              id
              color
            }
          }
          stargazers {
            totalCount
          }
          issues {
            totalCount
          }
        }
      }
    }
    repositoryCount
    pageInfo {
      endCursor
    }
  }
}
`

const ISSUE_BY_REPO_QUERY = gql`
query IssueByRepoQuery($filter: String!, $first: Integer!, $after: String!) {
  search(query: $filter, type: ISSUE, first: 5, after: $after) {
    issueCount
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        ... on Issue {
          createdAt
          title
          url,
          repository {
            name
          }
        }
      }
    }
  }
}
`

const ISSUE_CREATE_QUERY = gql`
mutation CreateIssue($repoId: String!, $title: String!, $body: String!) {
  createIssue(input: {repositoryId: $repoId, title: $title, body: $body}) {
    issue {
      number
      body
    }
  }
}
`

const queries = {
  getUsers: USER_QUERY,
  getReposByUser: REPO_BY_USER_QUERY,
  getIssuesByRepo: ISSUE_BY_REPO_QUERY,
  createIssue: ISSUE_CREATE_QUERY,
}

const UseGitHubApi = () => {
  const [request, setRequest] = React.useState({
    key: 'getUsers',
    values: {
      query: '',
      first: 5,
      after: null,
    },
  })

  const handleRequest = (req) => {
    setRequest(req)
  }

  const [result] = useQuery({
    query: queries[request.key],
    variables: request.values,
    //   Only fetch the data when something is typed in
    pause: request.values.query.trim().length > 0 ? false : true,
  })


  return {
    result,
    handleRequest,
    request,
  }
}

export default UseGitHubApi