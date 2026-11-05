/**
 * Celestial geometry. Longitude 0° = start of Mesha at 12 o'clock, increasing clockwise
 * (the orientation used throughout the design PDF).
 */
export function polar(radius: number, degrees: number): { x: number; y: number } {
  const radians = (degrees * Math.PI) / 180
  return {
    x: round(radius * Math.sin(radians)),
    y: round(-radius * Math.cos(radians)),
  }
}

/** SVG arc path from startDeg to endDeg (clockwise) on a circle centred at 0,0 */
export function arcPath(radius: number, startDeg: number, endDeg: number): string {
  const start = polar(radius, startDeg)
  const end = polar(radius, endDeg)
  const sweep = (((endDeg - startDeg) % 360) + 360) % 360
  const large = sweep > 180 ? 1 : 0
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${large} 1 ${end.x} ${end.y}`
}

// `|| 0` turns -0 into 0
const round = (value: number) => Math.round(value * 100) / 100 || 0
