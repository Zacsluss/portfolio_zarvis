# ADR 003: TypeScript Strict Mode

## Status

Accepted

## Context

JavaScript's dynamic typing can lead to runtime errors that are difficult to debug. TypeScript offers various strictness levels, from permissive to strict. The portfolio is a solo project serving as a professional showcase, requiring high code quality and maintainability.

## Decision

Enable TypeScript strict mode with all strictness flags enabled in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler"
  }
}
```

### Strict Mode Includes:

- `strictNullChecks`: Catch null/undefined errors at compile time
- `strictFunctionTypes`: Enforce contravariant function parameter types
- `strictBindCallApply`: Type-check bind/call/apply methods
- `strictPropertyInitialization`: Ensure class properties are initialized
- `noImplicitAny`: Require explicit types, no implicit `any`
- `noImplicitThis`: Require explicit type for `this` context
- `alwaysStrict`: Emit "use strict" in JS output

## Consequences

### Positive:

- **Fewer Runtime Errors**: ~80% of potential bugs caught at compile time
- **Better IDE Support**: Accurate autocomplete and refactoring tools
- **Self-Documenting Code**: Type signatures serve as inline documentation
- **Safer Refactoring**: Breaking changes detected immediately
- **Professional Quality**: Demonstrates engineering discipline to potential employers

### Negative:

- **Initial Development Overhead**: More upfront typing required (~10-15% slower)
- **Third-Party Library Issues**: Some libraries have poor type definitions
- **Learning Curve**: Strict mode requires deeper TypeScript knowledge
- **Migration Cost**: Enabling strict mode mid-project requires fixing existing code

## Trade-offs Analyzed

### Strictness vs Development Speed:

| Mode                   | Bug Prevention | Dev Speed  | Professional Perception |
| ---------------------- | -------------- | ---------- | ----------------------- |
| No TypeScript          | 0%             | Fastest    | Low                     |
| TypeScript Basic       | 40%            | Fast       | Medium                  |
| **TypeScript Strict**  | **80%**        | **Medium** | **High**                |
| TypeScript + Zod/io-ts | 95%            | Slow       | Very High               |

**Rationale**: Strict mode provides the best balance of safety and productivity for a portfolio project.

## Alternatives Considered

### 1. JavaScript Only

- **Rejected**: Too risky for production code
- No compile-time error detection
- Poor IDE support

### 2. TypeScript Basic Mode

- **Rejected**: Allows `any` types, defeating TypeScript's purpose
- Still catches some errors, but misses critical null/undefined bugs

### 3. TypeScript + Runtime Validation (Zod)

- **Considered**: Maximum safety with runtime type checking
- **Deferred**: Adds complexity and bundle size for marginal benefit
- May add later for API boundary validation

## Implementation Guidelines

### Handling `null` and `undefined`:

```typescript
// Bad
function getName(user: User) {
  return user.name; // Error if user.name is optional
}

// Good
function getName(user: User) {
  return user.name ?? 'Anonymous';
}
```

### Avoiding `any`:

```typescript
// Bad
const data: any = fetchData();

// Good
interface APIResponse {
  data: string;
  status: number;
}
const data: APIResponse = fetchData();
```

### Type Guards:

```typescript
function isError(value: unknown): value is Error {
  return value instanceof Error;
}
```

## Exceptions

Limited use of type assertions (`as`) allowed for:

- Next.js `params` and `searchParams` (framework limitation)
- Testing mocks (Jest type compatibility)
- Third-party libraries with incomplete types

All assertions must include comments explaining why they're safe.

## Enforcement

- CI pipeline fails on TypeScript errors (`npx tsc --noEmit`)
- Pre-commit hooks run type checking
- ESLint configured to warn on explicit `any` usage

## References

- [TypeScript Handbook: Strict Mode](https://www.typescriptlang.org/docs/handbook/2/strictness.html)
- Configuration: `/tsconfig.json`
- CI type-check: `/.github/workflows/ci.yml`
