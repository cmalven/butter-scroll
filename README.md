# Butter Scroll

Simple, effective, progressively-enhanced, buttery-smooth scrolling.

## Warning

This project is still in its very early stages. If you're not willing to read the source or come up with clever workarounds for bizarre behavior, it's probably not for you.

## Installation

### via npm

`npm install butter-scroll --save`

### via git

If you want to be able to easily pull the latest bleeding-edge butter-scroll code into your project frequently, I recommend cloning this repo and using a local path in your `package.json` to pull the file in.

```
git clone git@github.com:cmalven/butter-scroll.git
```

Finally, you'll need to add the following to the `dependencies` section of your `package.json`…

```
# Assumes that butter-scroll is cloned into a directory alongside your project directory
"butter-scroll": "file:../butter-scroll"
```

### Other required libraries

The long-term goal is to remove these dependencies, but for now Butter Scroll won't work if they aren't loaded.

- [jQuery](http://jquery.com)

### Other optional (but recommended) libraries

If a Modernizr build with the correct options is available, Butter Scroll will use that to progressively enhance for browsers that fully support it, and retain normal scrolling for those that don't.

If Modernizr is not found, Butter Scroll will assume full browser support.

Your Modernizr build should include the following:

- `csstransforms`
- `csstransforms3d`
- `Modernizr.prefixed()`

Or just use [this Modernizr build](http://modernizr.com/download/?-csstransforms-csstransforms3d-prefixed-setclasses)

## Setup

### HTML

The class names used here don't need to match exactly this example, but they _do_ need to exactly match the names used in your styles and initialization javascript.

```html
<div class="outer-container js-outer-container">
  <div class="inner-container js-inner-container">
    …
  </div>
</div>
```

**Optional Parallax**

To enable parallax for individual HTML elements, just give them a `data-depth` attribute with a value between `0` (farthest away) and `10` closest.

```html
<div data-depth="3"></div>
<div data-depth="7"></div>
```

### Styles

There are a few minimal CSS styles that you need to add to the above elements.

```css
.inner-container {
  overflow: hidden;
}
```

### Javascript

```js
new ButterScroll({
  $containerEl: $('.js-outer-container'),
  $elToScroll: $('.js-inner-container'),
  scrollEase: 0.15, // optional
  maxDepthOffset: 500 // optional
});
```