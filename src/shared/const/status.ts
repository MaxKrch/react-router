export const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  SUCCESS: 'success',
  ERROR: 'error',
} as const

export type STATUS_TYPE = (typeof STATUS)[keyof typeof STATUS]

export const AUTH_STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  AUTH: 'authenticated',
  UNAUTH: 'unauthenticated',
} as const

export type AUTH_STATUS_TYPE = (typeof AUTH_STATUS)[keyof typeof AUTH_STATUS]
