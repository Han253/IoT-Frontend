import { api } from 'src/boot/axios'
import { Device, DeviceForm } from 'src/models/devices'
import { formatToDateLocal } from 'src/utils/dates'

const BASE_URL = '/device'

export async function fetchDevices(): Promise<Device[]> {
  const devices = (await api.get<Device[]>(BASE_URL)).data
  devices.forEach((d) => {
    d.created_at = formatToDateLocal(d.created_at)
    d.update_at = formatToDateLocal(d.update_at)
  })
  return devices
}

export async function fetchDeviceById(id: number): Promise<Device> {
  const device = (await api.get<Device>(`${BASE_URL}/${id}`)).data
  device.created_at = formatToDateLocal(device.created_at)
  device.update_at = formatToDateLocal(device.update_at)
  return device
}

export async function storeDevice(data: DeviceForm): Promise<Device> {
  return (await api.post<Device>(BASE_URL, data)).data
}

export async function updateDevice(
  id: number,
  data: DeviceForm
): Promise<Device> {
  return (await api.put<Device>(`${BASE_URL}/${id}`, data)).data
}
