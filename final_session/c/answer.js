class Robot {
    successCount = 0;
    failedCount = 0;
    tasks = [];
    timeSpent = 0;
    isRunning = false;

    constructor(id, manager) {
        this.id = id;
        this.manager = manager;
    }

    run(task) {
        this.isRunning = true;
        const startTimer = (new Date()).getTime();
        this.tasks.push(task.id);

        task.job()
            .then((success) => {
                this.successCount += 1;
            })
            .catch((reject) => {
                this.failedCount += 1;
            })
            .finally(() => {
                const endTimer = (new Date()).getTime();
                this.isRunning = false;
                this.timeSpent += endTimer - startTimer;
                this.manager.taskFinished(this, task);
            });

    }

    getReport() {
        return {
            successCount: this.successCount,
            failedCount: this.failedCount,
            tasks: this.tasks,
            timeSpent: this.timeSpent,
        };
    }
}

class TaskManager {
    isRunning = false;
    robots = [];
    tasks = [];
    taskCount = 0;
    finishedCount = 0;
    resolve;

    constructor(robotsCount) {
        this.robots = Array(robotsCount).fill(null).map((x, index) => new Robot(index, this));
    }

    // Добавление задачи в очередь
    addToQueue(task) {
        if (!this.isRunning) {
            this.tasks.push(task);
        }
    }

    taskFinished(robot, task) {
        if (this.tasks.length) {
            robot.run(this.tasks.shift());
        }

        this.finishedCount += 1;
        this.isRunning = false;

        if (this.finishedCount === this.taskCount) {
            this.resolve(this.robots.map(robot => robot.getReport()));
        }
    }

    getFreeRobot() {
        return this.robots.find((robot) => !robot.isRunning);
    }

    // Promise, который запускает процесс выполнения задач и выдаёт список отчётов
    run() {
        this.isRunning = true;
        this.taskCount = this.tasks.length;

        this.tasks.sort((a, b) => {
            return a.priority <= b.priority ? 1 : -1;
        });

        while (this.getFreeRobot() && this.tasks.length) {
            this.getFreeRobot().run(this.tasks.shift());
        }

        return new Promise((resolve => {
            this.resolve = resolve;
        }))
    }
}

module.exports = {TaskManager};
