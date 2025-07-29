import { vi } from 'vitest'
import fetchRequest from './fetch-request'
import { STATUS } from '@/shared/const/status'

describe('fetchRequest function', () => {
  const mockUrl = `http://www.test.com`
  const mockToken = `jkhkf5df`
  const mockResponseData = {
    test: `string`,
  }
  const mockRequestOptions = {
    method: `POST`,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  beforeAll(() => {
    vi.stubGlobal('fetch', vi.fn())
    localStorage.setItem(`token`, mockToken)
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  describe('successful responses', () => {
    it('should return status SUCCESS and data on successful fetch without auth', async () => {
      const expected = {
        status: STATUS.SUCCESS,
        data: mockResponseData,
      }

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponseData),
      } as unknown as Response)

      const received = await fetchRequest({
        url: mockUrl,
        options: mockRequestOptions,
      })

      expect(received).toEqual(expected)
    })

    it('should include Authorization header and return SUCCESS when auth is true and token exists', async () => {
      const expected = {
        status: STATUS.SUCCESS,
        data: mockResponseData,
      }

      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponseData),
      } as unknown as Response)

      const received = await fetchRequest({
        url: mockUrl,
        options: mockRequestOptions,
        auth: true,
      })

      expect(global.fetch).toHaveBeenCalledWith(
        mockUrl,
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: `Bearer ${mockToken}`,
          }),
        })
      )
      expect(received).toEqual(expected)
    })
  })

  describe('error handling', () => {
    it('should return status ERROR and error on fetch response with ok = false', async () => {
      vi.mocked(global.fetch).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ message: 'Not Found' }),
      } as unknown as Response)

      const response = await fetchRequest({
        url: mockUrl,
        options: mockRequestOptions,
      })

      expect(response.status).toEqual(STATUS.ERROR)
      expect(response.error).toBeInstanceOf(Error)
      expect(response.error?.message).toBe(`Bad Response`)
    })

    it('should return status ERROR and error when fetch throws an exception', async () => {
      vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Custom Error'))

      const response = await fetchRequest({
        url: mockUrl,
        options: mockRequestOptions,
      })

      expect(response.status).toEqual(STATUS.ERROR)
      expect(response.error).toBeInstanceOf(Error)
      expect(response.error?.message).toBe(`Custom Error`)
    })
  })

  describe('fetch call parameters', () => {
    it('should call fetch with the correct URL and options', async () => {
      await fetchRequest({
        url: mockUrl,
        options: mockRequestOptions,
      })

      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(mockUrl, mockRequestOptions)
    })

    it('should correctly merge headers including Authorization if token is present', async () => {
      await fetchRequest({
        url: mockUrl,
        options: mockRequestOptions,
        auth: true,
      })

      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(mockUrl, {
        ...mockRequestOptions,
        headers: {
          ...mockRequestOptions.headers,
          Authorization: `Bearer ${mockToken}`,
        },
      })
    })

    it('should not include Authorization header when auth is false or token is missing', async () => {
      localStorage.removeItem('token')

      expect(localStorage.getItem('token')).toBeNull()

      await fetchRequest({
        url: mockUrl,
        options: mockRequestOptions,
        auth: true,
      })

      expect(global.fetch).toHaveBeenCalledTimes(1)

      expect(global.fetch).toHaveBeenCalledWith(
        mockUrl,
        expect.objectContaining({
          headers: expect.not.objectContaining({
            Authorization: expect.anything(),
          }),
        })
      )
    })
  })
})
