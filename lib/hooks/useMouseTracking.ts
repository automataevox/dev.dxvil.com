import { useState, useEffect, useRef } from 'react';

interface Position {
    x: number;
    y: number;
}

interface MouseTrackingConfig {
    trailLength?: number;
    velocityDamping?: number;
    stopTimeout?: number;
}

const DEFAULT_CONFIG: Required<MouseTrackingConfig> = {
    trailLength: 12,
    velocityDamping: 0.8,
    stopTimeout: 100,
};

export const useMouseTracking = (config: MouseTrackingConfig = {}) => {
    const { velocityDamping, stopTimeout } = { ...DEFAULT_CONFIG, ...config };
    
    const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
    const [velocity, setVelocity] = useState<Position>({ x: 0, y: 0 });
    const [isMoving, setIsMoving] = useState(false);
    
    const prevPositionRef = useRef<Position>({ x: 0, y: 0 });
    const velocityRef = useRef<Position>({ x: 0, y: 0 });
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newPosition = { x: e.clientX, y: e.clientY };
            
            // Calculate velocity
            const vx = newPosition.x - prevPositionRef.current.x;
            const vy = newPosition.y - prevPositionRef.current.y;
            
            // Apply damping for smooth velocity
            velocityRef.current.x = velocityRef.current.x * velocityDamping + vx * (1 - velocityDamping);
            velocityRef.current.y = velocityRef.current.y * velocityDamping + vy * (1 - velocityDamping);
            
            setVelocity({ ...velocityRef.current });
            setMousePosition(newPosition);
            setIsMoving(true);
            
            prevPositionRef.current = newPosition;
            
            // Clear previous timeout
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            
            // Reset velocity after inactivity
            timeoutRef.current = setTimeout(() => {
                setIsMoving(false);
                velocityRef.current = { x: 0, y: 0 };
                setVelocity({ x: 0, y: 0 });
            }, stopTimeout);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [velocityDamping, stopTimeout]);

    return { mousePosition, velocity, isMoving };
};
