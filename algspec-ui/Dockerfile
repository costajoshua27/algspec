FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx_config/vue_router.conf /etc/nginx/conf.d/default.conf

# Set the necessary environment variables
# ARG BASE_API_URL
# ENV BASE_API_URL=${BASE_API_URL}

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]