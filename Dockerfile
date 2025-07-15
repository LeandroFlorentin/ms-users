FROM node:22.16.0-alpine AS dev-dependencies
WORKDIR /app
COPY package.json ./
RUN npm install --legacy-peer-deps

FROM node:22.16.0-alpine AS build-application
WORKDIR /app
COPY --from=dev-dependencies /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22.16.0-alpine AS prod-dependencies
WORKDIR /app
COPY package.json ./package.json
RUN npm install --production


FROM node:22.16.0-alpine AS start-application
WORKDIR /app
EXPOSE 3001
COPY --from=build-application /app/dist ./dist
COPY package.json ./package.json
COPY --from=prod-dependencies /app/node_modules ./node_modules
CMD ["npm", "start"]