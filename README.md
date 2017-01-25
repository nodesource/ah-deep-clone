# ah-deep-clone [![build status](https://secure.travis-ci.org/thlorenz/ah-deep-clone.png)](http://travis-ci.org/thlorenz/ah-deep-clone)

Creates a deep clone of a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of collected async hooks activities.

```js
const deepClone = require('ah-deep-clone')
const copy = deepClone(activities)
```

## Installation

    npm install ah-deep-clone

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### ahDeepClone

Clones the activities passed to it.
Any modifications applied to the original won't be visible in the copy.
This includes additions/removals to the original Map

**Parameters**

-   `activities` **[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** to be cloned

Returns **[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)>** cloned activities

## License

MIT
