FROM oven/bun:1.3.3 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM node:24-bookworm-slim AS builder
WORKDIR /app

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_WEBSOCKET_URL
ARG NEXT_PUBLIC_MEDIA_URL
ARG NEXT_PUBLIC_LIVEKIT_WS_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL \
	NEXT_PUBLIC_LIVEKIT_WS_URL=$NEXT_PUBLIC_LIVEKIT_WS_URL \
	NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL \
	NEXT_PUBLIC_WEBSOCKET_URL=$NEXT_PUBLIC_WEBSOCKET_URL \
	NEXT_PUBLIC_MEDIA_URL=$NEXT_PUBLIC_MEDIA_URL \
	NEXT_TELEMETRY_DISABLED=1

COPY --from=deps /app/node_modules ./node_modules
COPY . .
# graphql/generated/output.ts is committed, so codegen is skipped here
RUN NODE_OPTIONS=--max-old-space-size=2048 node node_modules/next/dist/bin/next build

FROM node:24-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
	NEXT_TELEMETRY_DISABLED=1 \
	PORT=3000 \
	HOSTNAME=0.0.0.0

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
