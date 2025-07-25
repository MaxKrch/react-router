import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Error from './ErrorMessage'

describe('Component: Error', () => {
  const mockErrorMessage = `Ошибка`
  const mockHandleError = vi.fn()

  it('should render default error message when `error` prop is not provided', () => {
    const defaultErrorMessage = /Что-то пошло не так.../i

    render(<Error />)

    expect(screen.getByText(defaultErrorMessage)).toBeInTheDocument()
  })

  it('should render custom error message when `error` prop is provided', () => {
    render(<Error error={mockErrorMessage} />)

    expect(
      screen.getByText(new RegExp(mockErrorMessage, `i`))
    ).toBeInTheDocument()
  })

  it('should not render retry button if onClick is not provided', async () => {
    render(<Error error={mockErrorMessage} />)

    expect(screen.queryByRole(`button`)).not.toBeInTheDocument()
  })

  it('should call `onClick` callback when retry button is clicked', async () => {
    mockHandleError.mockClear()

    render(<Error onClick={mockHandleError} error={mockErrorMessage} />)

    await userEvent.click(screen.getByRole(`button`))

    expect(mockHandleError).toHaveBeenCalledTimes(1)
  })
})
