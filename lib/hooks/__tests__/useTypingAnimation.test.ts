import { renderHook, act } from '@testing-library/react'
import { useTypingAnimation } from '../useTypingAnimation'

describe('useTypingAnimation', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers()
    })
    jest.useRealTimers()
  })

  it('should start with empty text', () => {
    const { result } = renderHook(() =>
      useTypingAnimation({ text: 'Hello', speed: 100 })
    )

    expect(result.current.typedText).toBe('')
    expect(result.current.isComplete).toBe(false)
  })

  it('should type text character by character', () => {
    const { result } = renderHook(() =>
      useTypingAnimation({ text: 'Hello', speed: 100 })
    )

    // After 100ms, first character
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current.typedText).toBe('H')

    // After 200ms, second character
    act(() => {
      jest.advanceTimersByTime(100)
    })
    expect(result.current.typedText).toBe('He')

    // After 500ms + one more interval, all characters and complete
    act(() => {
      jest.advanceTimersByTime(400)
    })
    expect(result.current.typedText).toBe('Hello')
    expect(result.current.isComplete).toBe(true)
  })

  it('should respect custom typing speed', () => {
    const { result } = renderHook(() =>
      useTypingAnimation({ text: 'Hi', speed: 50 })
    )

    act(() => {
      jest.advanceTimersByTime(50)
    })
    expect(result.current.typedText).toBe('H')

    act(() => {
      jest.advanceTimersByTime(100) // Extra time to mark as complete
    })
    expect(result.current.typedText).toBe('Hi')
    expect(result.current.isComplete).toBe(true)
  })

  it('should mark as complete when text is fully typed', () => {
    const { result } = renderHook(() =>
      useTypingAnimation({ text: 'Test', speed: 50 })
    )

    expect(result.current.isComplete).toBe(false)

    // Type all characters
    act(() => {
      jest.advanceTimersByTime(250)
    })

    expect(result.current.typedText).toBe('Test')
    expect(result.current.isComplete).toBe(true)
  })

  it('should handle empty text', () => {
    const { result } = renderHook(() =>
      useTypingAnimation({ text: '', speed: 100 })
    )

    act(() => {
      jest.advanceTimersByTime(200)
    })

    expect(result.current.typedText).toBe('')
    expect(result.current.isComplete).toBe(true)
  })
})
