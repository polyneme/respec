// @ts-check
/**
 * Sets the defaults for AOM specs
 */
export const name = "nmdc/defaults";
import { coreDefaults } from "../core/defaults.js";

const licenses = new Map([
  [
    "cc0",
    {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
  ],
  [
    "cc-by",
    {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode",
    },
  ],
]);

const aomDefaults = {
  // treat document as "Common Markdown" (with a little bit of HTML).
  // choice between Markdown and HTML depends on the complexity of the spec
  // example of Markdown spec: https://github.com/WICG/netinfo/blob/gh-pages/index.html
  format: "markdown",
  logos: [
    {
      src: "https://polyneme.nyc3.cdn.digitaloceanspaces.com/nmdc/img/nmdc-icon.png",
      alt: "NMDC",
      id: "NMDC",
      height: 140,
      width: 140,
      url: "https://microbiomedata.org/",
    },
  ],
  license: "cc0",
};

function computeProps(conf) {
  return {
    licenseInfo: licenses.get(conf.license),
  };
}

export function run(conf) {
  // assign the defaults
  const lint =
    conf.lint === false
      ? false
      : {
          ...coreDefaults.lint,
          ...aomDefaults.lint,
          ...conf.lint,
        };
  Object.assign(conf, {
    ...coreDefaults,
    ...aomDefaults,
    ...conf,
    lint,
  });

  // computed properties
  Object.assign(conf, computeProps(conf));
}
