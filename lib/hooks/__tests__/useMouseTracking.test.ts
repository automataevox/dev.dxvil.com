import { renderHook, act } from '@testing-library/react';
import { useMouseTracking } from '../useMouseTracking';

describe('useMouseTracking', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        act(() => {
            jest.runOnlyPendingTimers();
        });
        jest.useRealTimers();
    });

    it('should initialize with default values', () => {
        const { result } = renderHook(() => useMouseTracking());

        expect(result.current.mousePosition).toEqual({ x: 0, y: 0 });
        expect(result.current.velocity).toEqual({ x: 0, y: 0 });
        expect(result.current.isMoving).toBe(false);
    });

    it('should update mouse position on mousemove', () => {
        const { result } = renderHook(() => useMouseTracking());

        act(() => {
            const event = new MouseEvent('mousemove', {
                clientX: 100,
                clientY: 200,
            });
            window.dispatchEvent(event);
        });

        expect(result.current.mousePosition).toEqual({ x: 100, y: 200 });
        expect(result.current.isMoving).toBe(true);
    });

    it('should calculate velocity based on movement', () => {
        const { result } = renderHook(() => useMouseTracking());

        act(() => {
            const event1 = new MouseEvent('mousemove', {
                clientX: 0,
                clientY: 0,
            });
            window.dispatchEvent(event1);
        });

        act(() => {
            const event2 = new MouseEvent('mousemove', {
                clientX: 50,
                clientY: 50,
            });
            window.dispatchEvent(event2);
        });

        expect(result.current.velocity.x).toBeGreaterThan(0);
        expect(result.current.velocity.y).toBeGreaterThan(0);
    });

    it('should apply velocity damping', () => {
        const { result } = renderHook(() => 
            useMouseTracking({ velocityDamping: 0.5 })
        );

        act(() => {
            const event1 = new MouseEvent('mousemove', {
                clientX: 0,
                clientY: 0,
            });
            window.dispatchEvent(event1);
        });

        act(() => {
            const event2 = new MouseEvent('mousemove', {
                clientX: 100,
                clientY: 0,
            });
            window.dispatchEvent(event2);
        });

        const firstVelocity = result.current.velocity.x;

        act(() => {
            const event3 = new MouseEvent('mousemove', {
                clientX: 110,
                clientY: 0,
            });
            window.dispatchEvent(event3);
        });

        // With damping, velocity should be smoothed
        expect(result.current.velocity.x).toBeLessThan(firstVelocity + 10);
    });

    it('should reset velocity after stop timeout', () => {
        const { result } = renderHook(() => 
            useMouseTracking({ stopTimeout: 100 })
        );

        act(() => {
            const event = new MouseEvent('mousemove', {
                clientX: 100,
                clientY: 100,
            });
            window.dispatchEvent(event);
        });

        expect(result.current.isMoving).toBe(true);
        expect(result.current.velocity.x).toBeGreaterThan(0);

        act(() => {
            jest.advanceTimersByTime(100);
        });

        expect(result.current.isMoving).toBe(false);
        expect(result.current.velocity).toEqual({ x: 0, y: 0 });
    });

    it('should clear timeout on new mousemove', () => {
        const { result } = renderHook(() => 
            useMouseTracking({ stopTimeout: 100 })
        );

        act(() => {
            const event1 = new MouseEvent('mousemove', {
                clientX: 100,
                clientY: 100,
            });
            window.dispatchEvent(event1);
        });

        act(() => {
            jest.advanceTimersByTime(50);
        });

        act(() => {
            const event2 = new MouseEvent('mousemove', {
                clientX: 150,
                clientY: 150,
            });
            window.dispatchEvent(event2);
        });

        // Should still be moving after first timeout would have expired
        act(() => {
            jest.advanceTimersByTime(50);
        });

        expect(result.current.isMoving).toBe(true);
    });

    it('should use custom configuration', () => {
        const { result } = renderHook(() =>
            useMouseTracking({
                velocityDamping: 0.9,
                stopTimeout: 200,
            })
        );

        act(() => {
            const event = new MouseEvent('mousemove', {
                clientX: 100,
                clientY: 100,
            });
            window.dispatchEvent(event);
        });

        expect(result.current.isMoving).toBe(true);

        // Should not reset after 100ms (default timeout)
        act(() => {
            jest.advanceTimersByTime(100);
        });

        expect(result.current.isMoving).toBe(true);

        // Should reset after 200ms (custom timeout)
        act(() => {
            jest.advanceTimersByTime(100);
        });

        expect(result.current.isMoving).toBe(false);
    });

    it('should cleanup event listeners on unmount', () => {
        const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useMouseTracking());

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'mousemove',
            expect.any(Function)
        );

        removeEventListenerSpy.mockRestore();
    });

    it('should handle multiple rapid mousemove events', () => {
        const { result } = renderHook(() => useMouseTracking());

        act(() => {
            for (let i = 0; i < 10; i++) {
                const event = new MouseEvent('mousemove', {
                    clientX: i * 10,
                    clientY: i * 10,
                });
                window.dispatchEvent(event);
            }
        });

        expect(result.current.mousePosition).toEqual({ x: 90, y: 90 });
        expect(result.current.isMoving).toBe(true);
    });
});
