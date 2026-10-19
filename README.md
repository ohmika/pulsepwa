# Pulse Camera

Pulse Camera is a self-contained HTML app. The interface, styling, and camera pulse estimator are all inside `index.html`; it has no package install or build step.

## Run it

Open `index.html` in a current browser. Camera access depends on browser security rules: use `localhost` or an HTTPS address if the browser blocks the camera from a local file.

## Publish on GitHub Pages

1. Upload the contents of this folder to the root of a GitHub repository and push them to its default branch.
2. In **Settings → Pages**, select **GitHub Actions** as the deployment source.
3. The included workflow publishes the standalone page and the small files required for PWA installation and offline loading.
4. Open the GitHub Pages URL over HTTPS, then add Pulse Camera to your Home Screen from the browser menu.

The app reads camera frames locally in your browser. It does not save the frames or send them to a server. Pulse readings are wellness estimates, not medical measurements.
