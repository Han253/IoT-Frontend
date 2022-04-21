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
  description: string | null | null
  categories: number[]
  device_parent: number | null | null
}

export type OnValidDeviceForm = (device: DeviceForm | null) => void

export interface Device {
  id: number
  name: string
  description: string
  created_at: string
  update_at: string
  device_parent: number
  properties: Property[]
  resources: Resource[]
  categories: Category[]
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
