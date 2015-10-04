/*
 * @param {*} value
 * @return {String}
 */
exports.toString = function (value) {
  return value == null
    ? ''
    : value.toString();
};

/*
 * @param {*} value
 * @return {*|Boolean}
 */
exports.toBoolean = function (value) {
  return value === 'true'
    ? true
    : value === 'false'
    ? false
    : value;
};

/*
 * @param {Object} to
 * @param {Object} from
 */
exports.extend = function (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to;
};

Object.defineProperty(Object.prototype,
    "foreach", {
      value: function(fn, self) {
        self = self || this;

        Object.keys(this).forEach(function(key, index) {
          var value = this[key];

          fn.call(self, key, value, index);
        }, this)
      }
});

Object.defineProperty(Array.prototype,
    "flatten", {
        value: function(self) {
            self = self || this;

            var ret = [];
            for (var i = 0; i < self.length; i++) {
                if (Array.isArray(self[i])) {
                    ret = ret.concat(self[i].flatten());
                } else {
                    ret.push(self[i]);
                }
            }
            return ret;
        }
    }
);

exports.isArray = Array.isArray;
