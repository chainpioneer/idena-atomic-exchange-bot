export default function splitEventData(data: string, format?: (piece: string) => any, index?: number) {
  const results = []
  for (let i = 2; i < data.length; i += 64) {
    if (index === undefined) {
      const piece = `0x${data.substring(i, i + 64)}`
      results.push(format ? format(piece) : piece)
    } else if (index === (i - 2) / 64) {
      const piece = `0x${data.substring(i, i + 64)}`
      return format ? format(piece) : piece
    }
  }
  return results
}