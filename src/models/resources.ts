import { Property } from './properties'

export enum ResourceType {
  Sensor,
  Actuator,
}

export interface Resource {
  id: number
  name: string
  description: string
  resource_type: ResourceType
  device_parent: number
  properties: Array<Property>
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
