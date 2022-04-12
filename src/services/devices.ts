import { Device, DeviceForm } from 'src/models/devices'

export function fetchAllDevices(): Promise<Device[]> {
  return Promise.resolve([])
}

export async function fetchDeviceById(id: number): Promise<Device> {
  return Promise.resolve({
    id: 3,
    name: '',
    description: '',
  })
}

export async function storeDevice(data: DeviceForm): Promise<Device> {
  return Promise.resolve({
    id: 3,
    name: '',
    description: '',
  })
}
