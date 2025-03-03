import styled from 'styled-components'

interface ErrorWrapperProps {
  $visible: boolean
}

export const ErrorWrapper = styled.span<ErrorWrapperProps>`
  font-size: 1.5vh;
  height: 3.5vh;
  line-height: 3.5vh;
  position: absolute;
  left: 50%;
  top: 1.5vh;
  display: ${props => (props.$visible ? 'inline-block' : 'none')};
  color: #e6a23b;
  background: #fdf6ec;
  border: 1px solid #fbecd8;
  transform: translateX(-50%);
  padding: 0 2vh;
  border-radius: 0.3vh;
`

export const ErrorImage = styled.img`
  height: 1.5vh;
  vertical-align: -6%;
`

export const CloseButton = styled.img`
  margin-left: 10vh;
  width: 1vh;
  height: 1vh;
  background: url(/img/close.png) no-repeat center center; /* 调整背景位置 */
  background-size: contain; /* 保持图像比例，完整显示 */
  display: inline-block;
  cursor: pointer;
`
