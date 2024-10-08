# Use a base image with Node.js
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port that your application will run on
EXPOSE 80

# Command to run your application
CMD ["node", "server.js"]
