# Dockerfile for 810.one Next.js App -> Google Cloud Run
FROM node:20-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# We can inject NEXT_PUBLIC env vars here if needed for build
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
# Add default port for Cloud Run
ENV PORT 8080 
EXPOSE 8080

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Cloud Run invokes this directly
CMD ["node", "server.js"]
