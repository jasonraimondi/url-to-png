FROM alekzonder/puppeteer

LABEL maintainer="Jason Raimondi <jason@raimondi.us>"

USER root

WORKDIR /app

ADD src /app/src
ADD package.json /app/
ADD package-lock.json /app/
ADD tsconfig.json /app/
ADD tslint.json /app/

RUN npm install -q --no-color --no-progress \
    && npm run build \
    && npm prune --production \
    && chown -R pptruser:pptruser /app

USER pptruser

EXPOSE 3000

CMD npm run serve
