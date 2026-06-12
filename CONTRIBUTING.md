# Contributing to SOL Token Launchpad

Thanks for your interest in the project. This guide is the source of truth
for the day-to-day development workflow. If anything here is out of date
with `package.json`, `package.json` wins — please open a PR to fix it.

## Project layout

```
src/
  components/        React components (one per page or shared widget)
  hooks/             Custom React hooks
  lib/               Pure helpers (cn, buildTokenMetadata, parseSolAmount, ...)
  assets/            Static images and media
tests/               Vitest unit tests mirroring src/
public/              Static files served as-is
```

The app is a Vite + React 18 SPA. There is no backend in this repo; all
chain interaction goes through `@solana/web3.js` and the wallet adapter.

## Local setup

```bash
git clone https://github.com/ashutoshgithubs/Token-Launcher.git
cd Token-Launcher
npm install
```

You will need a recent Node.js (18+ recommended, 20+ tested).

## Scripts

| Command          | What it does                            |
| ---------------- | --------------------------------------- |
| `npm run dev`    | Start the Vite dev server on :5173.     |
| `npm run build`  | Produce a production build in `dist/`.  |
| `npm run preview`| Serve the production build locally.     |
| `npm run lint`   | Run ESLint on the whole tree.           |
| `npm test`       | Run the Vitest suite once.              |
| `npm run test:watch` | Run Vitest in watch mode.           |

The test runner is **Vitest**. Tests live under `tests/` and use the `@`
alias, matching `src/`.

## Writing tests

- One `*.test.js` per pure helper or reducer.
- Prefer direct calls to pure functions. Use `renderHook` only when a hook's
  return value is part of the contract you are testing.
- Mock external services (Solana RPC, wallet adapter, Uploadcare, Cloudinary)
  — unit tests must be deterministic and offline.
- For the toast reducer (`src/hooks/use-toast.js`), use `vi.useFakeTimers()`
  to assert the side-effecting `setTimeout`.

## Opening an issue

- Search existing issues first.
- One topic per issue. Reproduction steps and expected vs. actual behavior
  are required for bug reports.
- Add the relevant `src/` files to the issue description so a contributor
  does not have to re-discover the code path.

## Branch and PR conventions

- **Branch name**: `issue-<number>` matching the upstream issue (e.g. the
  PR that closes issue #14 lives on `issue-14`).
- **Commit messages**: imperative mood, optionally prefixed with a
  conventional type, e.g. `fix: pass token description to metadata upload`.
- **One issue per PR.** Do not mix unrelated changes.
- **PR title**: `<type> : <imperative summary>` (past tense on the verb is
  also acceptable, e.g. `fix : added ...`).
- **PR body** must include:
  - `Closes #<issue-number>` on its own first line.
  - `Summary of What Has Been Done:`
  - `Changes Made:`
  - `Impact it Made:`
- **Do not commit secrets** (RPC private keys, wallet mnemonics, Pinata
  credentials, Cloudinary presets, etc.). `.env` is already in
  `.gitignore`.

## Local verification before pushing

Run, in order:

```bash
npm test
npm run lint
npm run build
```

A PR that breaks the build, the lint, or the test suite will be asked to
fix it before review.
