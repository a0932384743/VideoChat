FROM node:12.18.4-stretch-slim as build
LABEL maintainer="devops@onix-systems.com"
WORKDIR /app
COPY package*.json ./
RUN npm install -g @quasar/cli
RUN npm install
COPY ./ ./
RUN quasar build

FROM nginx:1.19 as prod
COPY --from=build /app/dist/spa /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]