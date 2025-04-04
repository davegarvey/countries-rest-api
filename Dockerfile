FROM node:18-alpine

WORKDIR /app

COPY . /app

# Install all dependencies, including dev dependencies
RUN npm install

EXPOSE 4100

# Run the app
CMD ["npm", "run", "start"]
