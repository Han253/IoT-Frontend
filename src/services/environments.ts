import { api } from 'src/boot/axios'
import { Environment, EnvironmentForm } from 'src/models/environments'

const BASE_URL = '/environment'

export async function fetchEnvironments(): Promise<Environment[]> {
  return (await api.get<Environment[]>(BASE_URL)).data
}

export async function fetchEnvironmentById(id: number): Promise<Environment> {
  return (await api.get<Environment>(`${BASE_URL}/${id}`)).data
}

export async function storeEnvironment(
  data: EnvironmentForm
): Promise<Environment> {
  return (await api.post<Environment>(BASE_URL, data)).data
}

export async function updateEnvironment(id: number, data: EnvironmentForm) {
  return (await api.put(`${BASE_URL}/${id}`, data)).data
}

export async function deleteEnvironment(id: number) {
  return (await api.delete(`${BASE_URL}/${id}`)).data
}
