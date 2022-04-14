import { api } from 'src/boot/axios'
import { Category, CategoryForm } from 'src/models/categories'

const BASE_URL = '/category'

export async function fetchCategories(): Promise<Category[]> {
  return (await api.get<Category[]>(BASE_URL)).data
}

export async function fetchCategoryById(id: number): Promise<Category> {
  return (await api.get<Category>(`${BASE_URL}/${id}`)).data
}

export async function storeCategory(data: CategoryForm): Promise<Category> {
  return (await api.post<Category>(BASE_URL, data)).data
}

export async function updateCategory(id: number, data: CategoryForm) {
  return (await api.put(`${BASE_URL}/${id}`, data)).data
}

export async function deleteCategory(id: number) {
  return (await api.delete(`${BASE_URL}/${id}`)).data
}
