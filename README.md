# Requirements

## MetOffice API Keys
Use the following link to sign up to the MetOffice API.
[MetOffice API]https://www.metoffice.gov.uk/services/data
You will need to set up a new application, fill out all the details.
Write down the API key and Client ID.

(You will need to the longitude and latitude of your location later too)

## Google Search API Keys
Use the following link to sign up to the Google.
[Google API]https://developers.google.com/custom-search/v1/overview
Fill out all the details.
Write down the API key and CX.

## Kubernetes/MicroK8s (UBUNTU LATEST)
###### Install via BASH
```BASH
    sudo snap install micr0k8s --classic
```
###### Add user to Microk8s group
```Bash
    sudo usermod -a -G microk8s { USERNAME }
```

`(Logout and back in)`

###### Enable MicroK8s features
```BASH
    microk8s enable dns metallb ingress dashboard
```
`MetalLB will ask you to provide an IP range, do this on your own subnet e.g 192.168.1.`
`Use a range like 192.168.1.0-192.168.1.50`

###### Create a start_proxy.sh file
```Bash
    nano start_proxy.sh
```

###### Paste this into the file
```Bash
    {
            microk8s dashboard-proxy &
            echo "Success enabling dashboard proxy"
    } || {
            echo "There was an issue launching the proxy"
    }

    {
            iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 10443
            echo "Success routing 443 to 10443"
    } || {
            echo "There was an issue forwarding to port 10443"
    }
```

###### Mark file as executable
```Bash
    sudo chmod -x start_proxy.sh
```

###### Run file
```Bash
    sudo ./start_proxy.sh
```

###### If you don't know your Device's IP, use the below
```Bash
    ip r
```
###### Open your browser and access the Dashboard via { IP }:10443
1. Copy the pasted key output from start_proxy.sh and paste into login page.
2. Click the namespaces dropdown.
3. Choose kube-system
4. Click Services
5. Click dots next to kubernetes-dashboard
6. Find line type: ClusterIP
7. Replace ClusterIP with LoadBalancer
8. Wait for it to refresh with an External IP.

`You will now have access to the Dashboard at any time from https://{ EXTERNAL IP } (Without start_proxy.sh).`
`When deploying new configs, you can just click the plus in the top right and paste the config.`

###### Get login Key without start_proxy
1. Create a new file, e.g. kube-key.sh
2. Paste this:
```BASH
#! /bin/bash
token=$(microk8s kubectl -n kube-system get secret | grep default-token | cut -d " " -f1)
microk8s kubectl -n kube-system describe secret $token
```
3. Mark file as executable.
4. Run file, copy printed token.

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

Create new Config Map using the following

```YAML
apiVersion: v1
kind: ConfigMap
metadata:
  name: { NAME }-config
  namespace: default
data:
  PFX_KEY: "{ KEY }"
  GOOGLE_API_KEY: "{ KEY }"
  GOOGLE_CX: "{ KEY }"
  LATITUDE: "{ KEY }"
  LONGITUDE: "{ KEY }"
  MAC: "{ KEY }"
  MET_API_SECRET: "{ KEY }"
  MET_CLIENT_ID: "{ KEY }"
  MONGO_HOST: "{ KEY }"
  MONGO_PORT: "{ KEY }"
  REACT_APP_HOST: "{ KEY }"
```

###### CREATE DEPLOYMENT

Create new deployment using the following

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

Create new service using the following

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

Create new Secret using the following

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
