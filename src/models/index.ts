export interface SelectOption {
  label: string | number
  value: string | number
}

export type ErrorHandler = (httpStatus: number) => void
