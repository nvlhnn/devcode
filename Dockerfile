FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . /app
# --no-cache: download package index on-the-fly, no need to cleanup afterwards
# --virtual: bundle packages, remove whole bundle at once, when done
CMD [ "node", "index.js"]
EXPOSE 80