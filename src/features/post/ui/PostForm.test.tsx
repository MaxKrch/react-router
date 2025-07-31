import type { PostType } from '@/shared/types/posts'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, vi } from 'vitest'

const mockPost: PostType = {
  id: 1,
  content: 'Test Post',
  saved: true,
  created: Date.now(),
  edited: null,
}

vi.mock('@/features/post/model/use-post-details', () => ({
  default: () => mockPost,
}))

describe('PostForm component', async () => {
  const mockOnSubmit = vi.fn()
  const mockOnCancel = vi.fn()
  const mockTitle = 'Test form'
  const mockAction = '/test/form'
  const PostForm = (await import('./PostForm')).default

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  describe('Rendering', () => {
    it('renders textarea and action buttons', () => {
      render(
        <PostForm
          onCancel={mockOnCancel}
          mode="create"
          onSubmit={mockOnSubmit}
          action={mockAction}
          title={mockTitle}
        />
      )

      expect(screen.getByPlaceholderText(/Type your text/i)).toBeInTheDocument()
      expect(
        screen.getByRole('button', {
          name: /Отмена/i,
        })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', {
          name: /Сохранить/i,
        })
      ).toBeInTheDocument()
    })

    it('renders hidden inputs in edit mode', () => {
      render(
        <PostForm
          onCancel={mockOnCancel}
          mode="edit"
          onSubmit={mockOnSubmit}
          action={mockAction}
          title={mockTitle}
        />
      )
      expect(screen.getByPlaceholderText(/Type your text/i)).toHaveValue(
        mockPost.content
      )
      expect(
        screen.getByDisplayValue(mockPost.id as number)
      ).toBeInTheDocument()
      expect(
        screen.getByDisplayValue(mockPost.created as number)
      ).toBeInTheDocument()
    })
  })

  describe('Submit button state', () => {
    it('disables submit button when submitDisabled is true', () => {
      render(
        <PostForm
          onCancel={mockOnCancel}
          mode="edit"
          onSubmit={mockOnSubmit}
          action={mockAction}
          title={mockTitle}
          submitDisabled={true}
        />
      )

      expect(
        screen.getByRole('button', {
          name: /Сохранить/i,
        })
      ).toBeDisabled()
    })
    it('enables submit button when submitDisabled is false or undefined', () => {
      render(
        <PostForm
          onCancel={mockOnCancel}
          mode="edit"
          onSubmit={mockOnSubmit}
          action={mockAction}
          title={mockTitle}
        />
      )

      expect(
        screen.getByRole('button', {
          name: /Сохранить/i,
        })
      ).toBeEnabled()
    })
  })

  describe('Validation', () => {
    it('shows error if submitted content is shorter than 3 characters anf form dond send', async () => {
      const error = 'Пост должен быть длиннее двух символов'
      render(
        <PostForm
          onCancel={mockOnCancel}
          mode="create"
          onSubmit={mockOnSubmit}
          action={mockAction}
          title={mockTitle}
        />
      )

      expect(screen.queryByText(error)).not.toBeInTheDocument()

      const textarea = screen.getByPlaceholderText(/Type your text/i)
      const submitBtn = screen.getByRole('button', {
        name: /Сохранить/i,
      })

      await userEvent.clear(textarea)
      await userEvent.type(textarea, 'a')
      await userEvent.click(submitBtn)

      expect(await screen.findByText(error)).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()
    })
  })

  describe('Callback handlers', () => {
    it('calls onSubmit if content is valid', async () => {
      render(
        <PostForm
          onCancel={mockOnCancel}
          mode="create"
          onSubmit={mockOnSubmit}
          action={mockAction}
          title={mockTitle}
        />
      )

      const textarea = screen.getByPlaceholderText(/Type your text/i)
      const submitBtn = screen.getByRole('button', {
        name: /Сохранить/i,
      })

      await userEvent.type(textarea, mockPost.content)
      await userEvent.click(submitBtn)

      expect(mockOnSubmit).toHaveBeenCalled()
    })

    it('calls onCancel when cancel button is clicked', async () => {
      render(
        <PostForm
          onCancel={mockOnCancel}
          mode="create"
          onSubmit={mockOnSubmit}
          action={mockAction}
          title={mockTitle}
        />
      )

      const cancelBtn = screen.getByRole('button', {
        name: /Отмена/i,
      })

      await userEvent.click(cancelBtn)

      expect(mockOnCancel).toHaveBeenCalled()
    })
  })
})
