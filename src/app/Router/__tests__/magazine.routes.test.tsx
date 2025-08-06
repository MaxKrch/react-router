import { AUTH_STATUS } from '@/shared/const/status'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { vi } from 'vitest'
import { ROUTES } from '@/shared/const/routes'
import { render, screen } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import type { UserProfile } from '@/shared/types'

let status: keyof typeof AUTH_STATUS = 'IDLE'
const mockUser: UserProfile = {
  id: '123',
  login: 'max',
  avatar: 'www.avatar.com/1',
  name: 'Max',
}
vi.mock('@/features/user/model/use-user-context', () => ({
  default: () => ({
    state: {
      get status() {
        return AUTH_STATUS[status]
      },
      profile: mockUser,
    },
  }),
}))

vi.mock('@/features/user/model/user-context', () => ({
  default: ({ children }: PropsWithChildren) => <>{children}</>,
}))

vi.mock('@/pages/Magazine/NewsFeed', () => ({
  default: () => <div>NewsFeed Page</div>,
}))

vi.mock('@/pages/Magazine/NewsDetails', () => ({
  default: () => <div>NewsDetails Page</div>,
}))

describe('magazineRoutes', () => {
  let routes: typeof import('../routes').default
  let UserProvider: typeof import('@/features/user/model/user-context').default

  beforeEach(async () => {
    routes = (await import('../routes')).default
    UserProvider = (await import('@/features/user/model/user-context')).default
  })

  afterAll(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  it('renders GuestPage for UNAUTH user at index route', async () => {
    status = 'UNAUTH'
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.NEWS_MAGAZINE.BASE],
    })

    render(
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    )

    expect(await screen.findByTestId('guestPage')).toBeInTheDocument()
  })

  it('redirects from NewsFeed for UNAUTH user', async () => {
    status = 'UNAUTH'
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.NEWS_MAGAZINE.NEWS_FEED],
    })

    render(
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    )

    expect(await screen.findByTestId('guestPage')).toBeInTheDocument()
  })

  it('renders NewsFeed for AUTH user', async () => {
    status = 'AUTH'
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.NEWS_MAGAZINE.NEWS_FEED],
    })

    render(
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    )

    expect(await screen.findByText('NewsFeed Page')).toBeInTheDocument()
  })

  it('renders NewsDetails for AUTH user', async () => {
    status = 'AUTH'
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.NEWS_MAGAZINE.NEWS_DEATILS],
    })

    render(
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    )

    expect(await screen.findByText('NewsDetails Page')).toBeInTheDocument()
  })

  it('shows Spinner when status is PENDING', async () => {
    status = 'PENDING'

    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.NEWS_MAGAZINE.GUEST],
    })

    render(
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    )

    expect(await screen.findByTestId('spinner')).toBeInTheDocument()
  })
})
