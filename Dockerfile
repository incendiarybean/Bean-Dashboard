#BUILD
FROM node:current-slim as build

WORKDIR /bean-dashboard
ENV PATH /bean-dashboard/node_modules/.bin:$PATH
ARG REACT_APP_HOST=localhost
ENV REACT_APP_HOST ${REACT_APP_HOST}

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./run.sh ./

RUN yarn install --silent
RUN yarn add react-scripts@4.0.1 -g --silent

COPY . ./
RUN yarn build --production

#PROD
FROM node:current-slim
WORKDIR /bean-dashboard

COPY --from=build bean-dashboard/run.sh /bean-dashboard/run.sh
COPY --from=build bean-dashboard/package.json /bean-dashboard/package.json
COPY --from=build bean-dashboard/yarn.lock /bean-dashboard/yarn.lock
COPY --from=build bean-dashboard/build /bean-dashboard/build
COPY --from=build bean-dashboard/server /bean-dashboard/server

CMD ["./run.sh"]
