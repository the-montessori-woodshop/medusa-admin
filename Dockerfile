FROM node:16.13.0 as builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install && yarn build

# Create a small webserver
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /usr/src/app/public .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]