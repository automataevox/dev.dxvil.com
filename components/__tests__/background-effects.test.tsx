import { render, screen } from '@testing-library/react';
import { BackgroundEffects } from '../background-effects';

describe('BackgroundEffects', () => {
    const defaultMousePosition = { x: 0, y: 0 };

    it('should render gradient orbs', () => {
        const { container } = render(
            <BackgroundEffects mousePosition={defaultMousePosition} />
        );

        const orbs = container.querySelectorAll('.rounded-full.blur-3xl');
        expect(orbs).toHaveLength(3);
    });

    it('should apply correct base styles to orbs', () => {
        const { container } = render(
            <BackgroundEffects mousePosition={defaultMousePosition} />
        );

        const orbs = container.querySelectorAll('.rounded-full');
        
        orbs.forEach((orb) => {
            expect(orb).toHaveClass('animate-pulse');
            expect(orb).toHaveClass('transition-transform');
            expect(orb).toHaveClass('duration-700');
            expect(orb).toHaveClass('ease-out');
        });
    });

    it('should apply different sizes to orbs', () => {
        const { container } = render(
            <BackgroundEffects mousePosition={defaultMousePosition} />
        );

        const orbs = container.querySelectorAll('.rounded-full');
        
        expect(orbs[0]).toHaveClass('w-96', 'h-96');
        expect(orbs[1]).toHaveClass('w-80', 'h-80');
        expect(orbs[2]).toHaveClass('w-64', 'h-64');
    });

    it('should apply different colors to orbs', () => {
        const { container } = render(
            <BackgroundEffects mousePosition={defaultMousePosition} />
        );

        const orbs = container.querySelectorAll('.rounded-full');
        
        expect(orbs[0]).toHaveClass('bg-primary/5');
        expect(orbs[1]).toHaveClass('bg-blue-500/5');
        expect(orbs[2]).toHaveClass('bg-purple-500/5');
    });

    it('should update transform based on mouse position', () => {
        const mousePosition = { x: 100, y: 50 };
        const { container } = render(
            <BackgroundEffects mousePosition={mousePosition} />
        );

        const orbs = container.querySelectorAll('.rounded-full');
        
        orbs.forEach((orb) => {
            const style = (orb as HTMLElement).style;
            expect(style.transform).toBeTruthy();
            expect(style.transform).toContain('translate');
        });
    });

    it('should apply parallax effect with different factors', () => {
        const mousePosition = { x: 100, y: 100 };
        const { container } = render(
            <BackgroundEffects mousePosition={mousePosition} />
        );

        const orbs = container.querySelectorAll('.rounded-full');
        
        // Each orb should have a different transform value due to different parallax factors
        const transforms = Array.from(orbs).map((orb) => 
            (orb as HTMLElement).style.transform
        );

        // Check that transforms are different (parallax effect working)
        expect(new Set(transforms).size).toBe(3);
    });

    it('should render grid pattern overlay', () => {
        const { container } = render(
            <BackgroundEffects mousePosition={defaultMousePosition} />
        );

        // Find the grid pattern div (it's the second child of the background container)
        const backgroundContainer = container.querySelector('.fixed.inset-0');
        expect(backgroundContainer).toBeInTheDocument();
        
        const gridPattern = backgroundContainer?.lastChild as HTMLElement;
        expect(gridPattern).toBeInTheDocument();
        expect(gridPattern).toHaveClass('opacity-30');
    });

    it('should apply animation duration to orbs', () => {
        const { container } = render(
            <BackgroundEffects mousePosition={defaultMousePosition} />
        );

        const orbs = container.querySelectorAll('.rounded-full');
        
        expect((orbs[0] as HTMLElement).style.animationDuration).toBe('4s');
        expect((orbs[1] as HTMLElement).style.animationDuration).toBe('6s');
        expect((orbs[2] as HTMLElement).style.animationDuration).toBe('5s');
    });

    it('should apply animation delay to some orbs', () => {
        const { container } = render(
            <BackgroundEffects mousePosition={defaultMousePosition} />
        );

        const orbs = container.querySelectorAll('.rounded-full');
        
        expect((orbs[1] as HTMLElement).style.animationDelay).toBe('2s');
        expect((orbs[2] as HTMLElement).style.animationDelay).toBe('1s');
    });

    it('should apply correct positioning styles', () => {
        const { container } = render(
            <BackgroundEffects mousePosition={defaultMousePosition} />
        );

        const orbs = container.querySelectorAll('.rounded-full');
        
        // First orb: top 25%, left 25%
        expect((orbs[0] as HTMLElement).style.top).toBe('25%');
        expect((orbs[0] as HTMLElement).style.left).toBe('25%');
        
        // Second orb: top 75%, right 25%
        expect((orbs[1] as HTMLElement).style.top).toBe('75%');
        expect((orbs[1] as HTMLElement).style.right).toBe('25%');
        
        // Third orb: bottom 25%, left 50%
        expect((orbs[2] as HTMLElement).style.bottom).toBe('25%');
        expect((orbs[2] as HTMLElement).style.left).toBe('50%');
    });

    it('should have pointer-events-none on container', () => {
        const { container } = render(
            <BackgroundEffects mousePosition={defaultMousePosition} />
        );

        const backgroundContainer = container.firstChild;
        expect(backgroundContainer).toHaveClass('pointer-events-none');
    });

    it('should update transforms when mouse position changes', () => {
        const { container, rerender } = render(
            <BackgroundEffects mousePosition={{ x: 0, y: 0 }} />
        );

        const orbs = container.querySelectorAll('.rounded-full');
        const initialTransform = (orbs[0] as HTMLElement).style.transform;

        rerender(<BackgroundEffects mousePosition={{ x: 200, y: 200 }} />);

        const updatedTransform = (orbs[0] as HTMLElement).style.transform;
        expect(updatedTransform).not.toBe(initialTransform);
    });
});
