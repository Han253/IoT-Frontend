import { AxiosError } from 'axios'

export function setErrorsIfInvalidForm(
  error: AxiosError,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setErrors: (errs: any) => void
) {
  if (error.response?.status == 400 && error.response.data.errors) {
    setErrors(error.response.data.errors)
  }
}
