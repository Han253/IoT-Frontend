import { QTableProps } from 'quasar'
import { Property } from './properties'

export enum ResourceType {
  Sensor = 'SENSOR',
  Actuator = 'ACTUATOR',
}

export interface Resource {
  id: number
  name: string
  description: string
  type: ResourceType
  device_parent: number
  properties: Array<Property>
}

export interface ResourceForm {
  name: string
  description: string
  type: ResourceType
  deviceParent: number
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

export const resourceColumns: QTableProps['columns'] = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'center',
  },
  {
    name: 'type',
    label: 'Type',
    field: 'type',
    align: 'center',
  },
  {
    name: 'description',
    label: 'Description',
    field: 'description',
    align: 'center',
  },
  {
    name: 'options',
    label: 'Options',
    field: '',
    align: 'center',
  },
]
