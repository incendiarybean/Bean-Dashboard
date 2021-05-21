FROM arm64v8/node:current-slim

WORKDIR /beanpi
COPY . .
RUN yarn install --production
RUN yarn add react-scripts@4.0.1 -g --silent

COPY . ./

CMD ["yarn", "start"]
