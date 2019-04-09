FROM nginx:alpine
COPY ./dist /usr/share/nginx/html
COPY entrypoint.sh entrypoint.sh
CMD ["chmod", "+x", "entrypoint.sh"]
CMD ["/bin/sh", "entrypoint.sh"]
