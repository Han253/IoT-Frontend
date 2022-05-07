import { api } from 'src/boot/axios'
import { Resource, ResourceForm } from 'src/models/resources'

const BASE_URL = '/resource'

export async function fetchResourceById(id: number): Promise<Resource> {
  return (await api.get<Resource>(`${BASE_URL}/${id}`)).data
}

export async function storeResource(data: ResourceForm): Promise<Resource> {
  return (await api.post<Resource>(BASE_URL, data)).data
}

export async function updateResource(
  id: number,
  data: ResourceForm
): Promise<Resource> {
  return (await api.put<Resource>(`${BASE_URL}/${id}`, data)).data
}
