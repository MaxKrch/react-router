export type ButtonProps = {
  title: string
  type?: 'submit' | 'reset' | 'button'
  onClick?: () => void
  size?: 'small' | 'normal' | 'big'
  disabled?: boolean
}
