export function formatToDateLocal(dateStr: string): string {
  if (dateStr) {
    return new Date(dateStr).toLocaleString()
  }
  return ''
}
