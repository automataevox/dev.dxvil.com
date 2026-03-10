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
    let fetchMock: jest.SpyInstance

    beforeEach(() => {
      alertSpy = jest.spyOn(window, 'alert').mockImplementation()
      fetchMock = jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        json: async () => ({ success: true, message: 'Message sent successfully' }),
      } as Response)
    })

    afterEach(() => {
      alertSpy.mockRestore()
      fetchMock.mockRestore()
    })

    it('should prevent default form submission', () => {
      const mockEvent = {
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent

      handleFormSubmit(mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should return success result', async () => {
      const form = document.createElement('form')
      form.innerHTML = `
        <input name="firstName" value="John" />
        <input name="lastName" value="Doe" />
        <input name="email" value="john@example.com" />
        <textarea name="message">Hello!</textarea>
      ` 

      const mockEvent = {
        preventDefault: jest.fn(),
        target: form,
      } as unknown as React.FormEvent<HTMLFormElement>

      const result = await handleFormSubmit(mockEvent)

      expect(fetchMock).toHaveBeenCalledWith('/api/contact', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }))
      expect(result).toEqual({
        success: true,
        message: 'Message sent successfully'
      })
    })
  })
})
