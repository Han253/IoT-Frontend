export interface Resource {
  id: number
  description: string
}

export interface ResourceForm {
  description: string
}

export interface ResourceActionForm {
  name: string
  description: string
}

export interface ResourceAction {
  id: number
  name: string
  description: string
}
