import { ANIMATION_CONFIG } from '@/lib/constants';

interface Position {
    x: number;
    y: number;
}

interface BackgroundEffectsProps {
    mousePosition: Position;
}

interface GradientOrb {
    color: string;
    size: string;
    position: { top?: string; bottom?: string; left?: string; right?: string };
    animationDuration: string;
    animationDelay?: string;
    parallaxFactor: number;
}

const GRADIENT_ORBS: GradientOrb[] = [
    {
        color: 'bg-primary/5',
        size: 'w-96 h-96',
        position: { top: '25%', left: '25%' },
        animationDuration: '4s',
        parallaxFactor: ANIMATION_CONFIG.parallaxFactors[0],
    },
    {
        color: 'bg-blue-500/5',
        size: 'w-80 h-80',
        position: { top: '75%', right: '25%' },
        animationDuration: '6s',
        animationDelay: '2s',
        parallaxFactor: ANIMATION_CONFIG.parallaxFactors[1],
    },
    {
        color: 'bg-purple-500/5',
        size: 'w-64 h-64',
        position: { bottom: '25%', left: '50%' },
        animationDuration: '5s',
        animationDelay: '1s',
        parallaxFactor: ANIMATION_CONFIG.parallaxFactors[2],
    },
];

export const BackgroundEffects = ({ mousePosition }: BackgroundEffectsProps) => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {GRADIENT_ORBS.map((orb, index) => (
                <div
                    key={index}
                    className={`absolute ${orb.size} ${orb.color} rounded-full blur-3xl animate-pulse transition-transform duration-700 ease-out`}
                    style={{
                        ...orb.position,
                        animationDuration: orb.animationDuration,
                        animationDelay: orb.animationDelay,
                        transform: `translate(${mousePosition.x * orb.parallaxFactor}px, ${mousePosition.y * Math.abs(orb.parallaxFactor)}px)`,
                    }}
                />
            ))}
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.03)_1px,transparent_0)] bg-size-[50px_50px] opacity-30" />
        </div>
    );
};
