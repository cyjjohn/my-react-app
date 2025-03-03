import styled from 'styled-components'

export const LoginDiv = styled.div`
  width: 45vh;
  height: 38vh;
  border: 1px solid #b9b9b9;
  position: fixed;
  right: 10%;
  top: 30vh;
  background: #fff;
  background-size: auto 100%;
  border-radius: 1.5vh;
  box-shadow: 0 0 2vh rgba(0, 0, 0, 0.1);
  transform: scale(0.9, 0.9);
`

export const LogintImage = styled.img`
  display: block;
  width: 50%;
  margin: 3vh auto;
`

export const UsernameLabel = styled.h2`
  color: #202224;
  font-weight: normal;
  position: absolute;
  left: 5vh;
  top: 8vh;
  font-size: 2vh;
`

export const PasswordLabel = styled.h2`
  color: #202224;
  font-weight: normal;
  position: absolute;
  left: 5vh;
  top: 18vh;
  font-size: 2vh;
`

interface InputProps {
  $top: string
}

export const Input = styled.input<InputProps>`
  font-size: 1.6vh;
  border-radius: 0.5vh;
  position: absolute;
  left: 5vh;
  padding-left: 1vh;
  top: ${props => props.$top};
  border: 0;
  background: #f1f4f9;
  width: 34vh;
  height: 4.5vh;
  color: #a6a6a6;
  outline: none;
  border: 1px solid #d8d8d8;

  &::-webkit-input-placeholder {
    color: #9aaabc;
  }
`

export const CheckboxLabel = styled.label`
  position: absolute;
  left: 5vh;
  top: 30vh;
  font-size: 1.6vh;
  color: #202224;
  display: flex;
  align-items: center;
`

export const LoginButton = styled.a`
  display: block;
  position: absolute;
  left: 15vh;
  top: 35.5vh;
  width: 16vh;
  height: 5vh;
  line-height: 5vh;
  background: #1890ff;
  color: #fff;
  text-align: center;
  text-decoration: none;
  box-shadow: 0px 0px 0.8vh rgba(6, 67, 123, 0.35);
  font-size: 1.7vh;
  border-radius: 0.5vh;
  cursor: pointer;
`
