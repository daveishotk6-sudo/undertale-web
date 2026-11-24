FROM caddy:2.11.9-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY . /srv

WORKDIR /srv

# Railway sets PORT at runtime – do not hardcode it
EXPOSE 8080

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
