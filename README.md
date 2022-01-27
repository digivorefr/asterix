# asterix-scss
**The scss framework who doesn't think you're a noob**

## Asterix is :

- A freaking powerful ultralight scss framework, providing an extremly flexible layout system, a scss variables exposer and a super fancy mobile-first media query builder.

- A bunch of html and sass tools.

- NOT a pre-made components library, or a framework requiring customization by piles of resets.

- Not intended to be used without sass, as it builds its code from your settings.

- Designed for experienced frontend developer

- Built upon `grid`, `flex` and css variables,

- Made to use custom html attributes, such as `data-layout`.


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

$breakpoints: (
  s: 400px,
  m: 500px,
  // ...
);

$color: (
  primary: #202456,
  default: #202020,
);

@include asterix();

// ...
```
Here is the full configuration variables list.

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
- `data-gap` handles spacing between elements in grid and flex contexts


### Specifiers
Asterix's custom html attribute value can be filled with **specifiers**:
```html
<div data-layout="--flex--items-center"></div>
```
```scss
[data-layout*="--flex"]{
  display: flex;
}
[data-layout*="--items-center"]{
  align-items: center;
}
```
As a convention, specifier are all prefixed by `--`.

On the scss side, you can easily create specifiers with the provided `--spe()` mixin:
```scss
*{
  @include spe(button){
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
<a class="--button">Asterix is awesome</a>
```

### Responsiveness
**Asterix is mobile-first: `$breakpoints` values are considered as `min-width` into media queries.**

Asterix uses its `$breakpoints` configuration variable and provide tools for both html and css.

#### HTML
**Breakpoints are available into every native specifiers** and custom specifiers created with the parameter `$responsively` set to `true`.
The breakpoint's key is prefixed to specifier, **without any separation**.
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

You can also retrieve any breakpoint key by using an old-fashioned `map-get($breakpoints,m)`, or use the asterix mixin `--breakpoint(m)`

## Basic HTML usage
The `data-layout` html attribute sets a simple `display` property.
```html
<div data-layout="--flex"></div>
```
you can use `--block`, `--none`, `--flex`, `--grid`

<hr>

Chain as many specifiers as required with `'--'`:
```html
<div data-layout="--flex--justify-end--items-center"></div>
```
Get the complete `data-layout` specification here.
<hr>

Every specifier has responsive variations. Simply prefix it with a breakpoint's name, **without any separation**.
```html
<div data-layout="--block--mflex--mjustify-end--mitems-center"></div>
```
_Breakpoints are set in the configuration's `$breakpoints` variable._
<hr>

You can nest as many layout as you need to:
```html
<div data-layout="--grid">
  <div data-layout="--flex">
    <div data-layout="--grid"></div>
  </div>
  <div data-layout="--grid"></div>
</div>
```






## Create layouts

Create two columns side by side :
```html
<div data-layout="--grid" data-cols="--2">
  <div>item</div>
  <div>item</div>
</div>
```

Inline elements :
```html
<div data-layout="--flex">
  <div>item</div>
  <div>item</div>
</div>
```

Add gap between elements:
```html
<!-- Vertical and horizontal gaps -->
<div data-layout="--grid" data-cols="--2" data-gap="--1">
  <div>item</div>
  <div>item</div>
</div>

<!-- For vertical and/or horizontal gaps -->
<div data-layout="--grid" data-cols="--2" data-hgap="--1" data-vgap="--2">
  <div>item</div>
  <div>item</div>
</div>
```

Easily set `justify-content`, `align-items`, and `align-self` properties :
```html
<div data-layout="--flex--justify-center--items-center">
  <div>item</div>
  <div data-layout="--self-end">item</div>
</div>
```