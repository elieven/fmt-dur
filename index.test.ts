import { expect, test, describe } from "bun:test"; // compatible with vitest
import { default as f } from "./index.ts";

describe("format-duration", () => {
	test("it works", () => {
		expect(f(999)).toBe("0:00");
		expect(f(1000)).toBe("0:01");
		expect(f(1000 * 2 - 1)).toBe("0:01");
		expect(f(1000 * 60)).toBe("1:00");
		expect(f(1000 * 60 - 1)).toBe("0:59");
		expect(f(1000 * 60 * 60)).toBe("1:00:00");
		expect(f(1000 * 60 * 60 - 1)).toBe("59:59");
		expect(f(1000 * 60 * 60 * 24)).toBe("1:00:00:00");
		expect(f(1000 * 60 * 60 * 24 - 1)).toBe("23:59:59");
		expect(f(1000 * 60 * 60 * 24 * 365)).toBe("365:00:00:00");
		expect(f(1000 * 60 * 60 - 1, { ms: true, msDigits: 2 })).toBe("59:59.99");
	});

	test("it works with negative durations", () => {
		expect(f(-999)).toBe("0:00");
		expect(f(-1000)).toBe("-0:01");
		expect(f(-1000 * 2 + 1)).toBe("-0:01");
		expect(f(-1000 * 60)).toBe("-1:00");
		expect(f(-1000 * 60 + 1)).toBe("-0:59");
		expect(f(-1000 * 60 * 60)).toBe("-1:00:00");
		expect(f(-1000 * 60 * 60 + 1)).toBe("-59:59");
		expect(f(-1000 * 60 * 60 * 24)).toBe("-1:00:00:00");
		expect(f(-1000 * 60 * 60 * 24 + 1)).toBe("-23:59:59");
		expect(f(-1000 * 60 * 60 * 24 * 365)).toBe("-365:00:00:00");
	});

	test("it works with leading zeros", () => {
		expect(f(999, { leading: true })).toBe("00:00");
		expect(f(1000, { leading: true })).toBe("00:01");
		expect(f(1000 * 2 - 1, { leading: true })).toBe("00:01");
		expect(f(1000 * 60, { leading: true })).toBe("01:00");
		expect(f(1000 * 60 - 1, { leading: true })).toBe("00:59");
		expect(f(1000 * 60 * 60, { leading: true })).toBe("01:00:00");
		expect(f(1000 * 60 * 60 - 1, { leading: true })).toBe("59:59");
		expect(f(1000 * 60 * 60 * 24, { leading: true })).toBe("1:00:00:00");
		expect(f(1000 * 60 * 60 * 24 - 1, { leading: true })).toBe("23:59:59");
		expect(f(1000 * 60 * 60 * 24 * 365, { leading: true })).toBe(
			"365:00:00:00",
		);
	});

	test("it works with leading zeros and milliseconds", () => {
		expect(f(999, { leading: true, ms: true })).toBe("00:00.999");
		expect(f(1000, { leading: true, ms: true })).toBe("00:01.000");
		expect(f(1000 * 2 - 1, { leading: true, ms: true })).toBe("00:01.999");
		expect(f(1000 * 60, { leading: true, ms: true })).toBe("01:00.000");
		expect(f(1000 * 60 - 1, { leading: true, ms: true })).toBe("00:59.999");
		expect(f(1000 * 60 * 60, { leading: true, ms: true })).toBe("01:00:00.000");
		expect(f(1000 * 60 * 60 - 1, { leading: true, ms: true })).toBe(
			"59:59.999",
		);
		expect(f(1000 * 60 * 60 * 24, { leading: true, ms: true })).toBe(
			"1:00:00:00.000",
		);
		expect(f(1000 * 60 * 60 * 24 - 1, { leading: true, ms: true })).toBe(
			"23:59:59.999",
		);
		expect(f(1000 * 60 * 60 * 24 * 365, { leading: true, ms: true })).toBe(
			"365:00:00:00.000",
		);
	});

	test("it works with negative durations and milliseconds", () => {
		expect(f(-999, { ms: true })).toBe("-0:00.999");
		expect(f(-1000, { ms: true })).toBe("-0:01.000");
		expect(f(-1000 * 2 + 1, { ms: true })).toBe("-0:01.999");
		expect(f(-1000 * 60, { ms: true })).toBe("-1:00.000");
		expect(f(-1000 * 60 + 1, { ms: true })).toBe("-0:59.999");
		expect(f(-1000 * 60 * 60, { ms: true })).toBe("-1:00:00.000");
		expect(f(-1000 * 60 * 60 + 1, { ms: true })).toBe("-59:59.999");
		expect(f(-1000 * 60 * 60 * 24, { ms: true })).toBe("-1:00:00:00.000");
		expect(f(-1000 * 60 * 60 * 24 + 1, { ms: true })).toBe("-23:59:59.999");
		expect(f(-1000 * 60 * 60 * 24 * 365, { ms: true })).toBe(
			"-365:00:00:00.000",
		);
	});
});
