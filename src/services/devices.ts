import { api } from 'src/boot/axios'
import { Device } from 'src/models/devices'
import { formatToDateLocal } from 'src/utils/dates'

const BASE_URL = '/device'

export async function fetchDevices(): Promise<Device[]> {
  const devices = (await api.get<Device[]>(BASE_URL)).data
  devices.forEach((d) => {
    d.created_at = formatToDateLocal(d.created_at)
    d.update_at = formatToDateLocal(d.created_at)
  })
  return devices
}
