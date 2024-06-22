disintegrate.init();
if (document.querySelector('[data-dis-type="self-contained"]')) {
  // If you do anything with dises, you need to wait for them to
  // all finish loading
  window.addEventListener("disesLoaded", function () {
    disintegrate.dises.forEach(function (disObj) {
      if (disObj.elem.dataset.disType === "self-contained") {
        disObj.container.addEventListener("click", function (e) {
          disObj.container.classList.add("animate");
        });
        disObj.elem.addEventListener("disComplete", function (e) {
          disObj.container.classList.remove("animate");
          // Hack to reset the CSS animations
          // see https://stackoverflow.com/a/6303311/2065702 for more info
          resetCSSAnimation(disObj.container);
          resetCSSAnimation(disObj.elem);
        });
        function resetCSSAnimation(el) {
          el.style.animation = "none";
          setTimeout(function () {
            el.style.animation = "";
          }, 10);
        }
      }
    });

    var ExplodeToRightParticle = function () {
      this.name = "ExplodeToRightParticle";
      this.animationDuration = 500; // in ms

      this.speed = {
        x: 0 + Math.random() * 6,
        y: -1.5 + Math.random() * 3,
      };
      this.radius = 0 + Math.random() * 5;
      this.life = 30 + Math.random() * 10;
      this.remainingLife = this.life;

      this.firstRun = true;
      this.draw = (ctx) => {
        if (this.firstRun) {
          this.firstRun = false;
          this.startX += Math.random() * 20;
        }

        if (this.remainingLife > 0 && this.radius > 0) {
          ctx.beginPath();
          ctx.arc(this.startX, this.startY, this.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(" + this.rgbArray[0] + "," + this.rgbArray[1] + "," + this.rgbArray[2] + ", 1)";
          ctx.fill();
          this.remainingLife--;
          this.radius -= 0.1;
          this.startX += this.speed.x;
          this.startY += this.speed.y;
        }
      };
    };
    disintegrate.addParticleType(ExplodeToRightParticle);

    function genNormalizedVal() {
      return (Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random() - 3) / 3;
    }

    const EaseIn = (power) => (t) => Math.pow(t, power),
      EaseOut = (power) => (t) => 1 - Math.abs(Math.pow(t - 1, power)),
      EaseInOut = (power) => (t) => t < 0.5 ? EaseIn(power)(t * 2) / 2 : EaseOut(power)(t * 2 - 1) / 2 + 0.5;
    var HollowCircles = function () {
      this.name = "HollowCircles";
      this.animationDuration = 1000; // in ms

      this.widthScaler = Math.round(50 * genNormalizedVal()); // Normalized val between -50 and 50
      this.numWaves = (genNormalizedVal() + 1 / 2) * 2 + 1;
      this.xPosFunc = (t) => {
        return Math.sin(this.numWaves * Math.PI * t);
      };

      this.heightScaler = Math.round((65 * (genNormalizedVal() + 1)) / 2) + 10; // Normalized val between 10 and 75
      this.yPosFunc = (t) => {
        return t;
      };

      this.startRadius = 5 + Math.random() * 7;
      this.sizeFunc = (t) => {
        return 1 - t;
      };

      this.opacityFactor = Math.round(((genNormalizedVal() + 1) / 2) * 3 + 1);
      this.opacityFunc = (t) => {
        return 1 - EaseInOut(this.opacityFactor)(t);
      };

      this.firstRun = true;

      this.draw = (ctx, percent) => {
        percent = percent >= 1 ? 1 : percent;

        if (this.firstRun) {
          this.firstRun = false;
          this.startY += Math.random() * 20;
        }

        let currX = this.startX + this.xPosFunc(percent) * this.widthScaler;
        let currY = this.startY - this.yPosFunc(percent) * this.heightScaler;
        let radius = this.startRadius * this.sizeFunc(percent);
        let currOpacity = this.opacityFunc(percent);

        ctx.beginPath();
        ctx.strokeStyle = "rgba(" + this.rgbArray[0] + "," + this.rgbArray[1] + "," + this.rgbArray[2] + "," + currOpacity + ")";
        ctx.arc(currX, currY, radius, 0, Math.PI * 2);
        ctx.stroke();
      };
    };
    disintegrate.addParticleType(HollowCircles);
  });
}
