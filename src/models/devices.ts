export enum DeviceStatus {
  Active,
  Inactive,
  Busy,
}

export interface DeviceForm {
  name: string
  description: string
}

export interface Device {
  id: number
  name: string
  description: string
}

export interface VirtualDevice {
  id: number
  tag: string
  description: string
  status: DeviceStatus
}

export interface VirtualDeviceForm {
  tag: string
  description: string
}
