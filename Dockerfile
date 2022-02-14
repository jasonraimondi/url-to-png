FROM mcr.microsoft.com/playwright:focal as baserepo
ENV DUMB_INIT_VERSION=1.2.5 \
    NODE_ENV='production'
WORKDIR /app
RUN npm install -g pnpm \
    && chown -R pwuser:pwuser /app


FROM baserepo as builder
WORKDIR /
RUN apt-get update \
    && apt-get install -y wget \
    && wget https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64.deb
USER pwuser
WORKDIR /app
COPY package* /app
RUN pnpm install --production false
COPY tsconfig.json /app/
COPY src /app/src
RUN pnpm build


FROM baserepo
ENV DOCKER=1
COPY --from=builder /dumb-init_*.deb /
RUN dpkg -i /dumb-init_*.deb \
    && rm -f /dumb-init_*.deb
USER pwuser
COPY --from=builder --chown=pwuser:pwuser /app/package* /app/
RUN pnpm install --production
COPY --from=builder --chown=pwuser:pwuser /app/dist /app/dist
EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD node -r dotenv/config dist/main.js
