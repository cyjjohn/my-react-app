import { gql } from '@apollo/client'

export const GET_COURSES = gql`
  query getCourses($page: PageInput!, $name: String) {
    getCourses(page: $page, name: $name) {
      code
      message
      page {
        pageNum
        pageSize
        total
      }
      data {
        id
        name
        limitNumber
        duration
      }
    }
  }
`

export const GET_COURSE = gql`
  query getCourseInfo($id: String!) {
    getCourseInfo(id: $id) {
      code
      message
      data {
        id
        name
        desc
        group
        baseAbility
        limitNumber
        duration
        reserveInfo
        refundInfo
        otherInfo
        reducibleTime {
          week
          orderTime {
            startTime
            endTime
            key
          }
        }
      }
    }
  }
`
export const COMMIT_COURSE = gql`
  mutation commitCourseInfo($params: PartialCourseInput!, $id: String) {
    commitCourseInfo(params: $params, id: $id) {
      code
      message
    }
  }
`
