FROM caddy:2.11.9-alpine

# Copy config and site
COPY Caddyfile /etc/caddy/Caddyfile
COPY . /srv

WORKDIR /srv

# Railway injects $PORT
ENV PORT=8080
EXPOSE 8080

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
