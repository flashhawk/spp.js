![spp.js logo](https://raw.github.com/flashhawk/spp.js/dev/logo.png)
======
### Welcome Spp.js
Spp.js is a sample physics particle system engine for javascript.

### Feature

* Code less, simple structure.
* Based on classical Newtonian mechanics.
* Make your own custom forces or particles
* Easy to make interactive programs
* Open source!

### Getting Started
```
var ps=new SPP.ParticleSystem();
var particle=ps.createParticle(SPP.Particle);
particle.life=3;
particle.position.x=50;
particle.position.y=60;
particle.addForce("someForceName",someForce);
particle.onUpdate=someUpdateHander;
particle.addEventListener("dead",deadHandler);
animate();

function someUpdateHander()
{
        ...
};
function deadHandler(event)
{
        ...
};

function animate()
{
       requestAnimationFrame(animate);
       ps.render();
       ...
} 

```
### Examples
* [gettingStarted](http://flashhawk.github.com/spp.js/examples/gettingStarted/)
* [spriteImage](http://flashhawk.github.com/spp.js/examples/spriteImage/)
* [fruitNinja](http://flashhawk.github.com/spp.js/examples/fruitNinja/)
* [easelJS](http://flashhawk.github.com/spp.js/examples/easelJS/)

### Support or Contact
Weibo: http://weibo.com/flashawk? or contact flashhawkmx@gmail.com and we’ll help you sort it out.