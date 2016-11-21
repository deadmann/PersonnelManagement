/**
 * Created by Hassan on 11/20/2016.
 */
class KeyValue<TKey, TValue>{
    key: TKey;
    value: TValue;


    constructor(key: TKey, value: TValue) {
        this.key = key;
        this.value = value;
    }
}