FROM node:18-alpine AS base

ENV NODE_ENV production
LABEL maintainer "yrobot"
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# deps-dev layer
FROM base AS deps-dev
WORKDIR /app
COPY package.json yarn.lock .
RUN yarn install --production=false

# deps-pro layer
FROM base AS deps-pro
WORKDIR /app
COPY package.json yarn.lock .
RUN yarn install --production=true

# build layer
FROM base AS builder
WORKDIR /app
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .
RUN yarn prisma migrate dev --name INIT_DB
RUN yarn build
RUN rm -rf node_modules data

# runner layer
FROM base AS runner
WORKDIR /app
COPY --from=builder /app .
COPY --from=deps-pro /app/node_modules ./node_modules
RUN yarn prisma generate

EXPOSE 3000
CMD ["yarn", "start"]
