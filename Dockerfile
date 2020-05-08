FROM node:12-slim

LABEL maintainer="Jason Raimondi <jason@raimondi.us>"

ENV DUMB_INIT_VERSION=1.2.2 \
    PUPPETEER_VERSION=3.0.4 \
    LANG="C.UTF-8"

USER root

RUN apt-get update \
    && apt-get install -yq \
        gconf-service \
        libasound2 \
        libatk1.0-0 \
        libc6 \
        libcairo2 \
        libcups2 \
        libdbus-1-3 \
        libexpat1 \
        libfontconfig1 \
        libgcc1 \
        libgconf-2-4 \
        libgdk-pixbuf2.0-0 \
        libglib2.0-0 \
        libgtk-3-0 \
        libnspr4 \
        libpango-1.0-0 \
        libpangocairo-1.0-0 \
        libstdc++6 \
        libx11-6 \
        libx11-xcb1 \
        libxcb1 \
        libxcomposite1 \
        libxcursor1 \
        libxdamage1 \
        libxext6 \
        libxfixes3 \
        libxi6 \
        libxrandr2 \
        libxrender1 \
        libxss1 \
        libxtst6 \
        fonts-ipafont-gothic \
        fonts-wqy-zenhei \
        fonts-thai-tlwg \
        fonts-kacst \
        ttf-freefont \
        ca-certificates \
        fonts-liberation \
        libappindicator1 \
        libnss3 \
        lsb-release \
        xdg-utils \
        wget \
    && ( \
        wget https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64.deb \
            && dpkg -i dumb-init_*.deb \
            && rm -f dumb-init_*.deb \
    ) \
    && ( \
        yarn global add puppeteer@${PUPPETEER_VERSION} \
            && yarn cache clean \
            && groupadd -r pptruser \
            && useradd -r -g pptruser -G audio,video pptruser \
            && mkdir -p /app \
            && mkdir -p /home/pptruser/Downloads \
            && chown -R pptruser:pptruser /home/pptruser \
            && chown -R pptruser:pptruser /app \
    ) \
    && apt-get clean \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

USER pptruser

WORKDIR /app

COPY --chown=pptruser:pptruser src /app/src
COPY --chown=pptruser:pptruser package.json /app/
COPY --chown=pptruser:pptruser package-lock.json /app/
COPY --chown=pptruser:pptruser tsconfig.json /app/
COPY --chown=pptruser:pptruser tslint.json /app/

RUN npm install -q --no-color --no-progress \
    && npm run build \
    && npm prune --production \
    && chown -R pptruser:pptruser /app

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

CMD npm run serve
