import type { NewsType } from '@/shared/types/news'
import { render, screen } from '@testing-library/react'
import NewsItem from './NewsItem'
import { MemoryRouter } from 'react-router-dom'

describe('NewsItem', () => {
  it('renders image, title and content correctly', () => {
    const mockNews: NewsType = {
      id: '123',
      image: 'img.png',
      title: 'Hello',
      content: 'Content',
    }

    render(
      <MemoryRouter>
        <NewsItem news={mockNews} />
      </MemoryRouter>
    )

    expect(screen.getByRole('img')).toHaveAttribute('src', mockNews.image)
    expect(screen.getByText(mockNews.title)).toBeInTheDocument()
    expect(screen.getByText(mockNews.content)).toBeInTheDocument()
  })
})
