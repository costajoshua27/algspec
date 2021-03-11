# Grab the base node image
FROM node:lts-alpine

# Set the necessary environment variables
ARG DB_URI
ARG SESSION_SECRET
ENV DB_URI=${DB_URI}
ENV SESSION_SECRET=${SESSION_SECRET}

# Change our working directory, and install packages
WORKDIR /usr/src/app/api
COPY package*.json ./
RUN npm install

# Add the rest of the source files, set the port and serve requests once a container is ran
ENV PORT=8080
EXPOSE 8080
CMD npm run serve
