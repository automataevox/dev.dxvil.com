export const NAVIGATION_ITEMS = [
    { id: 'hero', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'tech-stack', label: 'Tech Stack' },
    { id: 'work', label: 'Work' },
    { id: 'case-study', label: 'Case Study' },
    { id: 'approach', label: 'Approach' },
    { id: 'contact', label: 'Contact' }
] as const;

export const SECTION_IDS = NAVIGATION_ITEMS.map(item => item.id);

export const CURSOR_CONFIG = {
    trailLength: 0,
    mainSize: 50,
    trailMinSize: 30,
    trailMaxSize: 50,
    trailOpacity: 0.6,
    maxBlur: 3,
} as const;

export const ANIMATION_CONFIG = {
    typingSpeed: 100,
    scrollOffset: 100,
    mouseMoveTimeout: 100,
    velocityDamping: 0.8,
    parallaxFactors: [0.015, -0.02, 0.01],
} as const;
