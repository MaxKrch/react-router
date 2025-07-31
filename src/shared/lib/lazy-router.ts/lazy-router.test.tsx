import { render, screen } from '@testing-library/react'
import lazyRouter from './lazy-router'
import PageErrorMessage from '@/shared/ui/PageErrorMessage'
import { describe, it, expect } from 'vitest'
import { isValidElement, type ComponentType } from 'react'
import { MemoryRouter } from 'react-router-dom'

describe('lazyRoute', () => {
  it('returns Component wrapped in Suspense on success', async () => {
    const mockComponentText = 'Loaded Component'
    const MockComponent: ComponentType = () => <div>{mockComponentText}</div>

    const route = lazyRouter(() => Promise.resolve({ default: MockComponent }))

    const result = await (route.lazy as () => Promise<any>)()

    expect(result.Component).toBeInstanceOf(Function)

    render(<result.Component />)

    expect(screen.getByText(mockComponentText)).toBeInTheDocument()
  })

  it('returns PageErrorMessage on loader error', async () => {
    const errorMessaageText = /что-то пошло не так/i
    const error = new Error('Loading failed')

    const route = lazyRouter(() => Promise.reject(error))

    const result = await (route.lazy as () => Promise<any>)()

    render(<result.Component />, { wrapper: MemoryRouter })

    expect(screen.getByText(errorMessaageText)).toBeInTheDocument()
  })

  it('always sets errorElement to PageErrorMessage', () => {
    const route = lazyRouter(() => Promise.resolve({ default: () => <div /> }))

    expect(
      isValidElement(route.errorElement) ? route.errorElement.type : null
    ).toBe(PageErrorMessage)
  })
})
