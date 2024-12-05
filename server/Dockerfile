# Stage 1: Install dependencies
FROM node:22 AS builder

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the application source code
COPY . .

# Stage 2: Run
FROM node:22-alpine

WORKDIR /app

# Copy all files from the builder stage
COPY --from=builder /app ./

# Install production dependencies only
RUN npm install --production

# Expose the port your application runs on (e.g., 5000)
EXPOSE 5000

# Command to start the server
CMD ["node", "index.js"]
