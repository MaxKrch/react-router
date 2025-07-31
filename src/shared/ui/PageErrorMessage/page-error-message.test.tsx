import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, useNavigate, useLocation } from 'react-router-dom'
import PageErrorMessage from './PageErrorMessage'
import { vi } from 'vitest'

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}))

describe('PageErrorMessage', () => {
  const mockNavigate = vi.fn()

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useLocation).mockReturnValue({
      pathname: '/test',
      search: '',
      hash: '',
      state: null,
      key: 'test-key',
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    render(<PageErrorMessage />, { wrapper: MemoryRouter })

    expect(screen.getByText('Кажется, что-то пошло не так')).toBeInTheDocument()
    expect(screen.getByText('Cкоро все починим!')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Перезагрузить страницу' })
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Назад' })).toBeInTheDocument()
  })

  it('calls navigate with current pathname on reload', () => {
    render(<PageErrorMessage />, { wrapper: MemoryRouter })

    fireEvent.click(
      screen.getByRole('button', { name: 'Перезагрузить страницу' })
    )
    expect(mockNavigate).toHaveBeenCalledWith('/test', { replace: true })
  })

  it('calls navigate with -1 on goBack', () => {
    render(<PageErrorMessage />, { wrapper: MemoryRouter })

    fireEvent.click(screen.getByRole('button', { name: 'Назад' }))
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})
