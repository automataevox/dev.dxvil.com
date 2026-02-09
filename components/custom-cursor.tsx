import { CURSOR_CONFIG } from '@/lib/constants';

interface Position {
    x: number;
    y: number;
}

interface CustomCursorProps {
    mousePosition: Position;
    trail: Position[];
}

export const CustomCursor = ({ mousePosition }: Omit<CustomCursorProps, 'trail'>) => {
    return (
        <>
            {/* Main Cursor Circle */}
            <div 
                className="fixed pointer-events-none z-9999 rounded-full will-change-transform"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`,
                    transform: 'translate(-50%, -50%)',
                    width: `${CURSOR_CONFIG.mainSize}px`,
                    height: `${CURSOR_CONFIG.mainSize}px`,
                    background: 'white',
                    mixBlendMode: 'difference'
                }}
            />
        </>
    );
};
