# React Framer

This is a React renderer for Framer! You can write React components that render Framer layers.

**This project is just a prototype**

### Examples

HSL color-picker prototype: https://dabbott.github.io/react-framer/example

### Why?

Framer is great for interaction design. React is great for building complex UIs. Why not combine the two and get the best of both worlds?

A `react-framer` component looks something like this:

```js
const Label = ({ text }) => (
  <Layer
    x={Align.center}
    y={Align.center}
    height={46}
    width={200}
    backgroundColor={"rgba(0,0,0,0.5)"}
    borderRadius={100}
  >
    <Text
      x={Align.center}
      y={Align.center}
      width={200}
      text={text}
      color={"white"}
      fontSize={17}
      fontWeight={600}
      textAlign={"center"}
      lineHeight={46}
    />
  </Layer>
);
```

To see more, check out the color-picker example code: https://github.com/dabbott/react-framer/blob/master/example/app.js

### Instructions

Make sure you have `yarn` installed and run:

```bash
yarn
yarn build
```

Then, open `example/index.html` in Chrome/Safari to preview the sample app.

### Hacking

Run the webpack dev server with:

```bash
yarn dev
```

Then, navigate to http://localhost:8081/example/ in Chrome/Safari to preview the sample app.
