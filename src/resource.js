class Resources {
    constructor() {
        // List of resources to load
        this.toLoad = {
            sky: "/sprites/sky.png",
            ground: "/sprites/ground.png",
            player: "/sprites/player.png",
            shadow: "/sprites/shadow.png",
        };

        //bucket to store loaded resources
        this.images = {};

        // Load all resources
        Object.keys(this.toLoad).forEach(key => {
            const img = new Image();
            img.src = this.toLoad[key];
            this.images[key] = {
                image: img,
                isLoaded: false
            }

            img.onload = () => {
                this.images[key].isLoaded = true;
            }
        })
    }
}

// Create one instance of the Resources class
export const resources = new Resources();