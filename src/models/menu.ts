export interface MenuItem {
  separator?: boolean
  label?: string
  icon?: string
  to?: { name: string }
}

export const menuList: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'dashboard',
    to: { name: 'dashboard' },
  },
  {
    separator: true,
  },
  {
    label: 'Categories',
    icon: 'category',
    to: { name: 'categories.index' },
  },
  {
    label: 'Devices',
    icon: 'devices',
    to: { name: 'devices.index' },
  },
  {
    label: 'Environments',
    icon: 'wysiwyg',
    to: { name: 'environments.index' },
  },
  {
    label: 'Self-representation',
    icon: 'share',
    to: { name: 'selfrepresentation.index' },
  },
]
