import { render, screen } from '@testing-library/react';
import Resume from '../resume';

// Mock the resume data
jest.mock('@/data/resume.json', () => ({
    __esModule: true,
    default: {
        basics: {
            name: 'John Doe',
            label: 'Software Engineer',
            email: 'john@example.com',
            location: 'Remote',
            summary: 'Experienced software engineer',
            github: 'https://github.com/johndoe',
            linkedin: 'https://linkedin.com/in/johndoe',
        },
        competencies: [
            'System design and architecture',
            'Production operations',
        ],
        experience: [
            {
                company: 'Tech Corp',
                position: 'Senior Engineer',
                startDate: 'Jan 2020',
                endDate: 'Present',
                summary: 'Building scalable systems',
                highlights: [
                    'Led migration to microservices',
                    'Reduced downtime by 50%',
                ],
            },
        ],
        featuredProject: {
            name: 'Project Alpha',
            summary: 'A revolutionary platform',
            highlights: [
                'Served 1M+ users',
                'Achieved 99.9% uptime',
            ],
            technologies: ['React', 'Node.js', 'PostgreSQL'],
        },
        additionalProjects: [
            {
                name: 'Project Beta',
                url: 'https://beta.example.com',
                summary: 'An innovative solution',
            },
            {
                name: 'Project Gamma',
                summary: 'Internal tool',
            },
        ],
        techStack: {
            languages: ['TypeScript', 'JavaScript', 'Python'],
            frameworks: ['React', 'Next.js'],
        },
        education: [
            {
                institution: 'University of Tech',
                area: 'Computer Science',
                period: '2016-2020',
            },
        ],
        languages: [
            {
                language: 'English',
                fluency: 'Native',
            },
            {
                language: 'Spanish',
                fluency: 'Professional',
            },
        ],
    },
}));

describe('Resume', () => {
    it('should render header with name and title', () => {
        render(<Resume />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
        expect(screen.getByText('Experienced software engineer')).toBeInTheDocument();
    });

    it('should render contact information', () => {
        render(<Resume />);

        expect(screen.getByText('Remote')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });

    it('should render social links', () => {
        render(<Resume />);

        const githubLink = screen.getAllByText('GitHub')[0].closest('a');
        const linkedinLink = screen.getAllByText('LinkedIn')[0].closest('a');

        expect(githubLink).toHaveAttribute('href', 'https://github.com/johndoe');
        expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/johndoe');
        expect(githubLink).toHaveAttribute('target', '_blank');
        expect(linkedinLink).toHaveAttribute('target', '_blank');
    });

    it('should render key competencies section', () => {
        render(<Resume />);

        expect(screen.getByText('Key Competencies')).toBeInTheDocument();
        expect(screen.getByText('System design and architecture')).toBeInTheDocument();
        expect(screen.getByText('Production operations')).toBeInTheDocument();
    });

    it('should render experience section', () => {
        render(<Resume />);

        expect(screen.getByText('Experience')).toBeInTheDocument();
        expect(screen.getByText(/Senior Engineer — Tech Corp/)).toBeInTheDocument();
        expect(screen.getByText('Jan 2020 — Present')).toBeInTheDocument();
        expect(screen.getByText('Building scalable systems')).toBeInTheDocument();
        expect(screen.getByText('Led migration to microservices')).toBeInTheDocument();
        expect(screen.getByText('Reduced downtime by 50%')).toBeInTheDocument();
    });

    it('should render featured project section', () => {
        render(<Resume />);

        expect(screen.getByText('Featured Project')).toBeInTheDocument();
        expect(screen.getByText('Project Alpha')).toBeInTheDocument();
        expect(screen.getByText('A revolutionary platform')).toBeInTheDocument();
        expect(screen.getByText('Served 1M+ users')).toBeInTheDocument();
        expect(screen.getByText('Achieved 99.9% uptime')).toBeInTheDocument();
    });

    it('should render featured project technologies as badges', () => {
        render(<Resume />);

        const reactBadges = screen.getAllByText('React');
        expect(reactBadges.length).toBeGreaterThan(0);
        expect(screen.getByText('Node.js')).toBeInTheDocument();
        expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
    });

    it('should render additional projects section', () => {
        render(<Resume />);

        expect(screen.getByText('Additional Projects')).toBeInTheDocument();
        expect(screen.getByText('Project Beta')).toBeInTheDocument();
        expect(screen.getByText('Project Gamma')).toBeInTheDocument();
        expect(screen.getByText('An innovative solution')).toBeInTheDocument();
        expect(screen.getByText('Internal tool')).toBeInTheDocument();
    });

    it('should render additional project with link', () => {
        render(<Resume />);

        const projectLink = screen.getByText('Project Beta').closest('a');
        expect(projectLink).toHaveAttribute('href', 'https://beta.example.com');
        expect(projectLink).toHaveAttribute('target', '_blank');
    });

    it('should render additional project without link', () => {
        render(<Resume />);

        const projectWithoutLink = screen.getByText('Project Gamma');
        expect(projectWithoutLink.closest('a')).not.toBeInTheDocument();
    });

    it('should render tech stack section', () => {
        render(<Resume />);

        expect(screen.getByText('Tech Stack')).toBeInTheDocument();
        expect(screen.getByText('languages')).toBeInTheDocument();
        expect(screen.getByText('frameworks')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
        expect(screen.getByText('Python')).toBeInTheDocument();
        expect(screen.getByText('Next.js')).toBeInTheDocument();
    });

    it('should render education section', () => {
        render(<Resume />);

        expect(screen.getByText('Education')).toBeInTheDocument();
        expect(screen.getByText('University of Tech')).toBeInTheDocument();
        expect(screen.getByText('Computer Science')).toBeInTheDocument();
        expect(screen.getByText('2016-2020')).toBeInTheDocument();
    });

    it('should render languages section', () => {
        render(<Resume />);

        expect(screen.getByText('Languages')).toBeInTheDocument();
        expect(screen.getByText('English')).toBeInTheDocument();
        expect(screen.getByText('Spanish')).toBeInTheDocument();
        expect(screen.getByText('Native')).toBeInTheDocument();
        expect(screen.getByText('Professional')).toBeInTheDocument();
    });

    it('should apply correct styling classes', () => {
        const { container } = render(<Resume />);

        const article = container.querySelector('article');
        expect(article).toHaveClass('max-w-none', 'space-y-6');
    });

    it('should render email as mailto link', () => {
        render(<Resume />);

        const emailLink = screen.getByText('john@example.com');
        expect(emailLink).toHaveAttribute('href', 'mailto:john@example.com');
    });
});
