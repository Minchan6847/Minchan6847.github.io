# Minchan6847.github.io

Portfolio and resume site of Minchan Kim, digital IC design engineer.
Live at <https://minchan6847.github.io>.

## How the site is built

Plain HTML, CSS and JavaScript. There is no build step: GitHub Pages serves the files on `main` as they are.

| File | What it holds |
|---|---|
| `index.html` | The page shell. Loads the fonts, the stylesheet and the two scripts. |
| `assets/content.js` | All text on the site, each string written as `L("English", "한국어")`. |
| `assets/app.js` | Renders the pages from `content.js` and handles navigation. |
| `assets/style.css` | Colors, type and layout, for light and dark themes. |
| `docs/` | Project reports linked from project pages (PDF). |

## Editing

- To change wording, edit `assets/content.js` only.
- To add a project, add an entry to `projects` in `assets/content.js`. `stages` decides which cells are filled in the flow map on the home page.
- A project's report link appears only when the file named in its `report.path` exists in the repository.

## Addresses

| Address | Page |
|---|---|
| `/#en`, `/#ko` | Home, in English or Korean |
| `/#orca`, `/#ko-orca` | A project page (the project `id` from `content.js`) |
| `/#projects`, `/#ko-projects` | A section of the home page |
