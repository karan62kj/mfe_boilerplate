# Vantive ShareSource - Micro-Frontend Boilerplate

A comprehensive healthcare micro-frontend (MFE) architecture built with React, TypeScript, Vite, and Module Federation. This project demonstrates enterprise-grade patterns including nested microfrontends, shared state management, and Okta authentication.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│ Shell Application (localhost:3000)                         │
│ • Authentication & Routing                                  │
│ • Shared State Management (Redux)                           │
│ • Okta Integration                                          │
│                                                             │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ │
│ │   Dashboard     │ │     Claria      │ │      CAPD       │ │
│ │  (port 3004)    │ │   (port 3002)   │ │   (port 3003)   │ │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘ │
│                                                             │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ AMIA Microfrontend (port 3001)                         │ │
│ │ • Sidenav Navigation                                    │ │
│ │ • Cross-MFE Routing                                     │ │
│ │                                                         │ │
│ │ ┌─────────────────────────────────────────────────────┐ │ │
│ │ │ CAPD-Submodule (port 3005) - Nested MFE           │ │ │
│ │ │ • Analytics Dashboard                               │ │ │
│ │ │ • Patient Management                                │ │ │
│ │ │ • Clinical Tools                                    │ │ │
│ │ └─────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Key Features

### Enterprise Architecture
- **Micro-Frontend Architecture**: Independent deployable applications
- **Nested Microfrontends**: Demonstrates advanced composition patterns
- **Module Federation**: Webpack 5 / Vite federation for runtime integration
- **Monorepo Structure**: Turborepo for efficient development and builds

### Authentication & Security
- **Okta Integration**: Enterprise SSO with PKCE flow
- **Protected Routes**: Authentication-required route protection
- **Redux State Sync**: Okta auth state synchronized with Redux
- **Token Management**: Automatic token renewal and secure storage

### State Management
- **Redux Toolkit**: Modern Redux with RTK
- **Shared State**: Cross-MFE state sharing via Module Federation
- **Redux Saga**: Side effect management for async operations

### Development Experience
- **TypeScript**: Full type safety across all microfrontends
- **Hot Module Replacement**: Fast development with Vite
- **ESLint & Prettier**: Code quality and formatting
- **Turbo**: Optimized build and development workflows

## 📁 Project Structure

```
mfe-boilerplate/
├── apps/
│   ├── vantive-mfe-shell/                 # Main shell application
│   │   ├── src/
│   │   │   ├── business/                  # Redux store, slices, sagas
│   │   │   ├── config/                    # Okta configuration
│   │   │   ├── presentation/              # React components
│   │   │   │   ├── components/
│   │   │   │   │   ├── auth/              # Authentication components
│   │   │   │   │   ├── login/             # Login components
│   │   │   │   │   └── navbar/            # Navigation components
│   │   │   └── types/                     # TypeScript definitions
│   │   └── vite.config.ts                 # Vite + Module Federation config
│   │
│   ├── vantive-sharesource-remote-amia/   # AMIA microfrontend
│   │   ├── src/
│   │   │   ├── components/                # Local components
│   │   │   └── types/                     # Module federation types
│   │   └── vite.config.ts                 # Port 3001
│   │
│   ├── vantive-sharesource-remote-capd-submodule/  # Nested microfrontend
│   │   ├── src/
│   │   │   └── App.tsx                    # Healthcare dashboard UI
│   │   └── vite.config.ts                 # Port 3005
│   │
│   ├── vantive-sharesource-remote-dashboard/       # Dashboard MFE
│   ├── vantive-sharesource-remote-claria/          # Claria MFE
│   ├── vantive-sharesource-remote-capd/            # CAPD MFE
│   └── ... (other remotes)
│
├── packages/
│   └── ui/                                # Shared UI components
│
├── turbo.json                             # Turborepo configuration
├── package.json                           # Root package configuration
└── README.md
```

## 🛠️ Technology Stack

### Core Technologies
- **React 19.1.0**: Modern React with concurrent features
- **TypeScript 5.8.3**: Type-safe development
- **Vite 7.0.4**: Fast build tool and dev server
- **Module Federation**: Runtime microfrontend integration

### State Management
- **Redux Toolkit 2.8.2**: Modern Redux implementation
- **React Redux 9.2.0**: React-Redux bindings
- **Redux Saga**: Side effect management

### Authentication
- **@okta/okta-react**: Okta React SDK
- **@okta/okta-auth-js**: Okta authentication library
- **PKCE Flow**: Enhanced security for SPAs

### Development Tools
- **Turborepo 2.5.5**: Monorepo build system
- **ESLint 9.30.1**: Code linting
- **Prettier 3.6.2**: Code formatting
- **React Router 7.7.1**: Client-side routing

## 🚦 Getting Started

### Prerequisites
- Node.js >= 18
- npm >= 9.6.7
- Okta developer account (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mfe-boilerplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Okta Authentication**
   
   Create `.env` file in `apps/vantive-mfe-shell/`:
   ```env
   VITE_OKTA_DOMAIN=https://your-okta-domain.okta.com/oauth2/default
   VITE_OKTA_CLIENT_ID=your-okta-client-id
   NODE_ENV=development
   ```

   **Okta Configuration Requirements:**
   - Application Type: Single Page Application (SPA)
   - Redirect URI: `http://localhost:3000/callback`
   - Logout Redirect URI: `http://localhost:3000`
   - Grant Types: Authorization Code with PKCE

### Development

#### Start All Applications
```bash
# Start all microfrontends in development mode
npm run dev
```

#### Start Individual Applications
```bash
# Shell application (required for others)
npm run dev --filter=vantive-mfe-shell

# Individual microfrontends
npm run dev --filter=vantive-sharesource-remote-amia
npm run dev --filter=vantive-sharesource-remote-capd-submodule
npm run dev --filter=vantive-sharesource-remote-dashboard
npm run dev --filter=vantive-sharesource-remote-claria
npm run dev --filter=vantive-sharesource-remote-capd
```

#### Build for Production
```bash
# Build all applications
npm run build

# Build specific applications
npm run build --filter=vantive-mfe-shell
npm run build --filter=vantive-sharesource-remote-amia
```

### Port Configuration

| Application | Port | Purpose |
|-------------|------|---------|
| Shell | 3000 | Main application & orchestration |
| AMIA | 3001 | AMIA microfrontend with nested routing |
| Claria | 3002 | Claria healthcare module |
| CAPD | 3003 | CAPD (Peritoneal Dialysis) module |
| Dashboard | 3004 | Analytics and reporting dashboard |
| CAPD-Submodule | 3005 | Nested microfrontend within AMIA |

## 🔐 Authentication Flow

### PKCE (Proof Key for Code Exchange) Flow
1. User accesses protected route
2. Redirected to custom login page
3. User enters credentials
4. Direct authentication with Okta using PKCE
5. Tokens stored securely in localStorage
6. Redux state updated with authentication status
7. User can access protected microfrontends

### Authentication Features
- **Custom Login UI**: Healthcare-themed login interface
- **Direct Credential Auth**: `signInWithCredentials` for seamless UX
- **Token Management**: Automatic renewal and secure storage
- **Protected Routes**: Route-level authentication guards
- **Cross-MFE Auth**: Shared authentication state across all microfrontends

## 🔄 State Management

### Redux Architecture
```typescript
// Shared store structure
interface AppStore {
  profile: {
    isAuthenticated: boolean;
    loading: boolean;
    user: UserInfo | null;
    accessToken: string | null;
    idToken: string | null;
    error: string | null;
    lastRequestedId: number;
  }
}
```

### Cross-MFE State Sharing
```typescript
// Remotes can access shell's store
import { appStore } from 'vantive-mfe-shell/appStore';
import { fetchProfileStart } from 'vantive-mfe-shell/profileSlice';

// Dispatch actions to shell store
appStore.dispatch(fetchProfileStart({ id: 123 }));

// Access current state
const currentState = appStore.getState();
```

## 🧪 Testing the Application

### 1. Authentication Flow
- Navigate to `http://localhost:3000`
- Should see custom login page
- Enter Okta credentials
- Verify successful authentication and redirect

### 2. Microfrontend Navigation
- **Top Navigation**: Navigate between Dashboard, AMIA, Claria, CAPD
- **AMIA Sidenav**: Test nested navigation within AMIA
- **Cross-MFE Routing**: Verify no page reloads during navigation

### 3. Nested Microfrontend
- Go to `/amia`
- Click "CAPD Submodule" in sidenav
- Verify nested microfrontend loads within AMIA layout
- Confirm proper styling and functionality

### 4. State Management
- Navigate to Dashboard (`/dashboard`)
- Test Redux communication between shell and remotes
- Verify authentication state persistence across MFEs

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: `#2b477d` (Deep Blue)
- **Secondary**: `#617598` (Medium Blue)
- **Accent**: `#4a6ea8` (Bright Blue)
- **Success**: `#10b981` (Green)
- **Error**: `#dc2626` (Red)

### Design Patterns
- **Healthcare Theme**: Professional medical application styling
- **Consistent Navigation**: Unified navbar across all microfrontends
- **Loading States**: Smooth transitions with branded loading screens
- **Responsive Design**: Mobile-friendly layouts
- **Accessibility**: WCAG compliant components

## 🔧 Development Workflows

### Adding a New Microfrontend

1. **Create new application directory**
   ```bash
   mkdir apps/vantive-sharesource-remote-newapp
   cd apps/vantive-sharesource-remote-newapp
   npm init -y
   ```

2. **Configure package.json**
   ```json
   {
     "name": "vantive-sharesource-remote-newapp",
     "scripts": {
       "dev": "vite",
       "build": "tsc -b && vite build"
     }
   }
   ```

3. **Setup Vite configuration**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     plugins: [
       react(),
       federation({
         name: 'vantive-sharesource-remote-newapp',
         filename: 'remoteEntry.js',
         exposes: {
           './NewApp': './src/AppWrapper',
         },
         remotes: {
           'vantive-mfe-shell': 'http://localhost:3000/dist/assets/remoteEntry.js',
         },
         shared: ['react', 'react-dom', 'react-router-dom'],
       }),
     ],
     server: { port: 30XX }, // Choose available port
   });
   ```

4. **Update shell configuration**
   - Add remote to shell's `vite.config.ts`
   - Add TypeScript definitions
   - Add lazy import to shell's App.tsx
   - Add route configuration

### Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run check-types

# Code formatting
npm run format
```

## 🚀 Deployment

### Production Build
```bash
# Build all applications
npm run build

# Build outputs available in each app's dist/ directory
# apps/vantive-mfe-shell/dist/
# apps/vantive-sharesource-remote-amia/dist/
# etc.
```

### Deployment Considerations
- **Independent Deployments**: Each MFE can be deployed separately
- **CDN Distribution**: Serve static assets from CDN
- **Environment Variables**: Configure per environment
- **Health Checks**: Monitor each microfrontend independently
- **Load Balancing**: Route traffic appropriately

### Docker Support
```dockerfile
# Example Dockerfile for individual MFE
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🐛 Troubleshooting

### Common Issues

**1. Module Federation Loading Errors**
```bash
# Ensure all required remotes are running
npm run dev --filter=vantive-mfe-shell
npm run dev --filter=vantive-sharesource-remote-amia
```

**2. TypeScript Module Not Found**
- Check module federation type definitions in `src/types/`
- Verify remote is properly configured in `vite.config.ts`

**3. Authentication Issues**
- Verify Okta configuration in `.env`
- Check Okta application settings (redirect URIs, grant types)
- Ensure PKCE is enabled in Okta application

**4. Build Failures**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Clear Turbo cache
npx turbo prune
```

**5. Port Conflicts**
- Check if ports 3000-3005 are available
- Update port configuration in `vite.config.ts` if needed

## 📊 Performance Considerations

### Bundle Optimization
- **Shared Dependencies**: React, React-DOM shared across MFEs
- **Tree Shaking**: Dead code elimination in production builds
- **Code Splitting**: Lazy loading of microfrontends
- **Module Federation**: Runtime dependency sharing

### Monitoring
- **Bundle Analysis**: Use Vite bundle analyzer
- **Performance Metrics**: Monitor loading times
- **Error Tracking**: Implement error boundaries
- **User Analytics**: Track user interactions across MFEs

## 🤝 Contributing

### Development Guidelines
1. **Follow TypeScript**: Maintain type safety
2. **Component Standards**: Use consistent patterns
3. **State Management**: Use Redux for shared state
4. **Testing**: Write unit tests for components
5. **Documentation**: Update README for new features

### Code Style
- **ESLint**: Follow configured rules
- **Prettier**: Auto-format code
- **Naming**: Use descriptive component and function names
- **Comments**: Document complex business logic

## 📝 License

This project is proprietary software developed for healthcare applications. All rights reserved.

## 🆘 Support

For technical support or questions:
- **Architecture Questions**: Contact the platform team
- **Authentication Issues**: Check Okta documentation
- **Build Problems**: Review Turborepo and Vite documentation
- **Bug Reports**: Create detailed issue reports with reproduction steps

---

**Built with ❤️ for modern healthcare applications**

*This boilerplate demonstrates enterprise-grade microfrontend architecture patterns suitable for large-scale healthcare platforms.*