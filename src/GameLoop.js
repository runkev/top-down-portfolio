export class GameLoop {
    constructor(update, render) {

        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000 / 60; // 60 fps

        this.update = update;
        this.render = render;

        this.rafId = null; //request animation frame id
        this.isRunning = false;
    }

    mainLoop = (timestamp) => {
        if (!this.isRunning) return;

        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        // accumulate all time since last frame
        this.accumulatedTime += deltaTime;

        // fixed time step updates
        // if there's enough accumulated to run one or more fixed updates, run them
        while (this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep); // pass fixed time step to update
            this.accumulatedTime -= this.timeStep;
        }

        this.render();

        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }

    stop() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}