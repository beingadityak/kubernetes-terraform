FROM node:10.15
WORKDIR '/app'
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
