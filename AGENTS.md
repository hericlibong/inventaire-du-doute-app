# Repository Guidelines

## Project Structure & Module Organization

This repository is a statically generated SvelteKit application. Page routes and their loaders live in `src/routes/`; shared browser-side modules belong in `src/lib/`, and global styling is defined in `src/styles/app.css`. `src/app.html` contains the HTML shell. Versioned JSON snapshots are stored under `static/data/`, while artwork and portrait files live in `static/oeuvres/` and `static/portraits/`. Keep data-import logic in `scripts/` and project decisions or data contracts in `docs/`.

The application consumes validated exports from the separate `inventaire-du-doute` source repository. Avoid recalculating or hand-editing generated corpus data in application components.

## Build, Test, and Development Commands

- `npm ci`: install the exact dependency versions recorded in `package-lock.json`.
- `npm run dev`: start the Vite development server.
- `npm run build`: prerender the static production site into `build/`; run this before submitting changes.
- `npm run preview`: serve the latest production build locally for final checks.
- `npm run sync:data`: synchronize validated data into `static/data/` and referenced media into `static/oeuvres/` and `static/portraits/`. The default source is `../MuseumAtribution`; set `INVENTAIRE_SOURCE=/path/to/repo` to use another source clone.

## Project Direction & Working Rules

This project is a datajournalistic data-visualization webapp, not a commercial product or an MVP. It serves the general public and should prioritize clarity of information, originality of representation, and efficient exploration. Wording published in Joconde is the primary editorial entry point to artists, works, and places; public-facing copy must remain in French.

The Matrice is the chosen visual direction for the next prototype, but the current laboratory prototype is not approved as a whole. The Atlas is discarded, and the Constellation's orbital representation is not retained; only its principle of readable transitions and reversible changes of level may be reused.

Before any visual or structural intervention, read `docs/contexte-et-donnees.md`, `docs/contrat-donnees.md`, `docs/roadmap.md`, and `docs/comparaison-laboratoire-visuel.md`. Make important changes progressively and obtain validation before expanding their scope. Do not commit or push without an explicit request. Never add `Co-authored-by`, an assistant name, or AI attribution to commits or documentation.

## Coding Style & Naming Conventions

Use modern ES modules and Svelte 5 conventions. Match the existing tab indentation and single-quoted JavaScript strings. Keep route-specific code beside its `+page.svelte` or `+page.js`; place reusable logic under `src/lib/<feature>/`. Use lowercase, descriptive directory names and kebab-case filenames where SvelteKit does not prescribe a name. Preserve French accents in user-facing copy and keep data-field names consistent with the published JSON contract.

No formatter or linter is currently configured, so review diffs carefully and run `git diff --check` before committing.

## Testing Guidelines

There is no automated test framework or coverage threshold yet. At minimum, run `npm run build` and manually verify affected routes in desktop and mobile layouts. For interaction changes, check keyboard and touch behavior, URL state, empty data, and unavailable-content states. If introducing tests, add the runner and an `npm test` script in the same pull request; name tests `*.test.js` near the module or in a clearly documented `tests/` directory.

## Commit & Pull Request Guidelines

Follow the existing Conventional Commit style, such as `feat: ajouter le laboratoire visuel` or `chore: valider les phases 1 et 2`. Keep commits focused and use an imperative, concise subject. Pull requests should explain the user-visible outcome, identify affected routes or data files, list verification commands, and link relevant issues or roadmap entries. Include before/after screenshots for visual changes and document any regenerated datasets or source snapshot changes.
