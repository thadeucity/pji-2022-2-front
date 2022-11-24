// djb2 based hash
export const unsafeHash = (str: string, hashLength = 16): string => {
  const len = str.length
  let h = 5381

  for (let i = 0; i < len; i++) {
    h = (h * 33) ^ str.charCodeAt(i)
  }

  const hashNum = h >>> 0

  return hashNum.toString(16).padStart(hashLength, '0').slice(0, hashLength)
}
