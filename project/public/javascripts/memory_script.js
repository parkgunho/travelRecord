$(window).bind('load', function () {

    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();

    const raf = function (entry) {
        window.requestAnimFrame(entry);
    };
    const caf = function (entry) {
        window.cancelAnimationFrame(entry);
    };
    const random = function (min, max) {
        max = max + 1;
        return Math.floor(Math.random() * (max - min) + min);
    }
    const min = function (arr) {
        return Math.min.apply(Math, arr);
    }
    const max = function (arr) {
        return Math.max.apply(Math, arr);
    }
    const cl = function (entry) {
        console.log(entry);
    }
    var container = $('#container'),
        c = document.getElementById('c'),
        cx = c.getContext('2d'),
        cbg = {
            rgb: '0,0,0',
            a: 1
        },
        Particle,
        particles = {},
        particleNum = 5,
        particleIndex = 0,
        mouseX = null,
        mouseY = null,
        travelSpeed = 0.25,
        opacity = 0,
        particlesRendered = false;

    TweenMax.set(container, {
        opacity: 1
    });

    c.width = $('#c').outerWidth();
    c.height = $('#c').outerHeight();

    var w = c.width,
        h = c.height;

    cx.fillStyle = `rgba(${cbg.rgb},${cbg.a})`;
    cx.fillRect(0, 0, w, h);


    function drawCanvas() {

        Particle = function () {
            this.w = random(1, 2);
            this.h = this.w;
            this.r = this.w / 2;
            this.xInit = random(0, w - (this.r * 2));
            this.x = this.xInit;
            this.yInit = random(0, h - this.r * 2);
            this.y = this.yInit;

            this.travelSpeed = travelSpeed;

            this.hue = random(0,360);
            this.saturation = 0;
            this.light = 100;
            this.opacity = opacity;
            this.opacityRate = random(1, 10) * 0.001;
            this.opacityMin = 0;
            this.opacityMax = 1;
            particles[particleIndex] = this;
            this.id = particleIndex;
            particleIndex++;
        }

        Particle.prototype.draw = function () {

            cx.beginPath();
            cx.fillStyle = `hsla(${this.hue},${this.saturation}%,${this.light}%,${this.opacity})`;
            cx.arc(this.x,this.y,this.r,0,Math.PI * 2);
            cx.fill();

            this.opacity+=this.opacityRate;

            if (this.x > w / 2) {
                this.x+=(this.x - w / 2) * this.travelSpeed * 0.01;
            } else if (this.x < w / 2) {
                this.x-=(w / 2 - this.x) * this.travelSpeed * 0.01;
            } else {
                delete particles[this.id];
            }

            if (this.y > h / 2) {
                this.y+=(this.y - h / 2) * this.travelSpeed * 0.01;
            } else if (this.y < h / 2) {
                this.y-=(h / 2 - this.y) * this.travelSpeed * 0.01;
            } else {
                delete particles[this.id];
            }

            if (this.opacity>this.opacityMax) {
                this.opacityRate*=-1;
                this.opacity = this.opacityMax;
            }
            if (this.opacity < this.opacityMin || (this.x < 0 || this.x > w) || (this.y < 0 || this.y > h)) {
                delete particles[this.id];
            }
        }

        function render() {
            $(window).resize(function () {
                c.width = $('#c').outerWidth();
                c.height = $('#c').outerHeight();
                w = c.width;
                h = c.height;
            });
            cx.globalCompositeOperation = 'source-over';
            cx.fillStyle = `rgba(${cbg.rgb},${cbg.a})`;
            cx.fillRect(0, 0, w, h);
            if (!particlesRendered) {
//                particlesRendered = true;
                for (var i = 0; i < particleNum; i++) {
                    new Particle();
                }
            }

            cx.globalCompositeOperation = 'lighter';

            for (var i in particles) {
                particles[i].draw();
            }
//            opacity+=0.01;

            raf(render);
        }

        raf(render);

    }

    drawCanvas();
});
