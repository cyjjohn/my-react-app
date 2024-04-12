import { gql } from '@apollo/client'

export const GET_ORGS = gql`
  query getOrganizations($page: PageInput!) {
    getOrganizations(page: $page) {
      code
      message
      data {
        id
        logo
        name
        address
        tags
      }
      page {
        pageNum
        pageSize
        total
      }
    }
  }
`

export const GET_SAMPLE_ORGS = gql`
  query getOrganizations($page: PageInput!, $name: String) {
    getOrganizations(page: $page, name: $name) {
      code
      message
      data {
        id
        name
      }
    }
  }
`

export const GET_ORG = gql`
  query getOrganizationInfo($id: String!) {
    getOrganizationInfo(id: $id) {
      code
      message
      data {
        description
        name
        tags
        id
        orgFrontImg {
          url
        }
        orgRoomImg {
          url
        }
        orgOtherImg {
          url
        }
        logo
        address
        tel
        longitude
        latitude
        identityCardBackImg
        identityCardFrontImg
        businessLicense
      }
    }
  }
`

export const COMMIT_ORG = gql`
  mutation commitOrg($params: OrganizationInput!, $id: String) {
    commitOrganizationInfo(params: $params, id: $id) {
      code
      message
      data {
        id
        name
        tel
      }
    }
  }
`

export const DEL_ORG = gql`
  mutation deleteOrganization($id: String!) {
    deleteOrganization(id: $id) {
      code
      message
    }
  }
`
