const { randomUUID } = require('node:crypto')
const Kafka = require('kafkajs').Kafka

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['*******'],
    sasl: {
      mechanism: 'scram-sha-256',
      username: '********',
      password: '*******',
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
