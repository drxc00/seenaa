FROM node:20-alpine3.17 AS base

# Install dependencies only when needed
FROM base AS deps

# Required build tools for native modules
RUN apk add --no-cache libc6-compat openssl python3 make g++ \
    && ln -sf python3 /usr/bin/python

WORKDIR /app

COPY package.json package-lock.json ./
COPY src/db ./src/db
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/src/db ./src/db
COPY . .

# copy env file
COPY .env.prod .env


RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache netcat-openbsd

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy application files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy package files and ALL node_modules (including dev dependencies)
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy ALL Drizzle-related files
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/src/db ./src/db

# Copy env and startup script
COPY --from=builder /app/.env.prod .env
COPY --from=builder /app/start.sh ./
RUN chmod +x ./start.sh


# Ensure correct permissions for the nextjs user
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NETWORK="host"

# CMD ["node", "server.js"]
# since we want to perform migrations on container startup
CMD ["./start.sh"] 