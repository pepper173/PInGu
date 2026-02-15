# PInGu Frontend - AI Coding Agent Instructions

## Project Overview
**PInGu** is an educational platform for interactive learning modules. This Angular 20 frontend supports two user roles: **students** (code-based login) and **teachers** (email/password auth). The app integrates **H5P** interactive content for learning modules.

## Architecture

### Dual Authentication System
- **Student Auth**: Login via numeric codes, managed by [StudentAuthService](src/app/services/auth/student/studentAuth.service.ts)
- **Teacher Auth**: Email/password login, managed by [TeacherAuthService](src/app/services/auth/teacher/teacherAuth.service.ts)
- Both services use Angular **signals** (`signal()`, `computed()`) for reactive state management
- Cookie-based sessions via HTTP interceptor that adds `withCredentials: true` to `/api/` requests (see [app.config.ts](src/app/app.config.ts))
- Auth state initialized on app startup via `provideAppInitializer()` for both student and teacher services

### Component Architecture
**Standalone components only** - this project uses Angular's modern standalone API (no NgModules):
- All components have `standalone: true` and explicitly list imports
- All components use class-based (`@Component` decorator) pattern
- Template/style files separated (`.html`/`.scss`) from component TypeScript

### Service Layer Pattern
Services use `@Injectable({ providedIn: 'root' })` for singleton instances:
- **Auth services**: Signal-based reactive state (`_user` signal, `isLoggedIn` computed)
- **Data services**: HTTP operations via injected `HttpClient`
- **H5P services**: [H5pStorageService](src/app/services/data/h5p/h5p.service.ts) for module state persistence, `H5pAutoSaveService` for interval-based saves
  - Results are captured from the H5P `externalDispatcher` xAPI events and posted via `H5pResultService`

### Route Guards
Functional guards using `CanActivateFn`:
- [authGuard](src/app/services/auth/teacher/auth.guard.ts) - protects teacher routes
- [studentAuthGuard](src/app/services/auth/student/studentAuth.guard.ts) - protects student learning paths
- Guards use `inject()` to access services and `Router.createUrlTree()` for redirects

## Key Conventions

### Dependency Injection
Use `inject()` function (not constructor injection) as seen in auth services:
```typescript
private http = inject(HttpClient);
private router = inject(Router);
```

**Exception**: Router can be injected via constructor for backwards compatibility, but prefer `inject()` for consistency.

### Import Order and Formatting
Organize imports in this specific order:
1. **Angular core** (`@angular/core`)
2. **Angular framework** (`@angular/router`, `@angular/forms`, `@angular/common`)
3. **Internal services** (`../../services/...`)
4. **Component imports** (`./component/component`)
5. **Types/Interfaces** (if not co-located with component)

Alphabetize imports within each category:
```typescript
// ✅ Correct
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { StudentAuthService } from '../../services/auth/student/studentAuth.service';
import { StudentLoginHeader } from './student-login-header/student-login-header';
import { StudentLoginForm } from './student-login-form/student-login-form';

// ❌ Wrong - imports not grouped or alphabetized
import { StudentLoginHeader } from './student-login-header/student-login-header';
import { Component, inject } from '@angular/core';
import { StudentAuthService } from '../../services/auth/student/studentAuth.service';
```

**Formatting Rules**:
- Space after opening `{` and before closing `}`: `{ Component }` not `{Component}`
- Space after commas in arrays and parameter lists
- No empty line between last import and `@Component` decorator
- Use single quotes for strings (project preference)

### Template Syntax
Uses Angular 20's **control flow syntax** (not `*ngIf`/`*ngFor`):
```html
@for (item of items; track item.id) {
  <div>{{ item.label }}</div>
}
```

### File Naming
- Components: PascalCase for class, kebab-case for files (e.g., `clp.ts` exports `Clp`)
- H5P module components: Uppercase letter + number (e.g., `b1.ts` exports `B1`, `c2.ts` exports `C2`)
- Services: camelCase with `.service.ts` suffix
- Models: `.model.ts` suffix (e.g., `studentAuth.model.ts`)
- Guards: kebab-case with `.guard.ts` suffix (e.g., `studentAuth.guard.ts`)

### Environment Configuration
- Development: `environment.ts` points to `http://localhost:3000/api/`
- Production: `environment.prod.ts` points to `https://pingu.schule/api/`
- File replacement configured in [angular.json](angular.json) for production builds

## H5P Integration

### Critical Setup
- H5P content lives in [src/assets/h5p/](src/assets/h5p/) organized by learning path (e.g., `binaerer-bob-code/`, `digitale-zeitreisen/`, `freizeit/`)
- Uses `h5p-standalone` npm package (CommonJS, allowed in [angular.json](angular.json))
- Type definitions in [src/types/h5p-standalone.d.ts](src/types/h5p-standalone.d.ts)
- Window extensions for H5P in [src/types/h5p-window.d.ts](src/types/h5p-window.d.ts)
  - Include both `H5PIntegration` and `H5P.externalDispatcher` typings in this file

### H5P Module Architecture
All H5P module components extend [H5pModuleBase](src/app/components/h5p/h5p-module-base.ts):
- **Base class pattern**: Abstract `@Directive()` class provides common functionality
- **Shared template**: All modules use [h5p-module.html](src/app/components/h5p/h5p-module.html)
- **Shared styles**: All modules use [h5p-module.scss](src/app/components/h5p/h5p-module.scss)
- **ViewChild reference**: `@ViewChild('h5pContainer')` for H5P content container
- **Lifecycle**: Auto-initializes H5P content in `ngAfterViewInit()`, cleans up in `ngOnDestroy()`
  - `ngOnDestroy()` must detach any `externalDispatcher` handlers to avoid leaks

### Base Class Features
`H5pModuleBase` provides:
- **State management**: Automatic save/restore of progress via `H5pStorageService`
- **Auto-save**: Configurable interval (default 10s) via `getSaveFrequency()`
- **xAPI results**: Listen to `H5P.externalDispatcher.on('xAPI', ...)` and post `event.data.statement.result` via `H5pResultService`
- **Loading states**: `isLoading` and `loadingText` properties
- **Navigation**: Override `onNext()`, `onBackToPrevious()`, `onBack()`, `onLogout()`
- **Content ID**: Generated from student ID + module name for unique state tracking
- **Module properties**: 
  - `moduleTitle` - Header title
  - `showNavigationButtons` - Show next/back buttons
  - `showBackButton` - Show the back button (within nav buttons)
  - `backButtonLabel` - Label for home button (default: "Home")
  - `baseUrl` - Base path for module navigation (default: "/modules")

### Module Types

#### Static Sequential Modules (B1, B2, C1-C3, E1-E16)
Individual component per module with hardcoded navigation:
```typescript
export class B1 extends H5pModuleBase {
  override moduleTitle = 'Module Title';
  override showNavigationButtons = true;
  override showBackButton = false;
  
  override onNext(): void {
    this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/path/B2')]);
  }
}
```

### Module Routing
[H5pModuleRoutes](src/app/components/h5p/h5p-modules-route.ts) acts as a router component:
- Extracts module identifier from URL parameter
- Uses `@switch` control flow to render appropriate component
- Route definition: `{ path: 'modules/:module', component: H5pModuleRoutes }`

### Learning Module Flow
1. Student selects path from [Clp](src/app/components/ChooseLpath/clp.ts) (hardcoded `PathItem[]` array)
2. Navigates to `/modules/:module` with URL-encoded H5P path (e.g., `/modules/%2Fassets%2Fh5p%2Ffreizeit%2FE1`)
3. `H5pModuleRoutes` determines which component to render based on module identifier
4. Module component extends `H5pModuleBase` which:
   - Creates unique `content_id` from student ID + module name
   - Fetches previous state via `H5pStorageService.getLastH5PModuleState()`
   - Initializes H5P content with saved state
   - Starts auto-save using `H5pAutoSaveService`
5. Navigation between modules handled by component's `onNext()`/`onBackToPrevious()` methods

## Development Workflow

### Commands
- **Dev server**: `npm start` (runs on `0.0.0.0:4200` with polling for Docker)
- **Build**: `npm run build` (output to `dist/`)
- **Tests**: `npm test` (Karma + Jasmine)

### Docker Setup
- Development: [Dockerfile](Dockerfile) runs `ng serve --configuration production`
- Uses Node 22 Alpine, exposes port 4200
- Note: "production" config in dev Dockerfile may be unintentional

### TypeScript Config
- **Strict mode disabled** (`strict: false` in [tsconfig.json](tsconfig.json))
- Decorators enabled (`experimentalDecorators: true`)
- Angular-specific strict options enabled in `angularCompilerOptions`

## API Integration
All backend calls go through services, base URL from `environment.apiUrl`:
- Auth endpoints: `/api/auth/student`, `/api/auth/teacher`
- Class management: `/api/class/:teacherId`
- H5P state: `/api/h5p/module/:contentId` (GET/POST)
- H5P results: `/api/h5p/module/result` (POST)

## Project Structure

### Key Directories
- **src/app/components/** - All UI components organized by feature
  - **ChooseLpath/** - Student path selection (CLP = Choose Learning Path)
  - **h5p/** - H5P module components organized by learning path
  - **studentLogin/** - Student authentication UI
  - **teacherLogin/** - Teacher authentication UI
  - **teacherView/** - Teacher dashboard and management
- **src/app/services/** - Singleton services
  - **auth/** - Authentication services for both roles
  - **data/** - Data services for API calls
- **src/assets/h5p/** - H5P content packages by learning path
- **src/environments/** - Environment-specific configuration
- **src/types/** - TypeScript type definitions for external libraries

### Current Learning Paths
1. **Sensoren als Datensammler** (Sensors) - Not yet implemented
2. **Sprache der Computer** (Binary Code) - B1, B2 modules
3. **Digitale Zeitreise** (Digital Time Travel) - C1, C2, C3 modules
4. **Freizeitbeschäftigung** (Leisure Activities) - E1-E16 modules

## Common Patterns to Follow

### Adding H5P Modules

#### For Static Sequential Modules (like B1-B2, C1-C3):
1. Create component file in appropriate directory (e.g., `src/app/components/h5p/my-module/m1.ts`)
2. Extend `H5pModuleBase` and use shared template/styles:
   ```typescript
   import {Component} from '@angular/core';
   import {H5pModuleBase} from '../h5p-module-base';
   
   @Component({
     selector: 'app-my-module-m1',
     standalone: true,
     templateUrl: '../h5p-module.html',
     styleUrl: '../h5p-module.scss',
   })
   export class M1 extends H5pModuleBase {
     override moduleTitle = 'My Module - Part 1';
     override showNavigationButtons = true;
     override showBackButton = false;
     
     override onNext(): void {
       this.router.navigate([this.baseUrl, encodeURIComponent('/assets/h5p/my-module/M2')]);
     }
   }
   ```
3. Add to `H5pModuleRoutes` imports and switch statement
4. Add entry point to `Clp.paths` array

### Adding Components (General):

#### Creating a New Feature Component:
Follow this exact structure pattern:

1. **Create main folder**: `src/app/components/MyFeature/`
2. **Create main component files directly in folder**:
   ```
   MyFeature/
     myFeature.ts      ← Main component
     myFeature.html
     myFeature.scss
   ```
3. **Create sub-component folders** (if needed):
   ```
   MyFeature/
     myFeature.ts
     myFeature.html
     myFeature.scss
     my-feature-header/      ← Sub-component folder
       my-feature-header.ts
       my-feature-header.html
       my-feature-header.scss
   ```

#### Component File Template:
```typescript
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MyService } from '../../services/my-service/my.service';
import { SubComponent } from './sub-component/sub-component';

@Component({
  selector: 'app-my-feature',
  standalone: true,
  imports: [SubComponent],
  templateUrl: './myFeature.html',
  styleUrls: ['./myFeature.scss']
})
export class MyFeature {
  private myService = inject(MyService);
  private router = inject(Router);
  
  // Component logic
}
```

#### Sub-Component Template:
```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-my-feature-sub',
  standalone: true,
  templateUrl: './my-feature-sub.html',
  styleUrls: ['./my-feature-sub.scss']
})
export class MyFeatureSub {
  @Input() data: any;
  @Output() action = new EventEmitter<void>();
  
  handleAction() {
    this.action.emit();
  }
}
```

#### Important Guidelines:
1. **Use standalone components** with explicit imports
2. **Inject services** via `inject()` function (not constructor)
3. **Use signals** for reactive state (`signal()`, `computed()`)
4. **Separate template/styles** into `.html`/`.scss` files (never inline)
5. **Use `@for` / `@if`** control flow (not `*ngFor` / `*ngIf`)
6. **Use `styleUrls`** (array) not `styleUrl` (string)
7. **No empty lines** between imports and `@Component` decorator
8. **Organize imports** following the import order convention

### Adding Routes:
1. Add to [app.routes.ts](src/app/app.routes.ts)
2. Protect with appropriate guard if auth required
3. Use lazy loading with `loadComponent()` for feature routes

### Adding Services:
1. Use `@Injectable({ providedIn: 'root' })`
2. Inject dependencies via `inject()` in class body
3. Return Observables from HTTP methods (don't subscribe in service)
4. Use signals for shared state, not BehaviorSubjects
