// Written out in full for clarity
type FmtDurOptions =
	| {
			leading?: boolean;
			ms?: false;
	  }
	| {
			leading?: boolean;
			ms: true;
			msDigits?: number;
	  };

function parseMs(ms: number) {
	return {
		days: Math.trunc(ms / 86400000),
		hours: Math.trunc(ms / 3600000) % 24,
		minutes: Math.trunc(ms / 60000) % 60,
		seconds: Math.trunc(ms / 1000) % 60,
		ms: Math.trunc(ms) % 1000,
	};
}

// adapted from https://github.com/rafaelrinaldi/add-zero.
// moved to internal function b/c addZero is unmaintained (9+ years).
// stripped out negative sign logic since we're already doing it elsewhere.
function addZero(value: number | string, digits = 2) {
	const str = value.toString();
	const size = digits - str.length + 1;
	return new Array(size).join("0").concat(str);
}

function getSign(duration: number, showMs: boolean) {
	if (showMs) return duration < 0 ? "-" : "";
	return duration <= -1000 ? "-" : "";
}

function format(ms: number, options?: FmtDurOptions): string {
	const leading = options?.leading ?? false;
	const showMs = options?.ms ?? false;
	const unsignedMs = Math.abs(ms);
	const sign = getSign(ms, showMs);
	const t = parseMs(unsignedMs);
	const seconds = addZero(t.seconds);

	let ret = "";

	if (t.days && !ret) {
		ret = `${sign}${t.days}:${addZero(t.hours)}:${addZero(t.minutes)}:${seconds}`;
	}
	if (t.hours && !ret) {
		ret = `${sign}${leading ? addZero(t.hours) : t.hours}:${addZero(t.minutes)}:${seconds}`;
	}
	if (!ret) {
		ret = `${sign}${leading ? addZero(t.minutes) : t.minutes}:${seconds}`;
	}

	if (showMs) {
		ret += `.${addZero(t.ms, 3).substring(0, options?.ms && options.msDigits ? options.msDigits : 3)}`;
	}

	return ret;
}

export default format;

export const fdur = format;
export const fmtDur = format;
export const formatDuration = format;
