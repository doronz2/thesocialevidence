# The Social Evidence

A browser extension for collaborative fact-checking. Select any text on a news page, attach a comment showing how it contradicts evidence or prior statements, and every visitor with the extension installed sees the same annotations — turning passive reading into a shared, persistent record of public inconsistency.

**Live API:** https://supportive-determination-production-3681.up.railway.app

---

## How it works

1. Install the extension in Chrome
2. Visit any news website or article
3. Select a word, phrase, or sentence
4. Click the **COMMENT** button that appears on the page
5. Type your comment explaining the contradiction or providing evidence
6. The annotation is saved centrally — anyone else with the extension visiting the same URL will see it highlighted in orange
7. Clicking a highlighted section shows the comment

Annotations are stored by URL, so they are tied to the exact page where the text appears.

---

## Architecture

```
extension/        Chrome extension (content script)
extension-api/    Express.js REST API + MongoDB
sapper-app/       Svelte/Sapper web app (article browser)
```

### Extension (`extension/`)

A content script that runs on every page (`http://*/*`, `https://*/*`). It:
- Injects a COMMENT button into the page
- On text selection + click, prompts for a comment and saves it via the API
- On page load, fetches all existing annotations for the current URL and highlights them

### API (`extension-api/`)

Express.js server with two endpoints:

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/quotes?url=<url>` | Fetch all annotations for a given URL |
| `POST` | `/api/quotes` | Save a new annotation |

Each annotation stores: `url`, `comment`, `range` (DOM path as JSON), and timestamps.

---

## Install the extension

1. Clone this repo
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the `extension/` folder

---

## Run the API locally

```bash
cd extension-api
npm install
cp .example.env .env
# Edit .env and set MONGODB_URL to your MongoDB connection string
npm start
```

The server starts on `http://localhost:8080`.

To point the extension at your local API, change `baseUrl` in `extension/content.js`:

```js
const baseUrl = "http://localhost:8080";
```

---

## Tech stack

- **Extension**: Vanilla JS, Chrome Extensions Manifest V2
- **API**: Node.js, Express, Mongoose, MongoDB Atlas
- **Hosting**: Railway (API), MongoDB Atlas (database)
