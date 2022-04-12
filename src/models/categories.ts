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
  {
    name: 'name',
    field: 'name',
    label: 'Name',
    align: 'center',
  },
  {
    name: 'description',
    field: 'description',
    label: 'Description',
    align: 'center',
  },
  {
    name: 'options',
    field: '',
    label: 'Options',
    align: 'center',
  },
]
