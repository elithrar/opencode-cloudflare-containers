# Use an official lightweight Node.js image
FROM node:20-alpine

# Install opencode CLI globally
RUN npm install -g opencode

# Set working directory
WORKDIR /app

# Expose default port used by opencode serve (default: 3000)
EXPOSE 4096

# Run opencode serve as the container entrypoint
ENTRYPOINT ["opencode", "serve"]
