// biome-ignore-all lint/suspicious/noBitwiseOperators: we actually need bitwise operators

export const key = 42
export const obfuscate = (value: string) => [...value].map((c) => c.charCodeAt(0) ^ key)
export const deobfuscate = (value: number[]) => String.fromCharCode(...value.map((n) => n ^ key))
