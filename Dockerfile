FROM node:16-alpine

RUN apk update
RUN apk add git
RUN apk add xsel

WORKDIR /app
COPY . /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install react-scripts -g --silent
RUN npm install serve -g --silent
RUN npm install axios -g --silent
RUN npm install semantic-ui-react -g --silent
RUN npm install --silent

RUN npm run build

# TESTING
RUN printenv

EXPOSE 3000
CMD ["serve", "-s", "build"]