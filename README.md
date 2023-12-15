# CV

My CV in JSON format based on <https://jsonresume.org/>.

![Preview of CV online](images/cv_online.png)

## Where does it end up?

1. On [`cv.alfierenn.dev`]
1. On the [json-resume registry] (via the [gist])
1. PDF on the [releases page] or [website]

[`cv.alfierenn.dev`]: https://cv.alfierenn.dev
[json-resume registry]: https://registry.jsonresume.org/alifeee
[gist]: https://gist.github.com/alifeee/97f9ac1642b1c46cf66942c3f079a42f
[releases page]: https://github.com/alifeee/json-resume/releases
[website]: https://alifeee.github.io/json-resume/Alfred-Renn-CV.pdf

## Changing the theme

The current theme is held within the [`./theme`](./theme/) folder. You can also use online themes.

A list of themes can be found at [https://jsonresume.org/themes/](https://jsonresume.org/themes/). You can try them by visiting the [JSON resume registry](https://registry.jsonresume.org/alifeee). The theme can be changed via the `theme` query parameter, e.g.:

```url
https://registry.jsonresume.org/alifeee?theme=even
```

## Development

### Install dependencies

```bash
bun install
```

(in a separate folder) to install Chrome with Puppeteer ([does not install with Bun](https://github.com/oven-sh/bun/issues/4705))

```bash
npm install puppeteer
```

### Test & spellcheck

```bash
bun run test
```

### Build HTML

```bash
bun run build-html
```

### Build PDF

```bash
bun run build-pdf
```

### Develop HTML with hot reload

Hot reload is on any files imported, which are `template.txt` and `cv.json` (see `build.html.ts`). The template is a `.txt` only as this can be imported into Bun natively, whereas other extensions [require some typescript magic](https://stackoverflow.com/questions/56175900/how-do-you-import-a-text-file-into-typescript) to be imported.

Note that hot reload does not work with Windows files. The repository must exist on a Linux filesystem.

To do this on Windows, open `\\wsl.localhost\Ubuntu\home\<user>` with Explorer and open VSCode via the context menu. WSL can be used via the console window. This way, [hot reload works](https://github.com/oven-sh/bun/issues/5155) in Bun.

Using it like this, sometimes VSCode's file explorer does not refresh properly.

#### HTML

```bash
bun run dev
```

#### PDF

Note: you still must manually refresh the opened PDF after it rebuilds. This is notably less hot than live-developing the HTML, but still quite fast.

```bash
bun run dev-pdf
```

## GitHub Actions

See [the files themselves](.github/workflows) for more details.

| Action | Description |
| ------ | ----------- |
| [`test.yml`] | Runs on pull request and push to `main`. Verifies that the `resume.json` conforms to the [json-resume schema], [JS tests] pass, and runs [spellcheck] |
| [`publish.yml`] | Runs on release (or tag). Builds the HTML and PDF, then pushes to: [releases page]; and [`publish` branch] (viewable on [my GitHub pages]). |
| [`gist.yml`] | Runs on release (or tag). Updates the [resume gist] if `resume.json` has changed. |

[`test.yml`]: .github/workflows/test.yml
[json-resume schema]: https://jsonresume.org/schema/
[`publish.yml`]: .github/workflows/publish.yml
[resume gist]: https://gist.github.com/alifeee/97f9ac1642b1c46cf66942c3f079a42f
[my GitHub pages]: https://alifeee.github.io/json-resume/
[`gist.yml`]: .github/workflows/gist.yml
[JS tests]: ./test.spec.ts
[spellcheck]: #spellcheck
[`publish` branch]: https://github.com/alifeee/json-resume/tree/publish
