# Use the standard Nginx image from Docker Hub
FROM nginx:alpine
# The Dockerfile's author

COPY nginx.conf /etc/nginx/nginx.conf
# Copy custom configuration file from the current directory
# COPY /nginx/nginx.conf /etc/nginx/nginx.conf
# the next line is how the front end is stored on nginx.
# WORKDIR /usr/share/nginx/html
## Remove default nginx website
RUN rm -rf /usr/share/nginx/htm

COPY /dist/ /usr/share/nginx/html
# Port 8080 of the container will be exposed and then mapped to port
# 80 443 of our host machine via Compose. This way we'll be able to
# access the server via localhost:8080 on our host.
EXPOSE 80 443

# Start Nginx when the container has provisioned.
CMD ["nginx", "-g", "daemon off;"]