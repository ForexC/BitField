var Container = typeof Buffer !== "undefined" ? Buffer // in node, use buffers
:
typeof Int8Array !== "undefined" ? Int8Array // in new browsers, use typed arrays
:


  function(l) {
    var a = new Array(l);
    for (var i = 0; i < l; i++) a[i] = 0
  }

  /**
   * @constructor
   * @param {number|Buffer|Int8Array} data
   */

function BitField(data) {
  var self = this
  if (!(self instanceof BitField)) {
    return new BitField(data)
  }
  if (typeof data === "number") {
    if (data % 8 !== 0) data += 1 << 3
    data = new Container(data >> 3)
    if (data.fill) data.fill(0) // clear node buffers of garbage
  }
  self.buffer = data
}

/**
 * Get the bit at position i.
 * @param {number} i
 */

BitField.prototype.get = function(i) {
  var self = this
  return !!(self.buffer[i >> 3] & (128 >> (i % 8)))
}

/**
 * Set the bit at position i.
 * @param {number} i
 * @param {boolean|number|undefined} b
 */

BitField.prototype.set = function(i, b) {
  if (b || arguments.length === 1) {
    this.buffer[i >> 3] |= 128 >> (i % 8)
  } else {
    this.buffer[i >> 3] &= ~ (128 >> (i % 8))
  }
}

if (typeof module !== "undefined") module.exports = BitField
