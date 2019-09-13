import * as utils from "./utils";

export function asciiRender({ height = 20, width = 10, falling, landed }) {
  document.body.innerHTML =
    "<pre>" +
    utils.range(height).reduce(
      (acc, _, i) =>
        acc +
        "\n" +
        utils.range(width).reduce((acc, _, j) => {
          if (
            utils.tail(falling).some(x => utils.equal([i, j], x)) ||
            landed.some(x => utils.equal([i, j], x))
          ) {
            return acc + "#";
          } else {
            return acc + ".";
          }
        }, ""),
      ""
    );
}
