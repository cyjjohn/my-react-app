import { gql } from '@apollo/client'

export const GET_CARDS = gql`
  query getCards($courseId: String!, $name: String) {
    getCards(courseId: $courseId, name: $name) {
      code
      message
      data {
        id
        name
        type
        time
        validateDay
        updatedAt
      }
    }
  }
`

export const COMMIT_CARD = gql`
  mutation commitCardInfo($params: CardInput!, $courseId: String!, $id: String) {
    commitCardInfo(params: $params, courseId: $courseId, id: $id) {
      code
      message
      data {
        name
        type
        type
      }
    }
  }
`

export const DEL_CARD = gql`
  mutation deleteCard($id: String!) {
    deleteCard(id: $id) {
      code
      message
      data
    }
  }
`
