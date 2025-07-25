import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from './routes'
import { vi } from 'vitest'
import { ROUTES } from '@/shared/const/routes'

vi.mock('@/pages/MainPage', () => ({ default: () => <div>MainPage</div> }))

vi.mock('@/pages/RaceTaxi/Home', () => ({ default: () => <div>Race Home</div> }))
vi.mock('@/pages/RaceTaxi/ForzaCarting', () => ({ default: () => <div>Forza</div> }))
vi.mock('@/pages/RaceTaxi/Drift', () => ({ default: () => <div>Drift</div> }))
vi.mock('@/pages/RaceTaxi/TimeAttack', () => ({ default: () => <div>Time Attack</div> }))

vi.mock('@/pages/Network/CreatePost', () => ({ default: () => <div>CreatePost</div> }))
vi.mock('@/pages/Network/Feed', () => ({ default: () => <div>Feed</div> }))
vi.mock('@/pages/Network/Post', () => ({ default: () => <div>Post</div> }))

vi.mock('@/pages/Magazine/Guest', () => ({ default: () => <div>Guest</div> }))
vi.mock('@/pages/Magazine/NewsFeed', () => ({ default: () => <div>NewsFeed</div> }))
vi.mock('@/pages/Magazine/News/News', () => ({ default: () => <div>News</div> }))
vi.mock('@/pages/Magazine/NotFoundNews', () => ({ default: () => <div>Not Found News</div> }))

vi.mock('@/pages/NotFoundPage/NotFoundPage', () => ({ default: () => <div>Not Found</div> }))

vi.mock('@/layouts/AppLayout', () => ({ default: ({ children }: any) => <div>AppLayout{children}</div> }))
vi.mock('@/layouts/RaceLayout', () => ({ default: ({ children }: any) => <div>RaceLayout{children}</div> }))
vi.mock('@/layouts/NetworkLayout', () => ({ default: ({ children }: any) => <div>NetworkLayout{children}</div> }))
vi.mock('@/layouts/MagazineLayout', () => ({ default: ({ children }: any) => <div>MagazineLayout{children}</div> }))

describe('AppRouter', () => {
  
})