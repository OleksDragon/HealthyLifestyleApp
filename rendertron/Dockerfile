FROM node:18-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libnspr4 \
    libnss3 \
    libxss1 \
    xdg-utils \
    libgbm-dev \
    libu2f-udev \
    libvulkan1 \
    libgdk-pixbuf2.0-0 \
    libcups2 \
    libxcomposite1 \
    libxrandr2 \
    libxkbcommon0 \
    libxshmfence1 \
    libexpat1 \
    libx11-xcb1 \
    libdbus-1-3 \
    libxext6 \
    libxfixes3 \
    chromium \
    curl \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

CMD ["npm", "run", "start"]