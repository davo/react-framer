import linearGradient from "./utils/linearGradient";

const device = new Framer.DeviceView();
device.setupContext();
device.fullScreen = true;
device.screen.backgroundColor = "white";

const { render, Layer, Slider, Text } = ReactFramer;
const { Align, Color } = Framer;

const GradientSlider = ({
  gradient,
  min,
  max,
  value,
  onValueChange,
  ...rest
}) => {
  return (
    <Slider
      min={min}
      max={max}
      value={value}
      borderRadius={2}
      shadow1={{
        spread: 1,
        color: "rgba(0,0,0,0.05)",
        type: "inset"
      }}
      knob={{
        width: 10,
        height: 24,
        borderRadius: 20,
        shadow1: {
          spread: 1,
          color: "rgba(0,0,0,0.1)"
        },
        shadow2: {
          y: 2,
          blur: 6,
          color: "rgba(0,0,0,0.2)"
        }
      }}
      fill={{
        backgroundColor: "transparent"
      }}
      style={{
        background: gradient
      }}
      onValueChange={onValueChange}
      {...rest}
    />
  );
};

const LabeledSliderRow = ({
  gradient,
  label,
  min,
  max,
  value,
  displayValue,
  onValueChange,
  ...rest
}) => {
  return (
    <Layer backgroundColor={"transparent"} {...rest}>
      <Text
        x={Align.left}
        y={Align.center}
        text={label}
        color={"#888"}
        fontSize={14}
        fontWeight={500}
        lineHeight={1.5}
      />
      <GradientSlider
        x={Align.center}
        y={Align.center}
        gradient={gradient}
        min={min}
        max={max}
        value={value}
        onValueChange={onValueChange}
        width={rest.width - 120}
      />
      <Text
        x={Align.left(rest.width - 20)}
        y={Align.center}
        text={displayValue}
        color={"#888"}
        fontSize={14}
        fontWeight={500}
        lineHeight={1.5}
      />
    </Layer>
  );
};

class App extends React.Component {
  state = {
    hue: 190,
    saturation: 1,
    lightness: 0.5
  };

  handleHueChange = hue => {
    this.setState({ hue });
  };

  handleSaturationChange = saturation => {
    this.setState({ saturation: saturation / 100 });
  };

  handleLightnessChange = lightness => {
    this.setState({ lightness: lightness / 100 });
  };

  render() {
    const { hue, saturation, lightness } = this.state;

    const color = new Color({
      h: hue,
      s: saturation,
      l: lightness
    });

    const currentHue = new Color({ h: hue, s: 1, l: 0.5 });

    return (
      <Layer
        x={Align.center}
        y={Align.center}
        width={600}
        height={560}
        backgroundColor={"#fff"}
        borderRadius={6}
        clip={true}
        shadow1={{
          y: 1,
          blur: 1,
          color: "rgba(0,0,0,0.1)"
        }}
        shadow2={{
          y: 6,
          blur: 20,
          color: "rgba(0,0,0,0.1)"
        }}
      >
        <Layer height={300} width={600} backgroundColor={color}>
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
              text={color.toHslString()}
              color={"white"}
              fontSize={17}
              fontWeight={600}
              textAlign={"center"}
              lineHeight={46}
            />
          </Layer>
        </Layer>
        <Layer
          y={Align.top(300)}
          height={260}
          width={600}
          backgroundColor={"transparent"}
        >
          <LabeledSliderRow
            x={Align.center}
            y={Align.center(-50)}
            height={24}
            width={510}
            label={"H"}
            min={0}
            max={360}
            value={hue}
            displayValue={Math.round(hue).toString()}
            onValueChange={this.handleHueChange}
            gradient={linearGradient({
              direction: "to right",
              colors: [
                "rgb(255,0,0)",
                "rgb(255, 255, 0)",
                "rgb(0, 255, 0)",
                "rgb(0, 255, 255)",
                "rgb(0, 0, 255)",
                "rgb(255, 0, 255)",
                "rgb(255, 0, 0)"
              ],
              locations: ["0%", "15%", "30%", "50%", "65%", "80%", "100%"]
            })}
          />
          <LabeledSliderRow
            x={Align.center}
            y={Align.center}
            height={24}
            width={510}
            label={"S"}
            min={0}
            max={100}
            value={saturation * 100}
            displayValue={Math.round(saturation * 100).toString()}
            onValueChange={this.handleSaturationChange}
            gradient={linearGradient({
              direction: "to right",
              colors: [new Color(currentHue).grayscale(0), currentHue],
              locations: ["0%", "100%"]
            })}
          />
          <LabeledSliderRow
            x={Align.center}
            y={Align.center(50)}
            height={24}
            width={510}
            label={"L"}
            min={0}
            max={100}
            value={lightness * 100}
            displayValue={Math.round(lightness * 100).toString()}
            onValueChange={this.handleLightnessChange}
            gradient={linearGradient({
              direction: "to right",
              colors: [
                new Color(currentHue).lighten(-50),
                currentHue,
                new Color(currentHue).lighten(100)
              ],
              locations: ["0%", "50%", "100%"]
            })}
          />
        </Layer>
      </Layer>
    );
  }
}

render(<App />, device.screen);

// window.addEventListener("resize", () => {
//   render(<App />, device.screen);
// });
