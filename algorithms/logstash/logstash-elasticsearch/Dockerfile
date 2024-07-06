ARG STACK_VERSION

FROM docker.elastic.co/logstash/logstash:${STACK_VERSION}

ENV POSTGRES_JAR_URL=https://jdbc.postgresql.org/download/postgresql-42.7.3.jar

RUN curl -L -o /usr/share/logstash/logstash-core/lib/jars/postgresql-42.7.3.jar $POSTGRES_JAR_URL

COPY ./logstash.conf /usr/share/logstash/pipeline/

COPY ./dynamic-template.json /usr/share/logstash/pipeline/dynamic-template.json

CMD ["logstash", "-f", "/usr/share/logstash/pipeline/logstash.conf"]