FROM node:10.13.0

COPY . /home/node/app
WORKDIR /home/node/app/front-end
RUN [ "yarn", "install"]
RUN ["yarn", "prod"]
WORKDIR /home/node/app/
RUN ["npm", "install"]