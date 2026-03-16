FROM --platform=$BUILDPLATFORM mcr.microsoft.com/playwright:v1.55.1-jammy AS builder
ENV NODE_ENV='production'
WORKDIR /app
RUN npm install -g pnpm \
    && chown -R pwuser:pwuser /app
USER pwuser
COPY package.json pnpm-lock.yaml /app/
RUN pnpm install --production false
COPY tsconfig.json tsconfig.build.json /app/
COPY src /app/src
RUN pnpm build


FROM mcr.microsoft.com/playwright:v1.55.1-jammy
ENV NODE_ENV='production'
ENV DOCKER=1
WORKDIR /app
RUN npm install -g pnpm \
    && chown -R pwuser:pwuser /app
USER pwuser
COPY --from=builder --chown=pwuser:pwuser /app/package.json /app/pnpm-lock.yaml /app/
RUN pnpm install --production && pnpm exec playwright install chromium
COPY --from=builder --chown=pwuser:pwuser /app/dist /app/dist
EXPOSE 3000
CMD ["node", "-r", "dotenv/config", "dist/main.js"]
