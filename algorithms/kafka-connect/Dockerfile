FROM confluentinc/cp-kafka-connect:latest


ENV NEO4J_JAR_URL=https://github.com/neo4j-contrib/neo4j-streams/releases/download/5.0.5/neo4j-kafka-connect-neo4j-5.0.5.zip
ENV MONGO_JAR_URL=https://github.com/mongodb/mongo-kafka/releases/download/r1.13.0/mongodb-kafka-connect-mongodb-1.13.0.zip


RUN curl -L -o /usr/share/java/neo4j-kafka-connect-neo4j-5.0.5.zip $NEO4J_JAR_URL
RUN curl -L -o /usr/share/java/mongodb-kafka-connect-mongodb-1.13.0.zip $MONGO_JAR_URL

COPY neo4j-sink.json /etc/kafka-connect/neo4j-sink.json
COPY mongo-source.json /etc/kafka-connect/mongo-source.json

RUN python -m zipfile -e /usr/share/java/neo4j-kafka-connect-neo4j-5.0.5.zip /usr/share/java/neo4j-kafka-connect-neo4j-5.0.5
RUN python -m zipfile -e /usr/share/java/mongodb-kafka-connect-mongodb-1.13.0.zip /usr/share/java/mongodb-kafka-connect-mongodb-1.13.0