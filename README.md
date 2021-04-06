
# Getting Started with Bean-Dashboard
This is a barebones deployment, using the [Bean-Dashboard-API](https://github.com/incendiarybean/Bean-Dashboard-API).
To use, you will need to follow the information on the Bean-Dashboard-API first.

## SCRIPTS

In the project directory, you can run:

### `npm run start-dev`

Runs the app in the development mode.\
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run start-server`

Runs the server API in development mode.\
This will only launch the API, and will be accessible via the PORT defined.

This uses NODEMON to hot-reload the server, this will crash with issues and relaunch when fixed.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build:css`
Builds the index.css file from the app.css file.

This relies on POSTCSS, POSTCSS-CLI & Tailwind:
    -   tailwind.config.js
    -   postcss.config.js

### ENV FILES

###### .env.template

This is the server's process.env variable allocation.

This only uses the PFX, fill out with the PFX password from above processes.

###### .env.development.template

This is the client's process.env variable allocation.
