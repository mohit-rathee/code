import { KeyboardEvent } from "react";

/**
 * Disables scientific notation characters on "number" input fields
 */
const NumberOnlyFilter = (event: KeyboardEvent) => {
  if (
    event.key === "E" ||
    event.key === "e" ||
    event.key === "+" ||
    event.key === "-" ||
    event.key === "." ||
    event.key === "," ||
    event.key === " " // space
  ) {
    event.preventDefault();
  }
};

export default NumberOnlyFilter;
