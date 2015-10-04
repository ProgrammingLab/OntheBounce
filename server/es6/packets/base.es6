class Base {

    constructor(data) {
        this.errors = [];
        this.data = data;
    }

    validate(key, options) {
        options = options || {};
        var required = options.hasOwnProperty('required') && options.required ? true : false,
            default_val = options.hasOwnProperty("default") ? options.default : null;

        var val = null;
        if (this.data.hasOwnProperty(key)) {
            val = this.data[key];
        } else {
            if (required) {
                this.errors.push(`${key} is required`);
                val = null;
            } else {
                val = default_val;
            }
        }
        Object.defineProperty(this,
            key,
            {
                get: function () {
                    return val;
                }
            }
        )
    }
}

module.exports = Base;