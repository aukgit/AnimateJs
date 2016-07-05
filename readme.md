Welcome to Animate.js
===================
Welcome to the **[Animate.js](https://github.com/aukgit/AnimateJs/ "Animate.js")**. It was  written by [Rashik Hasnat](https://github.com/Rashik004 "Rashik Hasnat") on supervision of   [Md. Alim Ul Karim](https://github.com/aukgit "Md. Alim Ul Karim github").

### Purpose

The main purpose of of animate.js is to give you some extra functionality of **[Animated.css](https://raw.github.com/daneden/animate.css/master/animate.css/ "Animated.css")**

**Functionalities**

- Animate an element with more than one animation

- Fix the animation duration, delay, repeat etc.

- Run concurrent animation in a single element.

###Dependencies
**[Animated.css](https://raw.github.com/daneden/animate.css/master/animate.css/ "Animated.css")**

###Basic Usage

- HTML
```
 <section class="a-js" data-animate="bounce+tada"></section>
 <section class="a-js" data-animate="bounce->tada"></section>
```
- JavaScript
```
$(".a-js").animateJs();
```

###Advance Usage

- HTML
```
 <section class="a-js" data-animate="bounce->duration(4s)->repeat(5)->tada->delay(4s)"></section>

 <section class="a-js" data-animate="bounce->Select('#idName')->tada+bounce+fadeIn"></section>

```
- JavaScript
```
$(".a-js").animateJs();
```
