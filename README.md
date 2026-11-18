# Edit Lab — Premiere Pro learning studio

A static, self-guided editing course with embedded YouTube lessons, an 8-week syllabus, practical assignments, field notes, and progress tracking.

**No framework, backend, subscription, build step, or API keys required.**

## What's included

- Eight modules covering keyboard efficiency, professional workflow, audio, sound design, color correction, creative grading, masking, and a final project.
- YouTube lessons loaded on click, with an **Open on YouTube** fallback if a creator disables embedding.
- Watchlist checkmarks, assignment checklists, a personal notes field for each week, progress summaries, and lesson search (`Cmd/Ctrl + K`).
- Add a YouTube video to any week's list.
- Progress automatically saved to **this browser's localStorage**. Export progress as a `.json` backup and import it on another browser or device.
- Responsive desktop and mobile layout.

## Publish on GitHub Pages (easiest)

1. Download and unzip the project.
2. Create a public GitHub repository, for example `premiere-edit-lab`.
3. Upload **all the files in this folder** to the **root** of the repository (`index.html`, `styles.css`, `data.js`, `app.js`, `.nojekyll`, `README.md`). Do not upload the zip itself.
4. Go to **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**, choose **main** and **/(root)**, then save.
6. Open the GitHub Pages URL that GitHub shows you (typically `https://YOUR-USERNAME.github.io/premiere-edit-lab/`).

The first deployment may take a couple of minutes. Subsequent changes to the repository are published automatically.

## Publish on Vercel

1. Create a new GitHub repository and add the project files.
2. In Vercel, choose **Add New → Project**, and import the repository.
3. Use framework preset **Other** and leave the build command empty. Publish.

Alternatively, you can deploy the folder directly using the Vercel CLI. This is a static website; it does not need Node in production.

## Customize the course

Open `data.js`. Every entry in `window.EDIT_LAB_WEEKS` is an editable module with a title, description, video list, resources, assignment, and coaching note.

To replace or add a video in the permanent course, use its YouTube ID, e.g. for `https://www.youtube.com/watch?v=uhw50nxeDQY`:

```js
{ id: 'uhw50nxeDQY', title: 'Edit Faster With These Hotkeys', channel: 'Adobe Video × Film Riot', why: 'Practice deliberate shortcut choices.' }
```

Alternatively, add a personal video in the dashboard itself. It will be saved with your local progress, not written back to `data.js`.

## How progress works (important)

This website **does not have user accounts or automatic cloud sync**. It saves progress in your browser, on the same website origin, using `localStorage`. Progress from the local file preview, GitHub Pages, and Vercel is not shared automatically.

Use **Export progress** to save a `.json` backup, then **Import** to restore on the new site or a different device. Import **replaces** the destination's current progress after confirmation.

Incognito/private sessions may clear progress automatically. Clearing site data or changing domains can also reset local progress unless you have a backup.

## Run locally

Double-clicking `index.html` usually works for basic use, but for consistent browser storage and a more realistic preview, serve the directory locally:

```bash
cd premiere-edit-lab
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Notes

- Some YouTube creators do not permit external embeds. In that case, use the **Open on YouTube** link, then return to mark the lesson watched.
- YouTube thumbnails and embeds, and the optional Google Fonts, require an internet connection.
- Older Premiere Pro videos may show a different interface from the 2026 release.
- Course lessons are links to third-party materials and may change or be removed by their respective creators.
- This site is an independent personal training dashboard, not affiliated with Adobe or YouTube.
