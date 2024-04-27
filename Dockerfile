FROM --platform=linux/amd64 node:lts

COPY . ./var/www

WORKDIR /var/www

RUN npm install

ENV PORT 3000

CMD ["npm", "start"] 