import { Kafka } from 'kafkajs';
import 'dotenv/config';

run();
async function run() {
    try {
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: [`localhost:9092`],            
        })

        const admin = kafka.admin();
        console.log("Connecting to kafka");
        await admin.connect();
        console.log("Connected to Kafka");
        await admin.createTopics({
            topics: [
                {
                    topic: "Product",
                    numPartitions: 2,
                }
            ]
        });
        console.log("Created Sucessfully");
        await admin.disconnect();
    } catch (ex) {
        console.error("Something bad happened", ex);
    } finally {
        process.exit();
    }
}