FROM node:22.17.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

RUN echo '#!/bin/bash\nif [ -f package.json ] && [ package.json -nt node_modules/.package-lock.json ]; then\n  echo "Package.json changed, reinstalling..."\n  npm install\n  touch node_modules/.package-lock.json\nfi\nexec "$@"' > /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["npm", "start", "--", "--host", "0.0.0.0"]