# Asterix-scss

![The first french satellite](https://upload.wikimedia.org/wikipedia/commons/9/98/Asterix_Musee_du_Bourget_P1020341.JPG)

## Asterix is :

- A freaking powerful ultralight scss framework, providing an extremly flexible layout system, a scss variables exposer and a super fancy mobile-first media query builder.

- A bunch of html and sass tools.

- NOT a pre-made components library, or a framework requiring customization by piles of resets.

- Not intended to be used without sass, as it builds its code from your settings.

- Built upon css variables, `grid` and `flex` properties,

- Made to use custom html attributes, such as `data-layout`.
<br><br>
## Full documentation: [https://digivore.gitbook.io/asterix/](https://digivore.gitbook.io/asterix/)
<br><br>
# Installation
Get package from npm:
```shell
npm install asterix-scss
```

Import Asterix into a scss file and initialize it:
```scss
// Your index.scss file
@import 'asterix-scss';
@include asterix();

// ...
```

You can configure any asterix global variable by setting it between the `import` and the `asterix()` call
```scss
// Your index.scss file
@import 'asterix-scss';

@include --update-vars((
  breakpoints: (
    s: 400px,
    m: 500px,
    // ...
  ),
  colors: (
    primary: #248691,
    text: #181818,
    // ...
  ),
));

@include asterix();

// ...
```

# Main concepts
## Custom HTML attributes
Asterix uses its own custom html attributes and relies on their corresponding css selectors.
```html
<div data-layout></div>
```
```scss
[data-layout]{
  // some amazing css
}
```
This is preventing Asterix to create any conflict with other css. It simplifies also the way selectors are internally written and save a lot of bytes.

Available attributes are:
- `data-layout` handles display, grid and flex properties
- `data-flex` handles flex-only properties (flex-wrap for instance)
- `data-cols` sets the number of columns a data-layout has
- `data-col` sets the number of column an element can wrap
- `data-gap` handles spacing between elements in grid and flex
contexts
- `data-spe` customized specifiers use

## Variables
Asterix uses a global variable `$asterix-vars` to inject your design system values into it.
```scss
$asterix-vars: (
  breakpoints: (
    xs: 480px,
    s: 768px,
    m: 1024px,
    l: 1200px,
  ),
  colors: (
    default: black,
  ),
  font-families: (
    default: 'sans-serif',
  ),
  gaps: (
    1: 0.5rem,
    2: 1rem,
    3: 1.5rem,
    4: 3rem,
  ),
  shapes: (
    default: 4px,
  ),
);
```
You can add any values and/or group of values to fit your design system.

Even if you can provide an empty var, Asterix requires a `breakpoints` and a `gaps` group to properly write layout rules.

All other groups are not used into the Asterix's core and are there to provide dynamic values to scss.

You can retrieve easily a variable value or a variables group by using the `--var($group[, $property]) mixin:
```scss
a{
  color: --var(colors, default);
}
```

### CSS variables
Asterix internally uses css variables to build layouts.

Using css variables can reduce your compiled css weight and allow you to easily update values on the frontend side. Meanwhile, you won't be able to compute them on the scss side.

To allow developers to code the way they want, both scss and css variables can be used, seamlessly.
All you have to do is to translate selected scss variables to css variables with the `--set-css-variables()` mixin:

```scss
// Set following css variables:
// --color-default: black;
// --color-primary: #C05454;
// --font-sizes-default: 16px;
// --font-sizes-big: 1.5rem;

@include set-css-variables((
  color: (
    default: black,
    primary: #C05454,
    //...
  ),
  font-sizes: (
    default: 16px,
    big: 1.5rem,
  ),
));

a{
  color: var(--color-default);
  font-size: var(--font-sizes-big);
}
```


## Specifiers
Asterix's custom html attribute value can be filled with **specifiers**:
```html
<div data-layout="--flex--items-center"></div>
```
As a convention, specifier are all prefixed by `--`.

On the scss side, you can easily create specifiers with the provided `--spe()` mixin:
```scss
*{
  @include --spe(button){
    padding: 0.5rem 1rem;
    background: black;
    color: white;
    border: none;
    outline: none;
  }
}
```
```html
<button class="--button">Asterix is awesome</button>
<a data-spe="--button">Asterix is awesome</a>
```
**Note** that customized specifiers are by default attache to the data-spe attribute.

You can and also extend a bunch of rules at once:
```scss
@include --extends((
  data-layout: --flex --justify-center --items-center,
  data-gap: --1,
))
```
## Responsiveness
**Asterix is mobile-first: `$breakpoints` values are considered as `min-width` into media queries.**

Asterix uses its `$breakpoints` configuration variable and provide tools for both html and css.

### HTML
The breakpoint's key is prefixed to specifier, **without any separation**.

**Breakpoints are available into every native specifiers**

For custom specifiers, you will have to set `$responsively` to `true`.

```scss
*{
  @include spe(width-100, true){
    width: 100%;
  }
  @include spe(width-auto, true){
    width: auto;
  }
}
```
```html
<div data-layout="--mflex--mitems-center" class="--width-100--mwidth-auto"></div>
```

### SCSS
A terrific media query builder is available through the `--mq()` mixin.
```scss
@include --mq(m){
  font-size: 1rem;
}
// @media screen and (min-width:500px){font-size:1rem;}

@include --mq(s m){
  font-size:1rem;
}
// @media screen and (min-width:500px) and (max-width:599px)...

@include --mq(m 923px){
  font-size:1rem;
}
// @media screen and (min-width:500px) and (max-width:922px)...
```

You can also retrieve any breakpoint key by using an old-fashioned `map-get($breakpoints,m)`, or the asterix mixin `--var(breakpoints, m)`


# Developing
There is a small playground in the repository, composed of a very basic node server serving an html page to localhost. You can use it to play with Asterix out of the box.

If you are interested by testing or developing above Asterix:
- Clone the repo
- Create a new .env file at the project root, and copy/paste values from .env.example


**If you have docker and docker-compose installed:**
- run docker-compose up -d
- get into the container: docker exec -ti asterix sh
- then run npm/yarn commands (see below)

**If you cannot use docker:**
- you'll need a dependencies manager installed (npm, yarn...)
- you'll need nodejs 15 or more installed
- run npm/yarn commands (see below)

## Commands
- `build` : compile scss once, minified
- `clean` : remove all compiles css files
- `dev` : watch for scss changes and compile it
- `play` : serve playground/index.html in http://localhost:[process.env.PORT] and watches for scss changes.

# Credits
Many thank to [Matthieu Jabbour](https://github.com/matthieujabbour) and his [sonar-ui](https://github.com/openizr/sonar-ui) library.

Feel free to test, use, contribute and fork Asterix.