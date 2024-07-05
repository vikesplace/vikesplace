FROM mongo:5.0

WORKDIR /usr/src/app

COPY init-replica-set.js /docker-entrypoint-initdb.d/
COPY entrypoint.sh /usr/src/app/
COPY mongod.conf /etc/
COPY init-mongo.js /docker-entrypoint-initdb.d/

EXPOSE 27017

RUN sed -i 's/\r$//' /usr/src/app/entrypoint.sh  && \
    chmod +x /usr/src/app/entrypoint.sh

#CMD ["mongod", "--config", "/etc/mongod.conf"]
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]