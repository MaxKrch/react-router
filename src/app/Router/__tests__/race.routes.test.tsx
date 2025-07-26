import { ROUTES } from '@/shared/const/routes'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import routes from '@/app/Router/routes'

describe('Routes: race', () => {
  it(`renders RaceLayout on ${ROUTES.RACE_TAXI.BASE} route`, async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.RACE_TAXI.BASE],
    })

    render(<RouterProvider router={router} />)

    expect(await screen.findByTestId(/RaceLayout/i)).toBeInTheDocument()
  })

  it(`renders Home page on ${ROUTES.RACE_TAXI.HOME} route`, async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.RACE_TAXI.HOME],
    })

    render(<RouterProvider router={router} />)

    expect(
      await screen.findByRole('heading', {
        name: /Гоночн​ое такси/i,
      })
    ).toBeInTheDocument()
  })

  it(`renders Drift page on ${ROUTES.RACE_TAXI.DRIFT} route`, async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.RACE_TAXI.DRIFT],
    })

    render(<RouterProvider router={router} />)

    expect(
      await screen.findByRole('heading', {
        name: /Дрифт-такси/i,
      })
    ).toBeInTheDocument()
  })

  it(`renders Forza Carting page on ${ROUTES.RACE_TAXI.FORZA} route`, async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.RACE_TAXI.FORZA],
    })

    render(<RouterProvider router={router} />)

    expect(
      await screen.findByRole('heading', {
        name: /Forza Karting Sochi/i,
      })
    ).toBeInTheDocument()
  })

  it(`renders TimeAttack page on ${ROUTES.RACE_TAXI.TIME_ATTACK} route`, async () => {
    const router = createMemoryRouter(routes, {
      initialEntries: [ROUTES.RACE_TAXI.TIME_ATTACK],
    })
    render(<RouterProvider router={router} />)

    expect(
      await screen.findByRole('heading', {
        name: /Гонка ​​​​​​Time Attack/i,
      })
    ).toBeInTheDocument()
  })
})
