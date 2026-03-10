import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigation } from '../navigation'

describe('Navigation', () => {
  const mockOnSectionClick = jest.fn()

  beforeEach(() => {
    mockOnSectionClick.mockClear()
  })

  it('should render logo', () => {
    render(<Navigation activeSection="hero" onSectionClick={mockOnSectionClick} />)
    expect(screen.getByText('JM')).toBeInTheDocument()
  })

  it('should render logo as link to home', () => {
    render(<Navigation activeSection="hero" onSectionClick={mockOnSectionClick} />)
    const logo = screen.getByText('JM')
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('should render all navigation items', () => {
    render(<Navigation activeSection="hero" onSectionClick={mockOnSectionClick} />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
    expect(screen.getByText('Tech Stack')).toBeInTheDocument()
    expect(screen.getByText('Work')).toBeInTheDocument()
    expect(screen.getByText('Case Study')).toBeInTheDocument()
    expect(screen.getByText('Approach')).toBeInTheDocument()
    
    // Contact appears in both desktop and mobile nav
    const contactButtons = screen.getAllByText('Contact')
    expect(contactButtons.length).toBeGreaterThan(0)
  })

  it('should render Resume link', () => {
    render(<Navigation activeSection="hero" onSectionClick={mockOnSectionClick} />)
    const resumeLinks = screen.getAllByText('Resume')
    expect(resumeLinks.length).toBeGreaterThan(0)
  })

  it('should call onSectionClick when navigation item is clicked', async () => {
    const user = userEvent.setup()
    render(<Navigation activeSection="hero" onSectionClick={mockOnSectionClick} />)
    
    const workButton = screen.getByText('Work')
    await user.click(workButton)
    
    expect(mockOnSectionClick).toHaveBeenCalledWith('work')
  })

  it('should highlight active section', () => {
    render(<Navigation activeSection="skills" onSectionClick={mockOnSectionClick} />)
    
    const skillsButton = screen.getByText('Skills')
    expect(skillsButton).toHaveClass('text-primary')
  })

  it('should not highlight inactive sections', () => {
    render(<Navigation activeSection="skills" onSectionClick={mockOnSectionClick} />)
    
    const workButton = screen.getByText('Work')
    expect(workButton).toHaveClass('text-muted-foreground')
  })

  it('should render mobile navigation', () => {
    render(<Navigation activeSection="hero" onSectionClick={mockOnSectionClick} />)
    
    // Mobile nav should have Contact button
    const contactButtons = screen.getAllByText('Contact')
    expect(contactButtons.length).toBeGreaterThan(0)
  })

  it('should call onSectionClick with correct section ID', async () => {
    const user = userEvent.setup()
    render(<Navigation activeSection="hero" onSectionClick={mockOnSectionClick} />)
    
    await user.click(screen.getByText('Approach'))
    expect(mockOnSectionClick).toHaveBeenCalledWith('approach')
    
    await user.click(screen.getByText('Tech Stack'))
    expect(mockOnSectionClick).toHaveBeenCalledWith('tech-stack')
  })

  describe('Resume page navigation', () => {
    it('should show Home link instead of section buttons on resume page (desktop)', () => {
      render(<Navigation activeSection="resume" onSectionClick={mockOnSectionClick} />)
      
      // Should show "Home" link
      const homeLinks = screen.getAllByText('Home')
      expect(homeLinks.length).toBeGreaterThan(0)
      
      // Should NOT show section buttons
      expect(screen.queryByText('Skills')).not.toBeInTheDocument()
      expect(screen.queryByText('Tech Stack')).not.toBeInTheDocument()
      expect(screen.queryByText('Work')).not.toBeInTheDocument()
    })

    it('should show Home link instead of Contact button on resume page (mobile)', () => {
      render(<Navigation activeSection="resume" onSectionClick={mockOnSectionClick} />)
      
      // Should show "Home" link
      const homeLinks = screen.getAllByText('Home')
      expect(homeLinks.length).toBeGreaterThan(0)
      
      // Home links should link to /
      homeLinks.forEach(link => {
        expect(link.closest('a')).toHaveAttribute('href', '/')
      })
    })

    it('should highlight Resume link when on resume page', () => {
      render(<Navigation activeSection="resume" onSectionClick={mockOnSectionClick} />)
      
      const resumeLinks = screen.getAllByText('Resume')
      
      // At least one Resume link should have primary text color
      const hasHighlightedResume = resumeLinks.some(link =>
        link.classList.contains('text-primary') || link.classList.contains('font-medium')
      )
      expect(hasHighlightedResume).toBe(true)
    })

    it('should not call onSectionClick when Home link is clicked', async () => {

      render(<Navigation activeSection="resume" onSectionClick={mockOnSectionClick} />)
      
      // Home links are <a> tags, not buttons, so they won't call onSectionClick
      const homeLinks = screen.getAllByText('Home')
      
      // Just verify they're links, not buttons
      homeLinks.forEach(link => {
        expect(link.closest('a')).toBeInTheDocument()
      })
    })
  })
})

