import { renderHook, act } from '@testing-library/react'
import { useScrollTracking } from '../useScrollTracking'

describe('useScrollTracking', () => {
  const mockSectionIds = ['section1', 'section2', 'section3']

  beforeEach(() => {
    // Setup mock DOM elements
    mockSectionIds.forEach((id, index) => {
      const element = document.createElement('div')
      element.id = id
      Object.defineProperty(element, 'offsetTop', {
        value: index * 1000,
        writable: true,
      })
      Object.defineProperty(element, 'offsetHeight', {
        value: 800,
        writable: true,
      })
      document.body.appendChild(element)
    })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('should return first section as initial active section', () => {
    const { result } = renderHook(() => useScrollTracking(mockSectionIds, 100))
    expect(result.current).toBe('section1')
  })

  it('should update active section on scroll', () => {
    const { result } = renderHook(() => useScrollTracking(mockSectionIds, 100))

    // Scroll to second section
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 1000, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe('section2')
  })

  it('should handle custom offset', () => {
    const { result } = renderHook(() => useScrollTracking(mockSectionIds, 200))

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 900, writable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe('section2')
  })

  it('should handle empty section IDs array', () => {
    const { result } = renderHook(() => useScrollTracking([], 100))
    expect(result.current).toBe('')
  })

  it('should cleanup scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollTracking(mockSectionIds, 100))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeEventListenerSpy.mockRestore()
  })
})
