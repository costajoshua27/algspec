# Grab the base node image
FROM node:lts-alpine

# Change our working directory, and install packages
WORKDIR /app
ADD package*.json ./
RUN npm install

# Add the rest of the source files, set the port and serve requests once a container is ran
ADD . .
ENV PORT=8080
CMD npm run server