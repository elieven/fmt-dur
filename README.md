<div align="center">


# fmt-dur

Convert a number in milliseconds to a standard duration string.


</div>

## Install

```
npm install fmt-dur
```

## Usage

```js
// Any of these works
const format = require('fmt-dur')
const { fdur } = require('fmt-dur')
const { fmtDur } = require('fmt-dur')
const { formatDuration } = require('fmt-dur')
import format from "fmt-dur";
import { fdur } from "fmt-dur";
import { fmtDur } from "fmt-dur";
import { formatDuration } from "fmt-dur";

// anything under a second is rounded down to zero
format(999) // '0:00'

// 1000 milliseconds is a second
format(1000) // '0:01'

// 1999 rounds down to 0:01
format(1000 * 2 - 1) // '0:01'

// 60 seconds is a minute
format(1000 * 60) // '1:00'

// 59 seconds looks like this
format(1000 * 60 - 1) // '0:59'

// 60 minutes is an hour
format(1000 * 60 * 60) // '1:00:00'

// 59 minutes and 59 seconds looks like this
format(1000 * 60 * 60 - 1) // '59:59'

// 24 hours is a day
format(1000 * 60 * 60 * 24) // '1:00:00:00'

// 23 hours, 59 minutes, and 59 seconds looks like this
format(1000 * 60 * 60 * 24 - 1) // '23:59:59'

// 365 days looks like this (not bothering with years)
format(1000 * 60 * 60 * 24 * 365) // '365:00:00:00'

// anything under a second is rounded down to zero
format(-999) // '0:00'

// 1000 milliseconds is a second
format(-1000) // '-0:01'

// 365 days looks like this (not bothering with years)
format(-1000 * 60 * 60 * 24 * 365) // '-365:00:00:00'

// with `leading` option, formatting looks like this
format(1000 * 60, { leading: true }) // '01:00'
format(1000 * 60 - 1, { leading: true }) // '00:59'
format(1000 * 60 * 60, { leading: true }) // '01:00:00'

// with `ms` option, formatting looks like this
format(999, { ms: true }) // '0:00.999'
format(1000 * 60, { ms: true }) // '1:00.000'
format(1000 * 60 * 60 * 24 - 1, { ms: true }) // '23:59:59.999'

// with `ms: true` and `msDigits` you can limit the amount of ms digits shown
format(1000 * 60 * 60, { ms: true, msDigits: 2 }) // '1:00:00.00'
```

## Attribution

This is a TS port of [https://github.com/ungoldman/format-duration](https://github.com/ungoldman/format-duration) with the extra option of `msDigits`.

## Contributing

Contributions are welcome!

## License

MIT

