FROM node:18

USER node
WORKDIR /home/node/app

COPY package.json package-lock.json ./
RUN npm ci

USER root
RUN npx playwright install --with-deps chromium

COPY src ./src
COPY playwright.config.ts . 

ENTRYPOINT [ "/bin/bash" ]
#ENTRYPOINT [ "npx", "playwright", "test" ]

