# Singgah Frontend

React frontend for **Singgah SmartAdvisor** — a landing page and embeddable chat widget that helps users find kost and kontrakan in Indonesia.

## Environment Variables

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Base URL of the backend API (must end with `/`) |

Env files:
- `.env.development` — local development (`http://localhost:8000/`)
- `.env.production` — production (`https://singgah-api.predev.my.id/`)

## Available Scripts

```bash
npm start       # development server
npm run build   # production build
npm test        # run tests
```

## Docker Deployment

The Dockerfile builds a static React app and serves it with Nginx.

```bash
# Production build (uses .env.production automatically)
docker build -t singgah-ui .

# Override API URL at build time
docker build --build-arg REACT_APP_API_URL=https://singgah-api.predev.my.id/ -t singgah-ui .
```

## Project Structure

```
src/
├── components/
│   ├── LandingPage.js          # Marketing page
│   ├── SmartAdvisorLogin.js    # User form / chat launcher
│   ├── ChatWidget.js           # Chat interface
│   ├── PrivacyPolicyModal.js   # Privacy policy popup
│   └── ...
├── api/                         # API calls
├── i18n/                        # Language context & translations
├── store/                       # Redux store
└── utils/                       # Constants
```

## Notes

- Landing page is served at `/`.
- Chat widget is embedded via `App.js`.
- Footer links: **Kontak** opens WhatsApp; **Kebijakan Privasi** opens the privacy modal.
