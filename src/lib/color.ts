import Color from "colorjs.io"

export default function color(value: string, format: "hex" | "rgb" | "raw") {
  if (format === "raw") {
    return value
  }

  return new Color(value).to("srgb").toString({ format })
}
