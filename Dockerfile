FROM node:20-slim
RUN npm install -g opencode-ai
# Debug: show where npm puts things
RUN which opencode
WORKDIR /app
EXPOSE 4096
ENTRYPOINT ["opencode"]
CMD ["serve", "--port", "4096", "--hostname", "0.0.0.0"]
