export const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export type STATUS_TYPE = (typeof STATUS)[keyof typeof STATUS]
