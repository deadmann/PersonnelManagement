///<reference path="keyValue.ts"/>
///<referene path="../../typings/index.d.ts"/>
/**
 * Created by Hassan on 11/20/2016.
 */
var Dictionary = (function () {
    function Dictionary() {
        /** @type {Array<KeyValue<TKey, TValue>>} */
        this.list = [];
    }
    Dictionary.prototype.add = function (key, value) {
        if (Enumerable.from(this.list).any(function (w) {
            return w.key === key;
        })) {
            throw new Error("Requested Insert Key Already Exists");
        }
        if (Util.Utility.isNullOrUndefined(key)) {
            throw new Error("Requested Key is Null or Undefined");
        }
        this.list.push(new KeyValue(key, value));
    };
    Dictionary.prototype.get = function (key) {
        var resultItem = Enumerable.from(this.list)
            .firstOrDefault(function (w) {
            return w.key === key;
        }, null);
        if (resultItem != null)
            return resultItem.value;
        return null;
    };
    return Dictionary;
}());
