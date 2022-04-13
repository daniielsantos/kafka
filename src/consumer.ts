import { Kafka } from 'kafkajs';
import 'dotenv/config';


run();
async function run() {
    try {
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: [`localhost:9092`],            
        })

        const consumer = kafka.consumer({ groupId: "my-group" });
        console.log("Connecting to producer");
        await consumer.connect();
        console.log("Connected to producer");

        await consumer.subscribe({
            topic: "Product",
            fromBeginning: true
        })

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Received message: ${message.value} from topic: ${topic} in partition: ${partition}`);
            }            
        })
    } catch (ex) {
        console.error("Something bad happened", ex);
    }
}