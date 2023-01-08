I know two ways of achievening this:

## Sass

If you use Sass and webpack in your project use `:export` declaration.

```scss
// in sass/_variables.scss

$color-primary:       blue;
$color-secondary:     red;

:export {
    colorPrimary:   $color-primary;
    colorSecondary: $color-secondary;
}
```

```jsx
import { colorPrimary } from '../sass/_variables.scss'
```

Good advice from [SO](https://stackoverflow.com/a/56525112/2382115) and Bootstrap to avoid repetition is to leverage Sass map:

```scss
$theme-colours: (
    someColor: #000,
    anotherColor: #000,
    thirdColor: #000,
    fourthColor: #000
)

@each $color, $value in $theme-colours {
    :export{
        $color: $value;
    }
}
```

Note that if your Sass variables use dash separators (ie. `some-color`) and are exported with the same name you won't be able to do names exports. Meaning you will end with something like `colors['some-color']` in JS.

Update: Actually, Sass is not needed for this to work. It relies on a standard called [Interoperable CSS](https://glenmaddern.com/articles/interoperable-css) so it will work with plain CSS (but still needs JS loader though).

## CSS variables

From [Bramus](https://www.bram.us/2020/03/30/pass-data-from-css-to-javascript-with-css-variables/). Idea is to define variables as custom properties and fetch them using `getComputedStyle`.

```css
:root {
    --color-primary: #FF0000;
    --font-size: 16px;
}
```

```js
function getStyle(style, element = document.body) {
    return window
        .getComputedStyle(element)
        .getPropertyValue(style)
        .trim();
}

console.log('Primary Color', getStyle('--color-primary'));

console.log('Font Size', getStyle('--font-size'));
```

Using `document.body` as element will get you `:root` variables.
