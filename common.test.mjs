import { getNthWeekday } from "./common.mjs";
import assert from "node:assert";
import { describe, test } from "node:test";

describe("Testing the Days Calendar logic", () => {
  test("It should return the correct Nth and the correct month ", () => {
    const year = 2024;
    const month = 5; 
    const day = 3; 
    const n = 2;  

    const result = getNthWeekday(year, month, day, n);

    assert.strictEqual(result.getDate(),12,"Should return Wednesday 12th of june 2024",);
    assert.strictEqual(
      result.getMonth(),
      5,
      "Should return  june month 2024",
    );
  });
});
