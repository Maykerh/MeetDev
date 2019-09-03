import Bee from 'bee-queue';
import SubscriptionMail from '../app/jobs/SubscriptionMail';
import redisConfig from '../config/redis';

const jobs = [SubscriptionMail];

class Queue {
    constructor() {
        this.queues = {};

        this.init();
    }

    init() {
        jobs.forEach(({ key, handler }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: redisConfig
                }),
                handler
            };
        });
    }

    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    }

    processQueue() {
        jobs.forEach(job => {
            const { bee, handler } = this.queues[job.key];

            bee.on('failed', this.handleFailure).process(handler);
        });
    }

    handleFailure(job, err) {
        console.log(`Queue ${job.queue.name}: FAILED`, err);
    }
}

export default new Queue();
