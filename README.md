# HOW TO SET UP DEV ENVIRONMENTS 

-- REPLACE { NAME }, { HOSTNAME } WITH VALUES --

## DOCKER INFO 

### HOW TO CREATE A VOLUME

`docker volume create my-vol`

###### MOUNT VOLUME TO DOCKER RUN:
`docker run -d --platform linux/arm64 -v my-vol:/beanpi/cert`

###### COPY FILE TO MOUNTED VOLUME
`docker cp { FILE } { DOCKER ID }:{VOLUME PATH}`
e.g. `docker cp certificate.pfx 38aefe611b27:/var/lib/docker/volumes/my-vol/_data`

###### GET DOCKER ID
`docker ps`

###### GET VOLUME PATH
Inspect running container and copy mounted volume path.

### HOW TO ADD ENV VARIABLES
docker run -d --platform linux/arm64 --env-file { FILE } { CONTAINER }
e.g. docker run -d --platform linux/arm64 --env-file ./.env incendiarybean/beanpi


## KUBERNETE INFO

### CREATE SSL CERTIFICATES


###### GENERATE KEY & CERT

`openssl req -x509 -out { NAME }.crt -keyout { NAME }.key -newkey rsa:2048 -nodes -sha256   -subj '/CN={ HOSTNAME }' -extensions EXT -config <( \`
`printf "[dn]\nCN={ HOSTNAME }\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:{ HOSTNAME }\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")`

###### GENERATE PEM FROM CRT
`openssl x509 { NAME }.crt -out { NAME }.pem -outform PEM`

###### GENERATE PFX FROM CRT & KEY
`openssl pkcs12 -export -out certificate.pfx -inkey { NAME }.key -in { NAME }.crt`

### TRUSTING CERTIFICATES FOR SSL
1. Copy CRT from above steps to local PC.
2. Open Certificate Manager.
3. Open TRUSTED CA FOLDER.
4. Right click => All Tasks => Import => Select the CRT and accept.
5. CA is now trusted and pages using that cert will now be VALID.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
