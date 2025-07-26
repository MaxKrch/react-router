import { MemoryRouter } from 'react-router-dom'
import { screen, render } from '@testing-library/react'
import { ROUTES } from '@/shared/const/routes'
import AppMenu from './AppMenu'

describe('Component: RaceMenu', () => {
  ;(it('renders all expected links with correct urls', () => {
    render(
      <MemoryRouter>
        <AppMenu />
      </MemoryRouter>
    )

    expect(screen.getByText(/Race Taxi/i)).toHaveAttribute(
      'href',
      ROUTES.RACE_TAXI.HOME
    )
    expect(screen.getByText(/Magazine/i)).toHaveAttribute(
      'href',
      ROUTES.NEWS_MAGAZINE.GUEST
    )
    expect(screen.getByText(/Network/i)).toHaveAttribute(
      'href',
      ROUTES.SOCIAL_NETWORK.POST_FEED
    )
    expect(screen.getByText(/Main Page/i)).toHaveAttribute('href', ROUTES.MAIN)
  }),
    it('applies active class to current route', () => {
      render(
        <MemoryRouter initialEntries={[ROUTES.NEWS_MAGAZINE.BASE]}>
          <AppMenu />
        </MemoryRouter>
      )

      const activeLink = screen.getByText(/Magazine/i)

      expect(activeLink).toHaveClass('text-white')
    }))
})
