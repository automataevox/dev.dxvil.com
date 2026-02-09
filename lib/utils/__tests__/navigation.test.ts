import { scrollToSection, handleFormSubmit } from '../navigation'

describe('Navigation Utilities', () => {
  describe('scrollToSection', () => {
    beforeEach(() => {
      // Mock scrollIntoView
      Element.prototype.scrollIntoView = jest.fn()
    })

    it('should scroll to element when it exists', () => {
      const element = document.createElement('div')
      element.id = 'test-section'
      document.body.appendChild(element)

      scrollToSection('test-section')

      expect(element.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
      
      document.body.removeChild(element)
    })

    it('should not throw when element does not exist', () => {
      expect(() => scrollToSection('non-existent')).not.toThrow()
    })

    it('should handle multiple calls correctly', () => {
      const element1 = document.createElement('div')
      element1.id = 'section1'
      const element2 = document.createElement('div')
      element2.id = 'section2'
      
      element1.scrollIntoView = jest.fn()
      element2.scrollIntoView = jest.fn()
      
      document.body.appendChild(element1)
      document.body.appendChild(element2)

      scrollToSection('section1')
      scrollToSection('section2')

      expect(element1.scrollIntoView).toHaveBeenCalledTimes(1)
      expect(element2.scrollIntoView).toHaveBeenCalledTimes(1)
      
      document.body.removeChild(element1)
      document.body.removeChild(element2)
    })
  })

  describe('handleFormSubmit', () => {
    let alertSpy: jest.SpyInstance

    beforeEach(() => {
      alertSpy = jest.spyOn(window, 'alert').mockImplementation()
    })

    afterEach(() => {
      alertSpy.mockRestore()
    })

    it('should prevent default form submission', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent

      handleFormSubmit(mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should show success alert', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent

      handleFormSubmit(mockEvent)

      expect(alertSpy).toHaveBeenCalledWith(
        expect.stringContaining('Thank you for your message')
      )
    })
  })
})
