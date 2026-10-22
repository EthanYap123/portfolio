# Ethan Yap — Portfolio site

Personal portfolio for Ethan Yap (Year 2 IT student, Singapore Polytechnic), served by GitHub Pages at https://ethanyap123.github.io/portfolio/ from the `main` branch of `EthanYap123/portfolio`.

## How the site is built

- Plain static site, no build step and no dependencies. Everything is in `index.html`: inline `<style>` with CSS variables in `:root`, and a small vanilla-JS `<script>` at the bottom.
- Projects are rendered from the `PROJECTS` array in that script (title, summary, stack, points, optional `repo` link). Edit the array to add or change a project; the rest of the page is hand-written HTML.
- `assets/ethan.jpg` is the contact-section portrait; `assets/Ethan-Yap-Resume.pdf` is the resume both "Resume" buttons download. Replace the file in place to update it.
- Fonts come from Google Fonts: Instrument Sans (body), Instrument Serif (headings), JetBrains Mono (labels).
- The design came from Claude Design ("Portfolio v2"). Keep its look: warm off-white background `#f5f2ec`, ink `#1c1b18`, orange accent `oklch(0.55 0.15 50)`, rounded white cards.
- The project screenshot boxes are still striped placeholders; real screenshots should go in `assets/`.

## Previewing locally

```bash
python -m http.server 8174
```

Then open http://localhost:8174. Check desktop and phone (375px) widths; the page must not scroll sideways on a phone.

## Workflow for changes

Ethan wants every change to end up live, so finish each task all the way through:

1. Branch off an up-to-date `main` (`git pull`, then `git switch -c <type>/<short-name>`).
2. Make the change and preview it locally.
3. Commit, push the branch, and open a PR with `gh pr create` (not a draft).
4. Merge it: `gh pr merge --squash --delete-branch`.
5. Wait for GitHub Pages to redeploy (about a minute) and confirm the change is on https://ethanyap123.github.io/portfolio/.

Never force-push to `main` or rewrite its history.
