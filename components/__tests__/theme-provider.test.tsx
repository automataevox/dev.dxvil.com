import { render } from '@testing-library/react';
import ThemeProvider from '../theme-provider';

describe('ThemeProvider', () => {
    let mockMatchMedia: jest.Mock;
    let mockAddEventListener: jest.Mock;
    let mockRemoveEventListener: jest.Mock;
    let mockAddListener: jest.Mock;
    let mockRemoveListener: jest.Mock;

    beforeEach(() => {
        mockAddEventListener = jest.fn();
        mockRemoveEventListener = jest.fn();
        mockAddListener = jest.fn();
        mockRemoveListener = jest.fn();

        mockMatchMedia = jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: mockAddEventListener,
            removeEventListener: mockRemoveEventListener,
            addListener: mockAddListener,
            removeListener: mockRemoveListener,
            dispatchEvent: jest.fn(),
        }));

        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: mockMatchMedia,
        });

        // Reset document.documentElement classes
        document.documentElement.className = '';
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should render nothing (return null)', () => {
        const { container } = render(<ThemeProvider />);
        expect(container.firstChild).toBeNull();
    });

    it('should add dark class when system prefers dark mode', () => {
        mockMatchMedia.mockImplementation((query) => ({
            matches: true,
            media: query,
            addEventListener: mockAddEventListener,
            removeEventListener: mockRemoveEventListener,
            addListener: mockAddListener,
            removeListener: mockRemoveListener,
            dispatchEvent: jest.fn(),
        }));

        render(<ThemeProvider />);

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should not add dark class when system prefers light mode', () => {
        mockMatchMedia.mockImplementation((query) => ({
            matches: false,
            media: query,
            addEventListener: mockAddEventListener,
            removeEventListener: mockRemoveEventListener,
            addListener: mockAddListener,
            removeListener: mockRemoveListener,
            dispatchEvent: jest.fn(),
        }));

        render(<ThemeProvider />);

        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should register event listener using modern API', () => {
        render(<ThemeProvider />);

        expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should add dark class when media query changes to dark', () => {
        let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;

        mockAddEventListener.mockImplementation((event, handler) => {
            if (event === 'change') {
                changeHandler = handler;
            }
        });

        render(<ThemeProvider />);

        expect(changeHandler).not.toBeNull();

        // Simulate change to dark mode
        if (changeHandler) {
            changeHandler({ matches: true } as MediaQueryListEvent);
        }

        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('should remove dark class when media query changes to light', () => {
        let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;

        mockMatchMedia.mockImplementation((query) => ({
            matches: true,
            media: query,
            addEventListener: (event: string, handler: (e: MediaQueryListEvent) => void) => {
                if (event === 'change') {
                    changeHandler = handler;
                }
            },
            removeEventListener: mockRemoveEventListener,
            addListener: mockAddListener,
            removeListener: mockRemoveListener,
            dispatchEvent: jest.fn(),
        }));

        render(<ThemeProvider />);

        // Should start with dark class
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        // Simulate change to light mode
        if (changeHandler) {
            changeHandler({ matches: false } as MediaQueryListEvent);
        }

        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should clean up event listener on unmount', () => {
        const { unmount } = render(<ThemeProvider />);

        unmount();

        expect(mockRemoveEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should use legacy API if modern API is not available', () => {
        mockMatchMedia.mockImplementation((query) => ({
            matches: false,
            media: query,
            addEventListener: undefined,
            removeEventListener: undefined,
            addListener: mockAddListener,
            removeListener: mockRemoveListener,
            dispatchEvent: jest.fn(),
        }));

        render(<ThemeProvider />);

        expect(mockAddListener).toHaveBeenCalledWith(expect.any(Function));
        expect(mockAddEventListener).not.toHaveBeenCalled();
    });

    it('should clean up using legacy API on unmount', () => {
        mockMatchMedia.mockImplementation((query) => ({
            matches: false,
            media: query,
            addEventListener: undefined,
            removeEventListener: undefined,
            addListener: mockAddListener,
            removeListener: mockRemoveListener,
            dispatchEvent: jest.fn(),
        }));

        const { unmount } = render(<ThemeProvider />);

        unmount();

        expect(mockRemoveListener).toHaveBeenCalledWith(expect.any(Function));
        expect(mockRemoveEventListener).not.toHaveBeenCalled();
    });

    it('should handle multiple theme switches', () => {
        let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;

        mockAddEventListener.mockImplementation((event, handler) => {
            if (event === 'change') {
                changeHandler = handler;
            }
        });

        render(<ThemeProvider />);

        // Switch to dark
        if (changeHandler) {
            changeHandler({ matches: true } as MediaQueryListEvent);
        }
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        // Switch to light
        if (changeHandler) {
            changeHandler({ matches: false } as MediaQueryListEvent);
        }
        expect(document.documentElement.classList.contains('dark')).toBe(false);

        // Switch back to dark
        if (changeHandler) {
            changeHandler({ matches: true } as MediaQueryListEvent);
        }
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
});
