touch /usr/share/nginx/html/config.json

echo "{\"url\": \"${API_URL}\"}" > /usr/share/nginx/html/config.json

nginx -g "daemon off;"
