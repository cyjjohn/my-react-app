import styled from 'styled-components'

export const LoginWrapper = styled.div`
  width: 350px;
  height: calc(100vh - 2rem);
  margin: 0 auto;
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .logo {
    text-align: center;
    width: 100%;
    margin: 40px 0;
  }
  .content {
    flex: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 40px;
    .form {
      h2 {
        text-align: center;
        font-weight: 400;
        font-size: 26px;
        color: grey;
      }
      p {
        text-align: center;
        margin: 0;
      }
      width: 68%;
      .button {
        width: 100%;
      }
      .link {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 16px;
      }
    }
  }
`
