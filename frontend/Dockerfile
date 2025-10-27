FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Build-time переменные для React
ARG REACT_APP_API_URL
ARG REACT_APP_GOOGLE_CLIENT_ID

ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_GOOGLE_CLIENT_ID=$REACT_APP_GOOGLE_CLIENT_ID

RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/build ./build
RUN npm install -g serve
EXPOSE 80
CMD ["serve", "-s", "build", "-l", "80"]