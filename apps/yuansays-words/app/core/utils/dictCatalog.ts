export function uniqueTaggedDicts<T extends { id: string | number }>(groupByTag: Record<string, T[]>): T[] {
  const seen = new Set<string>()
  return Object.values(groupByTag).flat().filter(dict => {
    const id = String(dict.id)
    if (seen.has(id)) return false
    seen.add(id)
    return true
  })
}
