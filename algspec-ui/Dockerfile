FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app/algspec-ui
COPY package*.json ./
RUN npm install

# Set the necessary environment variables
# ARG BASE_API_URL
# ENV BASE_API_URL=${BASE_API_URL}

EXPOSE 8081

CMD npm run serve
