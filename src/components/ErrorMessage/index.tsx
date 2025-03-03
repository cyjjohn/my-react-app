import { BASE_URL } from '@/services/request/config'
import { ErrorWrapper, ErrorImage, CloseButton } from './style'

interface ErrorMessageProps {
  message: string
  setErrorMessage: (message: string) => void
}

const ErrorMessage = ({ message, setErrorMessage }: ErrorMessageProps) => {
  const base = BASE_URL || ''

  const handleClose = () => {
    setErrorMessage('')
  }

  return (
    <ErrorWrapper $visible={message ? true : false}>
      <ErrorImage src={`${base}/img/t1.png`} alt="Error" />
      <span id="error">{message}</span>
      <CloseButton onClick={handleClose} />
    </ErrorWrapper>
  )
}

export default ErrorMessage
