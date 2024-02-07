import styled from 'styled-components'

export const LayoutWrapper = styled.div`
  .container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .left {
      margin-right: 20px;
      flex: 0 0 120px;
    }
    .right {
      flex: 8.5 0 auto;
    }
  }
`
