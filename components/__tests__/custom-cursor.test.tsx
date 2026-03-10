import { render } from '@testing-library/react';
import { CustomCursor } from '../custom-cursor'

describe('CustomCursor', () => {
  const mockMousePosition = { x: 100, y: 200 }

  it('should render main cursor at correct position', () => {
    const { container } = render(
      <CustomCursor mousePosition={mockMousePosition} />
    )

    const cursor = container.querySelector('[style*="left: 100px"]')
    expect(cursor).toBeInTheDocument()
    expect(cursor).toHaveStyle({ left: '100px', top: '200px' })
  })

  it('should apply correct styles to cursor', () => {
    const { container } = render(
      <CustomCursor mousePosition={mockMousePosition} />
    )

    const cursors = container.querySelectorAll('[class*="fixed"]')
    const mainCursor = cursors[cursors.length - 1] // Last element is main cursor

    expect(mainCursor).toHaveStyle({
      background: 'white',
      mixBlendMode: 'difference',
    })
  })

  it('should handle zero coordinates', () => {
    const { container } = render(
      <CustomCursor mousePosition={{ x: 0, y: 0 }} />
    )

    const cursor = container.querySelector('[style*="left: 0px"]')
    expect(cursor).toBeInTheDocument()
  })
})
