FROM alekzonder/puppeteer

LABEL maintainer="Jason Raimondi <jason@raimondi.us>"

ENV DUMB_INIT_VERSION=1.2.2

USER root

ADD app.tgz /app
ADD https://github.com/Yelp/dumb-init/releases/download/v${DUMB_INIT_VERSION}/dumb-init_${DUMB_INIT_VERSION}_amd64 /usr/local/bin/dumb-init

WORKDIR /app

RUN npm install -q --no-color --no-progress \
    && npm run build \
    && npm prune --production \
    && chown -R pptruser:pptruser /app

RUN chmod +x /usr/local/bin/dumb-init

USER pptruser

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]

CMD npm run serve
