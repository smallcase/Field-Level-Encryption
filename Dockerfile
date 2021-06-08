FROM node:12

# Copy Repo
COPY . .
RUN npm ci
EXPOSE 8900
