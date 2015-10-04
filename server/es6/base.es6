var _ = require('./util');

class Base {
    constructor(socket) {
        this.socket = null;
        this.$parent = null;
        this.$children = [];
        this._events = [];

        this.event_list = {};

        if (socket) {
            this.socket = socket;
            this.socket.on('connect', this.$socketConnect.bind(this));
            this.socket.on('data', this.$socketData.bind(this));
            this.socket.on('timeout', this.$socketTimeout.bind(this));
            this.socket.on('end', this.$socketEnd.bind(this));
            this.socket.on('error', this.$socketError.bind(this));
            this.socket.on('close', this.$socketClose.bind(this));
            this.socket.on('drain', this.$socketDrain.bind(this));

            this.$on('send', function(event, res, errors) {
                var json = _.to_json(event, res, errors);
                this.socket.write(json);
            })
        }
    }

    $on(event, fn) {
        (this._events[event] || (this._events[event] = [])).push(fn);
        return this;
    }

    $off(event, fn) {
        if (!arguments.length) {
            this._events = [];
            return this;
        }
        if (arguments.length == 1) {
            this._events[event] = null;
            return this;
        }

        var events = this._events[event];
        for (var i = 0; i < events.length; i++) {
            if (events[i] === fn || events[i].fn === fn) {
                events.splice(i, 1);
                break;
            }
        }
        return this;
    }

    $emit(event) {
        var events = this._events[event];
        if (events) {
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0; i < events.length; i++) {
                events[i].apply(this, args);
            }
        }
        return this;
    }

    $broadcast(event) {
        if (!this._events[event].length) return this;
        var children = this.$children;
        for (var i = 0; i < children.length; i++) {
            var child = children[i],
                args = Array.prototype.slice.call(arguments);
            child.$emit.apply(child, args);
            child.$broadcast.apply(child, args);
        }
        return this;
    }

    $dispatch() {
        var parent = this.$parent;
        while (parent) {
            var args = Array.prototype.slice.call(arguments);
            parent.$emit.apply(parent, args);
            parent = parent.$parent;
        }
        return this;
    }

    $socketConnect() {
    }

    $socketData() {
    }

    $socketTimeout() {
    }

    $socketEnd() {
    }

    $socketError() {
    }

    $socketClose() {
    }

    $socketDrain() {
    }
}

module.exports = Base;
