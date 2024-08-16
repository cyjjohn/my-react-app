import { gql } from '@apollo/client'

export const GET_TEACHERS = gql`
  query getTeachers($page: PageInput!) {
    getTeachers(page: $page) {
      code
      message
      data {
        id
        name
      }
    }
  }
`
