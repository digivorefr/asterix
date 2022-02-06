# asterix-scss

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
## Installation
Get package from npm:
```shell
npm install @digivorefr/asterix-scss
```

Import Asterix into a scss file and initialize it:
```scss
// Your index.scss file
@import '@digivorefr/asterix-scss';
@include asterix();

// ...
```

You can configure any asterix global variable by setting it between the `import` and the `asterix()` call
```scss
// Your index.scss file
@import '@digivorefr/asterix-scss';

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

## Main concepts
### Custom HTML attributes
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


### Specifiers
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
### Responsiveness
**Asterix is mobile-first: `$breakpoints` values are considered as `min-width` into media queries.**

Asterix uses its `$breakpoints` configuration variable and provide tools for both html and css.

#### HTML
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

#### SCSS
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


### Variables