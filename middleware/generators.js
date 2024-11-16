import { randomInt } from "crypto";

export function digits(length) {
  return () => {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += randomInt(0, 10); // generates a random digit from 0 to 9
    }
    return result;
  };
}
