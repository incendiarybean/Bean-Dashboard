FROM node:current-slim

WORKDIR /beanpi
COPY . .
RUN yarn install --production
RUN yarn add react-scripts@4.0.1 -g --silent

COPY . ./

CMD ["yarn", "start"]

# # set working directory
# WORKDIR /app

# # install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent

# # add app
# COPY . ./

# # start app
# CMD ["npm", "start"]