# STAGE DEPENDENCIES
FROM node:18-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /.

COPY package.json package-lock.json ./
RUN npm install

# STAGE RUNNER
FROM node:18-alpine AS runner

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app

WORKDIR /home/app

COPY --chown=app:nodejs /.next ./.next
COPY --from=dependencies /node_modules ./node_modules
COPY --from=dependencies /package.json ./package.json
COPY . .

EXPOSE 3000

ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

CMD ["npm", "run", "dev"]