export const IPHONE_PRO_MAX_MM = { width: 78, height: 163.4 } as const
export const PHONE_CANVAS = { width: 430, height: 932 } as const
export const DEVICE_FRAME = {
  width: Math.round(PHONE_CANVAS.height * IPHONE_PRO_MAX_MM.width / IPHONE_PRO_MAX_MM.height),
  height: PHONE_CANVAS.height,
} as const
