import { QTableColumn } from 'quasar'

export interface CategoryForm {
  name: string
  description: string
}

export interface Category {
  id: number
  name: string
  description: string
}

export const categoryColumns: QTableColumn[] = [
  { name: 'name', label: 'Name', field: 'name' },
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
