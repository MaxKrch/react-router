import { render, screen } from '@testing-library/react'
import { createMemoryRouter, Outlet, RouterProvider } from 'react-router-dom'
import routes from '@/app/Router/routes'

describe('Routes: General', () => {
  it('should render AppLayout and MainPage on "/" route', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByTestId(/AppLayout/i)).toBeInTheDocument()
    expect(screen.getByText(/Welcome To Main Page/i)).toBeInTheDocument()
  })

  it('should render 404 on incorrect route', async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['incorrect_route'],
    })

    render(<RouterProvider router={router} />)

    expect(await screen.findByText(/404/i)).toBeInTheDocument()
  })
})
