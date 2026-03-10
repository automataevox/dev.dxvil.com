# CI/CD Setup Guide

This project uses GitHub Actions for continuous integration and deployment to Vercel.

## 🚀 Pipeline Overview

The CI/CD pipeline consists of the following stages:

1. **Lint** - Code quality checks using ESLint
2. **Test** - Unit tests with Jest and React Testing Library
3. **Build** - Next.js production build
4. **Deploy Preview** - Automatic preview deployments for pull requests
5. **Deploy Production** - Automatic production deployment on main/master branch

## 📋 Prerequisites

### Required GitHub Secrets

Add these secrets to your GitHub repository (`Settings` → `Secrets and variables` → `Actions`):

| Secret Name | Description | How to Get It |
|-------------|-------------|---------------|
| `VERCEL_TOKEN` | Vercel authentication token | [Vercel Account Settings → Tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Your Vercel organization ID | Run `vercel link` locally, then check `.vercel/project.json` |
| `VERCEL_PROJECT_ID` | Your Vercel project ID | Run `vercel link` locally, then check `.vercel/project.json` |
| `CODECOV_TOKEN` | (Optional) Code coverage reporting | [Codecov.io](https://codecov.io) after connecting your repo |

### Setting Up Vercel

1. **Install Vercel CLI locally:**
   ```bash
   npm install -g vercel
   ```

2. **Link your project:**
   ```bash
   vercel link
   ```
   
3. **Get your IDs:**
   ```bash
   cat .vercel/project.json
   ```
   
   You'll see something like:
   ```json
   {
     "orgId": "team_xxxxxxxxxxxxx",
     "projectId": "prj_xxxxxxxxxxxxx"
   }
   ```

4. **Add these to GitHub Secrets:**
   - `VERCEL_ORG_ID` = the `orgId` value
   - `VERCEL_PROJECT_ID` = the `projectId` value

## 🔧 Local Development

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Run Linter

```bash
npm run lint
```

### Build Project

```bash
npm run build
```

## 🧪 Testing

Tests are written using:
- **Jest** - Test runner and assertion library
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation

### Test Location

Tests should be placed in `__tests__` directories or named with `.test.ts(x)` or `.spec.ts(x)` suffix:

```
lib/
  hooks/
    __tests__/
      useTypingAnimation.test.ts
components/
  __tests__/
    custom-cursor.test.tsx
```

### Writing Tests

Example test structure:

```typescript
import { render, screen } from '@testing-library/react'
import { MyComponent } from '../MyComponent'

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## 🔄 Workflow Triggers

### Pull Requests
- Runs: Lint → Test → Build → Deploy Preview
- Creates a preview deployment on Vercel
- Comments on PR with preview URL

### Push to main/master
- Runs: Lint → Test → Build → Deploy Production
- Deploys to production on Vercel
- Available at your production domain

## 📊 Coverage Reports

Test coverage reports are automatically:
- Generated during test runs
- Uploaded to Codecov (if token is configured)
- Available in the Actions tab of your GitHub repo

## 🐛 Troubleshooting

### Pipeline Failing?

1. **Check secrets are set correctly** in GitHub
2. **Verify Vercel project is linked** properly
3. **Review the Actions logs** in GitHub for specific errors
4. **Run tests locally** to catch issues before pushing

### Common Issues

**"VERCEL_TOKEN is not set"**
- Add the token to your GitHub repository secrets

**"Failed to pull Vercel environment"**
- Verify `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` are correct
- Ensure the Vercel token has proper permissions

**"Tests are failing"**
- Run `npm test` locally to debug
- Check for environment-specific issues
- Ensure all dependencies are up to date

## 📝 Adding New Tests

1. Create test file next to the component/hook:
   ```
   components/MyComponent.tsx
   components/__tests__/MyComponent.test.tsx
   ```

2. Write your tests following existing patterns

3. Run tests locally:
   ```bash
   npm test
   ```

4. Push your changes - tests will run automatically in CI

## 🎯 Best Practices

- ✅ Write tests for all new features
- ✅ Aim for >80% code coverage
- ✅ Test user interactions, not implementation details
- ✅ Use meaningful test descriptions
- ✅ Keep tests focused and isolated
- ✅ Mock external dependencies appropriately

## 🔐 Security

- Never commit secrets or API keys
- Use GitHub Secrets for sensitive data
- Keep dependencies updated regularly
- Review Dependabot alerts promptly

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vercel CI/CD](https://vercel.com/docs/concepts/git)
- [GitHub Actions](https://docs.github.com/en/actions)
