import { QTableProps } from 'quasar'
import { Device } from './devices'

export interface Environment {
  id: number
  name: string
  description: string

  devices?: Device[]
}

export interface EnvironmentForm {
  name: string
  description: string
}

export const environmentColumns: QTableProps['columns'] = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
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
    field: 'options',
    align: 'center',
  },
]
