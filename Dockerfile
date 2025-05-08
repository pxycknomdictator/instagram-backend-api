# BUILDING STAGE
FROM node:22 AS builder

WORKDIR /build

COPY package*.json /build/
COPY pnpm-lock.yaml /build/

RUN npm install

COPY . /build/

RUN npm run build

# PRODUCTION STAGE
FROM node:22-slim AS production

WORKDIR /app

COPY --from=builder build/dist /app/dist
COPY --from=builder build/views /app/views
COPY --from=builder build/public /app/public
COPY --from=builder build/package.json /app/package.json
COPY --from=builder build/node_modules /app/node_modules

EXPOSE 9999

CMD [ "npm", "run", "docker:run" ]