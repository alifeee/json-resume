# CV

## Development

### Install dependencies

```bash
bun install
```

(in a separate folder) to install Chrome with Puppeteer ([does not install with Bun](https://github.com/oven-sh/bun/issues/4705))

```bash
npm install puppeteer
```

### Build HTML

```bash
bun build-html.ts
```

### Build PDF

```bash
bun build-pdf.ts
```

### Develop HTML with hot reload

Hot reload is on any files imported, which are `template.txt` and `cv.json`. The template is a `.txt` as this can be imported into Bun natively, whereas other extensions [require some typescript magic](https://stackoverflow.com/questions/56175900/how-do-you-import-a-text-file-into-typescript) to be imported.

Note that hot reload does not work with Windows files. The repository must exist on a Linux filesystem.

To do this on Windows, open `\\wsl.localhost\Ubuntu\home\<user>` with Explorer and open VSCode via the context menu. WSL can be used via the console window. This way, [hot reload works](https://github.com/oven-sh/bun/issues/5155) in Bun.

Using it like this, sometimes VSCode's file explorer does not refresh properly.

```bash
bun --hot index.ts
```
