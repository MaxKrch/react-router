import { render, screen } from '@testing-library/react'
import NotFoundPage from './NotFoundPage'
import { ROUTES } from '@/shared/const/routes'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'

const mockedNavigate = vi.fn()

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: () => mockedNavigate,
}))

describe('NotFoundPage', () => {
  const backButtonName = /назад/i
  const toMainButtonName = /на главную/i

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders all expected text and buttons', () => {
    const firstExpectedText = /такой страницы нет/i
    const secondExpectedText = /404/i

    render(<NotFoundPage />)

    expect(screen.getByText(firstExpectedText)).toBeInTheDocument()
    expect(screen.getByText(secondExpectedText)).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: backButtonName,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: toMainButtonName,
      })
    ).toBeInTheDocument()
  })

  it("calls navigate with -1 when 'Назад' button is clicked", async () => {
    render(<NotFoundPage />)

    await userEvent.click(
      screen.getByRole('button', {
        name: backButtonName,
      })
    )

    expect(mockedNavigate).toHaveBeenCalledWith(-1)
  })

  it("calls navigate with ROUTES.MAIN when 'На главную' button is clicked", async () => {
    render(<NotFoundPage />)

    await userEvent.click(
      screen.getByRole('button', {
        name: toMainButtonName,
      })
    )

    expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.MAIN)
  })
})
