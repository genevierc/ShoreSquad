# ShoreSquad (Scaffold)

Small static scaffold for the ShoreSquad landing/app shell.

## Files
- `index.html` — HTML5 entry
- `css/styles.css` — basic styles and color variables
- `js/app.js` — lightweight app shell with lazy map + weather stubs
- `.vscode/settings.json` — Live Server sample config (port 5500)
- `.gitignore` — ignores `node_modules/` and `.DS_Store`

## Run locally
- Open the folder in VS Code and use the Live Server extension: click "Go Live".

Or run a simple static server (if Node is available):

```powershell
npx http-server -p 5500
```

Or (if Python installed):

```powershell
python -m http.server 5500
```

## Next steps
- Integrate a map library (Leaflet/Mapbox) and lazy-load its script.
- Plug a real weather API (OpenWeatherMap, Meteostat), store API key securely.
- Build event creation UI with validation and accessible dialogs.
- Add authentication/social features (OAuth) and invites.
