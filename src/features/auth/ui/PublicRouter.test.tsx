import { UserProvider } from '@/features/user/model'
import { ROUTES } from '@/shared/const/routes'
import { AUTH_STATUS } from '@/shared/const/status'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { vi } from 'vitest'
import type { ComponentType } from 'react'
import { render, screen, waitFor } from '@testing-library/react'

let status: keyof typeof AUTH_STATUS = 'IDLE'
vi.mock('@/features/user/model/use-user-context', () => ({
  default: () => ({
    state: {
      status: AUTH_STATUS[status],
    },
  }),
}))

describe('Component: PublicRouter', () => {
  let PublicRouter: typeof import('./PublicRouter').default
  let TestComponent: ComponentType

  beforeEach(async () => {
    PublicRouter = (await import('./PublicRouter')).default
    // eslint-disable-next-line react/display-name
    TestComponent = () => {
      const router = createMemoryRouter(
        [
          {
            path: ROUTES.NEWS_MAGAZINE.GUEST,
            element: (
              <UserProvider>
                <PublicRouter>
                  <div>Guest Page</div>
                </PublicRouter>
              </UserProvider>
            ),
          },
          {
            path: ROUTES.NEWS_MAGAZINE.NEWS_FEED,
            element: <div>News Page</div>,
          },
        ],
        {
          initialEntries: [ROUTES.NEWS_MAGAZINE.GUEST],
        }
      )

      return <RouterProvider router={router} />
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.resetAllMocks()
  })

  it('should return children, whet AuthStatus is UNAUTH', () => {
    status = 'UNAUTH'

    render(<TestComponent />)

    expect(screen.getByText('Guest Page')).toBeInTheDocument()
  })

  it('should return Spinner, whet AuthStatus is PENDING', () => {
    status = 'PENDING'

    render(<TestComponent />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('should redirect to FeedNews Page, whet AuthStatus is AUTH', async () => {
    status = 'AUTH'

    render(<TestComponent />)

    await waitFor(() =>
      expect(screen.getByText('News Page')).toBeInTheDocument()
    )
  })
})
