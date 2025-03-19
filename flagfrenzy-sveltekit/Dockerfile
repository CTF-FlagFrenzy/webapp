FROM node:lts-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

RUN npm install chart.js
RUN npm install -D tailwindcss postcss autoprefixer
RUN npm install @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/svelte-fontawesome
RUN npx tailwindcss init -p
RUN npm run build || true
COPY . .
EXPOSE 80

CMD ["node", "build", "--", "--host", "0.0.0.0"]