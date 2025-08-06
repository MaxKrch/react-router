import { UserProvider } from '@/features/user/model'
import { ROUTES } from '@/shared/const/routes'
import { AUTH_STATUS } from '@/shared/const/status'
import { render, screen, waitFor } from '@testing-library/react'
import type { ComponentType } from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { vi } from 'vitest'

let status: keyof typeof AUTH_STATUS = 'IDLE'
vi.mock('@/features/user/model/use-user-context', () => ({
  default: () => ({
    state: {
      status: AUTH_STATUS[status],
    },
  }),
}))

describe('Component: PrivateRouter', () => {
  let PrivateRouter: typeof import('./PrivateRouter').default
  let TestComponent: ComponentType
  beforeEach(async () => {
    PrivateRouter = (await import('./PrivateRouter')).default
    // eslint-disable-next-line react/display-name
    TestComponent = () => {
      const router = createMemoryRouter(
        [
          {
            path: ROUTES.NEWS_MAGAZINE.NEWS_DEATILS,
            element: (
              <UserProvider>
                <PrivateRouter>
                  <div>Private Page</div>
                </PrivateRouter>
              </UserProvider>
            ),
          },
          {
            path: ROUTES.NEWS_MAGAZINE.GUEST,
            element: <div>Guest Page</div>,
          },
        ],
        {
          initialEntries: [ROUTES.NEWS_MAGAZINE.NEWS_DEATILS],
        }
      )

      return <RouterProvider router={router} />
    }
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('should return passed Components, when AuthStatus is Auth', () => {
    status = 'AUTH'

    render(<TestComponent />)

    expect(screen.getByText('Private Page')).toBeInTheDocument()
  })

  it('should return Spinner, when AuthStatus is Pending', () => {
    status = 'PENDING'

    render(<TestComponent />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('should redirect to GuestPage, when AuthStatus is NoAuth', async () => {
    status = 'UNAUTH'

    render(<TestComponent />)

    await waitFor(() =>
      expect(screen.getByText('Guest Page')).toBeInTheDocument()
    )
  })
})
