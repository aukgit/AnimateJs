Welcome to Animate.js
===================
Welcome to the **[Animate.js](https://github.com/aukgit/AnimateJs/ "Animate.js")**.

#### Current Version and future versions
Current and future versions will be written and maintained by [Md. Alim Ul Karim](https://github.com/aukgit "Md. Alim Ul Karim github").

#### **[Pre Alpha Release 0.01](https://github.com/aukgit/AnimateJs/releases/tag/0.01/ "Pre Alpha Release 0.01")**
It was  written by [Rashik Hasnat](https://github.com/Rashik004 "Rashik Hasnat") and supervised by [Md. Alim Ul Karim](https://github.com/aukgit "Md. Alim Ul Karim github").

### Purpose

The main purpose of of animate.js is to give you some extra functionality of **[Animated.css](https://raw.github.com/daneden/animate.css/master/animate.css/ "Animated.css")**

### **Functionalities**

- Animate an element with more than one animation

- Fix the animation duration, delay, repeat etc.

- Run concurrent animation in a single element.

### Dependencies
**[Animated.css](https://raw.github.com/daneden/animate.css/master/animate.css/ "Animated.css")**

### Syntax
- HTML
	- Add the class ``a-js``  to the element where you want to apply ***AnimateJs***
	-  Add the attribute `data-animate` with the element to specify the actions you want to give static action command in html.
- JavaScript
	- In your javaScript code you can invoke the ***AnimateJs***  plugin in three ways:
		- `$(".a-js").animateJs();//execute the animation command of data-animation attribute of all the elements having a-js class`
		- `$(".a-js").animateJs("animation commands");//execute the animation command given in the parameter of animateJs to all the elements having a-js class`
		- or you can use:
		```
    		 $("a-js").animateJs({
            workingAttr: "data-animate",//the working attribute you wwant to deal with
            reflections: {//names of called function
                iteration: {
                    called: "iteration",
                    names: ["repeat", "itr", "Itr", "Repeat"]
                },
                duration: {
                    called: "duration",
                    names: ["duration", "dur", "Duration", "Dur"]
                },
                delay: {
                    called: "delay",
                    names: ["delay", "Delay"]
                },
                selection: {
                    called: "select",
                    names: ["selection", "select","selector", "Select", "Selection", "Selector"]
                },
                remove: {
                    called: "remove",
                    names:["remove", "delete", "Remove", "Delete"]
                }
            },
            seperator: "->",//the seperator used to distinguish between commands
            multi: "+"// separator used to to resemble simultaneous actions
    })

		```

### Basic Usage

- HTML
```
 <section class="a-js" data-animate="bounce+tada"></section>
 <section class="a-js" data-animate="bounce->tada"></section>
```
- JavaScript
```
$(".a-js").animateJs();
```

### Advance Usage

- HTML
```
 <section class="a-js" data-animate="bounce->duration(4s)->repeat(5)->tada->delay(4s)"></section>

 <section class="a-js" data-animate="bounce->Select('#idName')->tada+bounce+fadeIn"></section>

```
- JavaScript
```
$(".a-js").animateJs();
```
