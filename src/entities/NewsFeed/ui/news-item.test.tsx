import type { NewsType } from '@/shared/types/news'
import { render, screen } from '@testing-library/react'
import NewsItem from './NewsItem'


describe('NewsItem', () => {
  it('renders image, title and content correctly', () => {
    const mockNews: NewsType = {
      id: '123',
      image: 'img.png',
      title: 'Hello',
      content: 'Content',
    }

    render(<NewsItem news={mockNews} />)

    expect(screen.getByRole('img')).toHaveAttribute('src', mockNews.image)
    expect(screen.getByText(mockNews.title)).toBeInTheDocument()
    expect(screen.getByText(mockNews.content)).toBeInTheDocument()
  })
})
