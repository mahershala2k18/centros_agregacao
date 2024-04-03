#docker file for my NextJS apps 

# Step 1: Specify a base image
FROM node:18-alpine

# Step 2: set up the app working directory
WORKDIR ./home/next-app


#Step 3 track for changes on the dependency tree
COPY package*.json ./

# Step 4: install dependencies
RUN apk update
RUN apk upgrade
RUN apk add bash
RUN npm install -g npm@latest
RUN npm install

#Step 5: Copy the applications  files
COPY ./ ./

#Step 6: build the app for production
RUN npm run build


#Step 7 : Run the aplication after it has build
CMD ["npm", "run", "start"]



