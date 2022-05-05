import { QTableProps } from 'quasar'

export interface Property {
  id: number
  name: string
  value: string
  description: string
}

export interface PropertyForm {
  name: string
  description: string
  value: string
  device_parent: number | null
  resource_parent: number | null
}

export const propertyColumns: QTableProps['columns'] = [
  {
    name: 'name',
    label: 'Name',
    field: 'name',
    align: 'center',
  },
  {
    name: 'value',
    label: 'Value',
    field: 'value',
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
