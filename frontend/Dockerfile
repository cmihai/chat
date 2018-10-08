FROM node
RUN npm install -g serve
USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package.json .
RUN npm install
COPY src ./src
COPY public ./public
RUN npm run-script build

FROM nginx
COPY --from=0 /home/node/app/build /usr/share/nginx/html
COPY conf.d /etc/nginx/conf.d
