import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query getProducts($page: PageInput!, $name: String) {
    getProducts(page: $page, name: $name) {
      code
      message
      data {
        id
        name
        originalPrice
        stock
        curStock
        limitBuyNumber
        sellNumber
        preferentialPrice
        curStock
        coverUrl
      }
      page {
        pageNum
        pageSize
        total
      }
    }
  }
`

export const GET_PRODUCT = gql`
  query getProductInfo($id: String!) {
    getProductInfo(id: $id) {
      code
      message
      data {
        id
        name
        stock
        originalPrice
        preferentialPrice
        limitBuyNumber
        desc
        coverUrl
        bannerUrl
        cards {
          id
          name
          type
          time
          validateDay
        }
      }
    }
  }
`

export const COMMIT_PRODUCT = gql`
  mutation commitProductInfo($params: ProductInput!, $id: String) {
    commitProductInfo(params: $params, id: $id) {
      code
      message
      data {
        id
        name
        originalPrice
        stock
        curStock
        limitBuyNumber
        sellNumber
        preferentialPrice
        curStock
        coverUrl
      }
    }
  }
`

export const DEL_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id) {
      code
      message
    }
  }
`
