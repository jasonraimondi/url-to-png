FROM alekzonder/puppeteer

USER root

ADD app.tgz /app

WORKDIR /app

RUN npm install -q --no-color --no-progress \
    && npm run build \
    && npm prune --production \
    && chown -R pptruser:pptruser /app

USER pptruser

EXPOSE 3000

CMD npm run serve
