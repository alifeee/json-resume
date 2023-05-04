# JSON Resume

My CV in JSON format based on <https://jsonresume.org/>.

## [View resume online](https://registry.jsonresume.org/alifeee)

![Preview of resume online](images/resume_preview.png)

## Development

### Prerequisites

| Requirement | Version |
| ----------- | ------- |
| Node        | 19.8.1  |
| npm         | 9.5.1   |

### Install dependencies

```bash
npm install
```

### Validate JSON

```bash
npm run test
```

### Build HTML (with theme)

```bash
npm run build
# or
npm run build -- even
# or
npm run build -- paper
# ...
```

### Run with watch (with theme)

```bash
npm run dev
# or
npm run dev -- even
# ...
```

### View HTML

Open `resume.html` using the VSCode Live Server extension.

![Context menu for live server in VSCode](images/live%20server.png)

## Themes

### Remote

The easiest way to experiment with themes is to update the resume gist (push to main) and visit the [JSON resume registry](https://registry.jsonresume.org/alifeee). The theme can be changed via the `theme` query parameter, e.g.:

```url
https://registry.jsonresume.org/alifeee?theme=even
```

A list of themes can be found at [https://jsonresume.org/themes/](https://jsonresume.org/themes/). A lot of these are broken. Some promising looking themes (look nice, work well on mobile) are:

- [Even](https://github.com/rbardini/jsonresume-theme-even) ²
- [Kendall](https://github.com/linuxbozo/jsonresume-theme-kendall)
- [Paper](https://github.com/TimDaub/jsonresume-theme-paper) ²
- [Eloquent](https://github.com/thibaudcolas/jsonresume-theme-eloquent) ²
- [Elegant](https://registry.jsonresume.org/alifeee?theme=elegant) (not installed as very outdated and full of npm vulnerabilities)
- [OnePage](https://github.com/ainsleyc/jsonresume-theme-onepage) (not installed as very outdated and full of npm vulnerabilities)

² - these do not work on `registry.jsonresume.org`

### Local

Alternatively, the theme can be changed locally by installing the theme

```bash
npm install --save jsonresume-theme-even
```

and then running the build command with the theme name

```bash
npm run build -- even
```

or updating `meta.theme` to the new theme in `resume.json` and running the build command

```bash
npm run build
```

## GitHub Actions

| Action | File | Description |
| ------ | ---- | ----------- |
| `Node.js CI` | `.github/workflows/node.js.yml` | Runs `npm test` on push to main. |
| `GitHub Gist updater` | `.github/workflows/gist.yml` | Updates the [resume gist](https://gist.github.com/alifeee/97f9ac1642b1c46cf66942c3f079a42f) on push to main, so that the [JSON resume preview](https://registry.jsonresume.org/alifeee) stays updated. |
