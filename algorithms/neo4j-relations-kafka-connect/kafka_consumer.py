from confluent_kafka import Consumer, KafkaException
import json
from neo4j_api import add_relation

# Kafka consumer setup
consumer = Consumer({
    'bootstrap.servers': 'kafka:9092',
    'group.id': 'neo4j-sink-user-activities',  # replace with your group id
    'auto.offset.reset': 'earliest'
})

consumer.subscribe(['user.vikesplace.user_activity.activities'])

# Function to pretty print JSON
def pretty_print_json(data):
    parsed_json = json.loads(data)
    print(json.dumps(parsed_json, indent=4, sort_keys=True))

# Consume messages from the Kafka topic
try:
    while True:
        msg = consumer.poll(timeout=1.0)
        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                raise KafkaException(msg.error())
        event_data = str(msg.value().decode('utf-8'))
        message_dict = dict(json.loads(str(json.loads(event_data))))
        print(f"Consumed message: {event_data}")
        pretty_print_json(event_data)
        for listing in message_dict['fullDocument']['listings']:
            add_relation(message_dict['fullDocument']['_id'], listing['listing_id'])
except KeyboardInterrupt:
    pass
finally:
    consumer.close()

