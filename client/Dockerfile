# Stage 1: Build
FROM node:22 AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application files
COPY . .

# Navigate to the client directory for the build
WORKDIR /app/client
RUN npm ci
RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]
