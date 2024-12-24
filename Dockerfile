# Stage 1: Build the application
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Set environment variables before the build stage
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=${NEXT_PUBLIC_BASE_URL}

ARG NEXT_PUBLIC_SECRET_KEY_LOCAL
ENV NEXT_PUBLIC_SECRET_KEY_LOCAL=${NEXT_PUBLIC_SECRET_KEY_LOCAL}

# Build the Next.js application
RUN yarn build

# Stage 2: Serve the application
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app ./

# Install production dependencies only
RUN yarn install --production --frozen-lockfile

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]
