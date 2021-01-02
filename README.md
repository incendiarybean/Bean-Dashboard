# HOW TO SET UP DEV ENVIRONMENTS 

-- REPLACE { NAME }, { HOSTNAME } WITH VALUES --

Link to the [Docker](https://hub.docker.com/repository/docker/incendiarybean/beanpi)

## DOCKER INFO 

### HOW TO CREATE A VOLUME

```
docker volume create my-vol
```

###### MOUNT VOLUME TO DOCKER RUN:

```
docker run -d --platform linux/arm64 -v my-vol:/beanpi/cert
```

###### COPY FILE TO MOUNTED VOLUME
`docker cp { FILE } { DOCKER ID }:{VOLUME PATH}`
e.g. `docker cp certificate.pfx 38aefe611b27:/var/lib/docker/volumes/my-vol/_data`

###### GET DOCKER ID
`docker ps`

###### GET VOLUME PATH
Inspect running container and copy mounted volume path.

### HOW TO ADD ENV VARIABLES
```
docker run -d --platform linux/arm64 --env-file { FILE } { CONTAINER }
```
e.g. docker run -d --platform linux/arm64 --env-file ./.env incendiarybean/beanpi

## KUBERNETE INFO

### CREATE SSL CERTIFICATES

###### GENERATE KEY & CERT

```BASH
openssl req -x509 -out { NAME }.crt -keyout { NAME }.key -newkey rsa:2048 -nodes -sha256   -subj '/CN={ HOSTNAME }' -extensions EXT -config <( \
printf "[dn]\nCN={ HOSTNAME }\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:{ HOSTNAME }\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```

###### GENERATE PEM FROM CRT

```BASH
openssl x509 { NAME }.crt -out { NAME }.pem -outform PEM
```

###### GENERATE PFX FROM CRT & KEY

```BASH
openssl pkcs12 -export -out certificate.pfx -inkey { NAME }.key -in { NAME }.crt
```

### TRUSTING CERTIFICATES FOR SSL
1. Copy CRT from above steps to local PC.
2. Open Certificate Manager.
3. Open TRUSTED CA FOLDER.
4. Right click => All Tasks => Import => Select the CRT and accept.
5. CA is now trusted and pages using that cert will now be VALID.

### DEPLOYING TO KUBERNETES

###### CONFIG MAP

Create new Config Map in Config and Storage > Config Maps.

```JSON
{
	"GOOGLE_API_KEY": "{ KEYS }",
	"GOOGLE_CX": "{ KEYS }",
	"LATITUDE": "{ KEYS }",
	"LONGITUDE": "{ KEYS }",
	"MAC": "{ KEYS }",
	"MET_API_SECRET": "{ KEYS }",
	"MET_CLIENT_ID": "{ KEYS }",
	"MONGO_HOST": "{ KEYS }",
	"MONGO_PORT": "{ KEYS }",
	"PFX_KEY": "{ KEYS }",
	"REACT_APP_HOST": "{ KEYS }"
}
```

###### CREATE DEPLOYMENT

```YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: { NAME }
spec:
  replicas: 1
  selector:
    matchLabels:
      app: { NAME }
  template:
    metadata:
      labels:
        app: { NAME }
    spec:
      volumes:
      - name: { NAME }-secure
        secret:
          secretName: { PFX NAME }.pfx
      containers:
      - name: { NAME }
        image: incendiarybean/beanpi:latest
        ports:
        - containerPort: 8080
        volumeMounts:
        - name: secret-volume
          mountPath: "/{ NAME }/cert"
        env:
        - name: GOOGLE_API_KEY
          valueFrom:
            configMapKeyRef:
              name: config
              key: GOOGLE_API_KEY
        - name: GOOGLE_CX
          valueFrom:
            configMapKeyRef:
              name: config
              key: GOOGLE_CX
        - name: LATITUDE
          valueFrom:
            configMapKeyRef:
              name: config
              key: LATITUDE
        - name: LONGITUDE
          valueFrom:
            configMapKeyRef:
              name: config
              key: LONGITUDE
        - name: MAC
          valueFrom:
            configMapKeyRef:
              name: config
              key: MAC
        - name: MET_API_SECRET
          valueFrom:
            configMapKeyRef:
              name: config
              key: MET_API_SECRET
        - name: MET_CLIENT_ID
          valueFrom:
            configMapKeyRef:
              name: config
              key: MET_CLIENT_ID
        - name: MONGO_HOST
          valueFrom:
            configMapKeyRef:
              name: config
              key: MONGO_HOST
        - name: MONGO_PORT
          valueFrom:
            configMapKeyRef:
              name: config
              key: MONGO_PORT
        - name: PFX_KEY
          valueFrom:
            configMapKeyRef:
              name: config
              key: PFX_KEY
        - name: REACT_APP_HOST
          valueFrom:
            configMapKeyRef:
              name: config
              key: REACT_APP_HOST
              
```

###### CREATE LOAD BALANCED SERVICE

```YAML
apiVersion: v1
kind: Service
metadata:
  name: beanpi
spec:
  selector:
    app: beanpi
  ports:
    - port: 443
      targetPort: 8080
  type: LoadBalancer
  externalTrafficPolicy: Local
status:
  loadBalancer: {}
```

###### CREATE SECRET FOR STORING PFX
```BASH
microk8s kubectl create secret generic { NAME }-secure --from-file={ PFX NAME }.pfx={ PFX NAME }.pfx
```

# Getting Started with BeanPI

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
