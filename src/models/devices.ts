import { QTableProps } from 'quasar'
import { Category } from './categories'
import { Property } from './properties'
import { Resource } from './resources'

export enum DeviceStatus {
  Active,
  Inactive,
  Busy,
}

export interface DeviceForm {
  name: string
  description: string | null
  categories: number[]
  device_parent: number | null
  environment: number | null
  gateway: boolean
}

export type OnValidDeviceForm = (device: DeviceForm | null) => void

export interface Device {
  id: number
  name: string
  description: string
  gateway: boolean
  created_at: string
  update_at: string
  device_parent: number
  environment: number
  properties: Property[]
  resources: Resource[]
  categories: Category[]
  devices: Device[]
}

export interface VirtualDevice {
  id: number
  tag: string
  description: string
  status: DeviceStatus
}

export interface VirtualDeviceForm {
  tag: string
  description: string
}

export const deviceColumns: QTableProps['columns'] = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
  },
  {
    name: 'created_at',
    label: 'Created At',
    field: 'created_at',
    align: 'left',
  },
  {
    name: 'update_at',
    label: 'Updated At',
    field: 'update_at',
    align: 'left',
  },
  {
    name: 'options',
    label: 'Options',
    field: 'options',
    align: 'left',
  },
]

export const deviceColumnsChildren: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
  },
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'left',
  },
  {
    name: 'options',
    label: 'Options',
    field: 'options',
    align: 'left',
  },
]
