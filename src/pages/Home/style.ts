import styled from 'styled-components'

export const HomeWrapper = styled.div`
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: calc(100vh - 64px - 64px);
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    h1 {
      font-weight: 900;
      font-size: 32px;
    }
    p {
      font-size: 16px;
      font-weight: 500;
    }
  }
`
