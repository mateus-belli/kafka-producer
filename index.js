const { randomUUID } = require('node:crypto')
const Kafka = require('kafkajs').Kafka

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['topical-ray-12627-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'dG9waWNhbC1yYXktMTI2MjckOzbNM21U5B5eaw8lELsy3n2AAaAjubj8x2mF2zk',
      password: '8021921c24644cf292b1f9b5c75bd734',
    },
    ssl: true,
  })

  const producer = kafka.producer()
  await producer.connect()
  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Nova solicitação de amizade',
          category: 'social',
          recipientId: randomUUID()
        })
      }
    ]
  })
  await producer.disconnect()
}

bootstrap()