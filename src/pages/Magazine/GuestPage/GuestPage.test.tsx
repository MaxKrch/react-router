import { render, screen } from '@testing-library/react'
import GuestPage from './GuestPage'

describe('GuestPage', () => {
  it('renders heading and subtitle', () => {
    const firstExpected = /Neto Social/i
    const secondExpected = /It's here/i

    render(<GuestPage />)
    expect(screen.getByText(firstExpected)).toBeInTheDocument()
    expect(screen.getByText(secondExpected)).toBeInTheDocument()
  })
})
