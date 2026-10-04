# Nap Time Builds

A phone-first, static Vite site for the Nap Time Builds series. It introduces the series, lists episodes, links to each reel and hosted app, and includes two explicitly fictional sample episodes with working sample apps.

## Run it

```sh
npm install
npm run dev
```

Vite prints the local preview URL. Create a production build with `npm run build`; preview that build with `npm run preview`.

## Add an episode

Drop one folder into `episodes/` and add an `episode.json` file inside it. Vite discovers `episodes/*/episode.json` automatically at build time, and the page renders each file in `sortKey` order.

```text
episodes/
└── day-003/
    └── episode.json
```

Use this small metadata shape:

```json
{
  "sortKey": "003",
  "dayLabel": "DAY 03",
  "title": "Your build name",
  "description": "One short sentence about what it does.",
  "reelUrl": "https://www.instagram.com/reel/your-reel-id/",
  "appUrl": "https://your-hosted-app.example/",
  "sample": false,
  "artwork": "timer"
}
```

`reelUrl` and `appUrl` can be left empty until the links are ready. Internal app paths such as `/apps/my-app/` are also supported and are adjusted for the published project path. Set `sample` to `true` only for clearly labeled mock entries. `artwork` can be `timer` or `notes`; unknown values use the timer illustration. After adding a folder, rebuild or let the dev server reload the new file. A hosted app can live in `public/apps/` or at any external URL.

## Instagram handle

Set `instagramHandle` in `src/config.js` to the username without `@`. The follow section links directly to the account configured there; leave the value empty to show an `@yourhandle` placeholder.

## Publish

This repository is configured for GitHub Pages with GitHub Actions. Pushes to `main` build the Vite site and publish the `dist/` output. The project base path is set for its GitHub Pages URL. To publish a newly added episode in one terminal command:

```sh
git add episodes && git commit -m "Add an episode" && git push origin main
```

The site is served at `https://akshaymalhotra12345.github.io/nap-time-builds/` after Pages is enabled and the first workflow completes.
