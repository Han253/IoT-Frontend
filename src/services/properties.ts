import { api } from 'src/boot/axios'
import { Property, PropertyForm } from 'src/models/properties'

const BASE_URL = '/property'

export async function fetchPropertyById(id: number): Promise<Property> {
  return (await api.get<Property>(`${BASE_URL}/${id}`)).data
}

export async function storeProperty(data: PropertyForm): Promise<Property> {
  return (await api.post<Property>(BASE_URL, data)).data
}

export async function updateProperty(
  id: number,
  data: PropertyForm
): Promise<Property> {
  return (await api.put<Property>(`${BASE_URL}/${id}`, data)).data
}
