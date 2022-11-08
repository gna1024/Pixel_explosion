window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 

    class Particle {
        constructor(effect){
            this.effect = effect;
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.size = 5;
            this.vx = Math.random() - 0.5;
            this.vy = Math.random() - 0.5;
        }
        draw(context){
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            this.x += this.vx;
            this.y += this.vy;
        }
    }

    class Effect {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image1');
            this.CenterX = this.width * 0.5;
            this.CenterY = this.height * 0.5;
            this.x = this.CenterX - this.image.width * 0.5;
            this.y = this.CenterY - this.image.height * 0.5;
        }
        init(){
            for(let i = 0; i < 1000; i++) {
                this.particlesArray.push(new Particle(this));
            }
        }
        draw(context){
            this.particlesArray.forEach(particle => particle.draw(context));
            context.drawImage(this.image, this.x, this.y)
        }
        update(){
            this.particlesArray.forEach(particle => particle.update())
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init();

    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }

    animate()
});