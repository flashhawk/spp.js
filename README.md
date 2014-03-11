![spp.js logo](https://raw.github.com/flashhawk/spp.js/dev/logo.png)
======
### Welcome Spp.js
Spp.js is a sample physics particle system engine for javascript.

### Feature

* Code less, simple structure.
* Based on classical Newtonian mechanics.
* Make your own custom forces or particles
* Easy to build interactive projects with popular HTML5 2D rendering engine:[pixi.js](https://github.com/GoodBoyDigital/pixi.js),[EaselJS](https://github.com/CreateJS/EaselJS/)
* Open source!


### Getting Started
```html
<script src="js/spp.min.js"></script>
```

```html
<script>
        var ps=new SPP.ParticleSystem();
        var particle=ps.createParticle(SPP.Particle);
        particle.life=3;
        particle.position.x=50;
        particle.position.y=60;
        particle.addForce("someForceName",someForce);
        particle.onUpdate=someUpdateHander;
        //particle.addEventListener("dead",deadHandler);
        particle.on("dead",deadHandler);
        animate();
        ps.start();
        
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
<script>
```
### Examples
* [gettingStarted](http://flashhawk.github.com/spp.js/examples/gettingStarted/)
* [spriteImage](http://flashhawk.github.com/spp.js/examples/spriteImage/)
* [spp for easelJS](http://flashhawk.github.com/spp.js/examples/easelJS/)
* [spp for pixi.js](http://flashhawk.github.com/spp.js/examples/pixi/)
* [attraction](http://flashhawk.github.com/spp.js/examples/attraction/)
* [repulsion](http://flashhawk.github.com/spp.js/examples/repulsion/)

### Game
* [fruitNinja](http://flashhawk.github.com/spp.js/examples/fruitNinja/)
* [斩立觉](https://itunes.apple.com/cn/app/zhan-li-jue/id636378939?ls=1&mt=8)

### Case
* [蒙牛纯甄-立冬篇](http://flashhawk.github.io/spp.js/case/chunzhen_winter.png)

### Docs
* [Comming soon!](#)

### Tutorials
* [Comming soon!](#)

### How to build ###

Spp.js is build with ant and [closure-compiler](https://code.google.com/p/closure-compiler/wiki/BuildingWithAnt)

```
$>cd spp's root directory
```
Then build:

```
$> ant
```

### Support or Contact
Weibo: http://weibo.com/flashawk? or contact flashhawkmx@gmail.com and we’ll help you sort it out.

### License
This content is released under the (http://opensource.org/licenses/MIT) MIT License.
