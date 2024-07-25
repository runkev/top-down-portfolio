import { Vector2 } from "./vector2.js";

export class Sprite {
    constructor({
        resource, //img to draw
        frameSize, //size of the crop of the image
        hFrames, // how sprite is arranged horizontally
        vFrames, // how sprite is arranged vertically
        frame, // frame to show
        scale, // size of image
        position, //where to draw image
        animations,
    }) {
        this.resource = resource;
        this.frameSize = frameSize ?? new Vector2(16, 16);
        this.hFrames = hFrames ?? 1;
        this.vFrames = vFrames ?? 1;
        this.frame = frame ?? 0;
        this.frameMap = new Map();
        this.scale = scale ?? 1;
        this.position = position ?? new Vector2(0, 0);
        this.animations = animations ?? null;
        this.buildFrameMap();
    }

    buildFrameMap() {
        let frameCount = 0;
        for (let i = 0; i < this.vFrames; i++) {
            for (let j = 0; j < this.hFrames; j++) {
                this.frameMap.set(
                    frameCount,
                    new Vector2(j * this.frameSize.x, i * this.frameSize.y)
                );
                frameCount++;
            }
        }
    }

    step(delta) {
        if (!this.animations) return;

        this.animations.step(delta);
        this.frame = this.animations.frame;
    }

    drawImage(ctx, x, y) {
        if (!this.resource.isLoaded) return;

        // find correct sprite frame
        let frameX = 0;
        let frameY = 0;
        const frame = this.frameMap.get(this.frame);
        if (frame) {
            frameX = frame.x;
            frameY = frame.y;
        }

        const frameSizeX = this.frameSize.x;
        const frameSizeY = this.frameSize.y;

        ctx.drawImage(
            this.resource.image,
            frameX,
            frameY,
            frameSizeX,
            frameSizeY,
            x,
            y,
            frameSizeX * this.scale,
            frameSizeY * this.scale
        );
    }
}
