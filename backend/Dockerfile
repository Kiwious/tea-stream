FROM node:24-bookworm-slim

WORKDIR /app

RUN apt-get update \
	&& apt-get install -y --no-install-recommends openssl ca-certificates \
	&& rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src/shared/utils ./src/shared/utils

# prisma generate (postinstall) only needs a syntactically valid URL
RUN POSTGRES_URI=postgresql://build:build@localhost:5432/build \
	yarn install --frozen-lockfile

COPY . .
# Node sizes its default heap from physical RAM, which is too small for tsc on a small VPS
RUN NODE_OPTIONS=--max-old-space-size=2048 yarn build

ENV NODE_ENV=production
EXPOSE 4000

CMD ["sh", "-c", "yarn db:deploy && node dist/src/main.js"]
