/**
 * Created by Hassan Faghihi on 7/25/2015.
 */
/// <reference path="TypedUtility.ts" />

interface String {
    insertAt:(index:number, strText:string)=>string;
    replaceAt:(index:number, count:number, strReplacement:string)=>string;
    /**
     *
     * @param strTrim {string} lookup string
     * @returns {string|Object}
     */
    trimStart:(strTrim:string)=>string;
    /**
     *
     * @param strTrim {string} lookup string
     * @returns {string|Object}
     */
    trimEnd:(strTrim:string)=> string;
    /**
     *
     * @param strTrim {string} lookup string
     * @returns {string|Object}
     */
    fullTrim:(strTrim:string)=>string;
    startWith:(strStart:string)=>boolean;
    endWith:(strEnd:string) => boolean;
    /**
     * Padding the string value with specified character
     * @param len {number} desired total length
     * @param sign {string} the sign to used for padding (default '0')
     * @returns {string}
     */
    padLeft:(len:number, sign?:string) => string;
    /**
     * Padding the string value with specified character
     * @param len {number} desired total length
     * @param sign {string} the sign to used for padding (default '0')
     * @returns {string}
     */
    padRight:(len:number, sign?:string) => string;
    contains:(term:string, ignoreCase:boolean) => boolean;
    replaceAll:(find:string, replace:string) => string;
    format:(...params:Array<string>) => string;
    putThousandComma:()=> string;
    removeThousandComma:()=> string;
    filterNumbers:()=> string;
}

String.prototype.insertAt=function(index: number, strText: string):string {
    var newStr = this.substr(0, index) + strText + this.substr(index-1+strText.length);
    return newStr;//valueOf()
};

String.prototype.replaceAt=function(index: number, count: number, strReplacement:string):string {
    if(count<0) throw "count cannot be less than 0";
    var newStr = this.substr(0, index) + strReplacement + this.substr(index+(count)+strReplacement.length);
    return newStr;//valueOf()
};

/**
 *
 * @param strTrim {string} lookup string
 * @returns {string|Object}
 */
String.prototype.trimStart=function(strTrim:string):string{
    var result = this;
    if(strTrim == undefined){
        result = this.replace(/\s+$/,'');
    } else {
        while (result.indexOf(strTrim) == 0 && result.length != 0) {
            result = result.replaceAt(0, 1, '');
        }
    }
    return result.valueOf();
};

/**
 *
 * @param strTrim {string} lookup string
 * @returns {string|Object}
 */
String.prototype.trimEnd=function(strTrim:string):string{
    var result = this;
    if(strTrim==undefined){
        result = this.replace(/^\s+/,'');
    } else {
        while(result.indexOf(strTrim)==result.length - strTrim.length && result.length!=0){
            result = result.replaceAt(result.length - strTrim.length, strTrim.length, '');
        }
    }
    return result.valueOf();
};

/**
 *
 * @param strTrim {string} lookup string
 * @returns {string|object}
 */
String.prototype.fullTrim=function(strTrim:string):string {
    return this.trimStart(strTrim).trimEnd(strTrim).valueOf();
};

String.prototype.startWith=function(strStart:string):boolean{
    if(this.lastIndexOf(strStart) == -1)
        return false;
    return this.indexOf(strStart) == 0;
};

String.prototype.endWith=function(strEnd:string):boolean{
    if(this.lastIndexOf(strEnd) == -1)
        return false;
    return this.lastIndexOf(strEnd) == this.length-strEnd.length;
};

/**
 * Padding the string value with specified character
 * @param len {number} desired total length
 * @param sign {string} the sign to used for padding (default '0')
 * @returns {string}
 */
String.prototype.padLeft=function (len: number, sign?: string):string{
    return Array(len - String(this).length + 1).join(sign || "0") + this;
};

/**
 * Padding the string value with specified character
 * @param len {number} desired total length
 * @param sign {string} the sign to used for padding (default '0')
 * @returns {string}
 */
String.prototype.padLeft = function (len: number, sign?: string): string {
    return this + Array(len - String(this).length + 1).join(sign || "0");
};

String.prototype.contains = function (term: string, ignoreCase: boolean = false): boolean {
    return ignoreCase ?
        this.toLowerCase().indexOf(term.toLowerCase()) :
        this.indexOf(term) !== -1;
};

String.prototype.replaceAll = function (find:string, replace:string):string {
    return this.replace(new RegExp(Util.Utility.escapeRegExp(find), 'g'), replace);
};

String.prototype.format = function(...params:Array<string>):string {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp("\\{" + i + "\\}", "gi");
        formatted = formatted.replace(regexp, params[i]);
    }
    return formatted;
};

String.prototype.putThousandComma = function():string {
    var nStr = this+'';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
};

String.prototype.removeThousandComma = function():string {
    return this.replace(/,/g, '');
};

String.prototype.filterNumbers = function():string {
    return this.replace(/\D/g, '');
};
//Static Methods//
//String["format"] = function(format: string, params: Array<string>):string {
//    return "";
//};

//////////////////////////
//        NUMBER        //
//////////////////////////

interface Number {
    padLeft: (len: number, str: string) => string;
    putThousandComma: ()=> string;
}

Number.prototype.padLeft = function (len: number, sign: string): string {
    if(isNaN(this)) return "NaN";
    if(!isFinite(this)) return "Infinity";
    return Array(len - String(this).length + 1).join(sign || "0") + this;
};

Number.prototype.putThousandComma = function (): string {
    return this.toString().putThousandComma();
};

//////////////////////////
//         ARRAY        //
//////////////////////////

interface Array<T> {
    /**
     * Remove Item From Array, And Returns List Of Deleted Items
     * @param searchItem {*} item we use to match data
     * @param fnMatch {function}
     * @param removeOption {string} 'first' (default), 'last', 'all'
     * @returns {*[]} returns Deleted Items
     */
    remove: (searchItem: T, fnMatch:Function, removeOption:string)=>Array<T>;
    /**
     * Find item using Match function.
     * @param searchItem {*} item we use to match data
     * @param fnMatch {function} if defined this function will be used to match two models, other wise object reference will be used
     * @returns {*|null} returns matched item
     */
    contains: <Y>(searchItem:Y, fnMatch?:Function)=>boolean;
    /**
     * returns true if the matched item exists within the array, otherwise returns false
     * @param searchItem {*} item we use to match data
     * @param fnMatch {function} if defined this function will be used to match two models, other wise object reference will be used
     * @returns {boolean}
     */
    find: <Y>(searchItem:Y, fnMatch?:Function)=>T;
    /**
     * returns index of searched item at first found position, otherwise returns -1
     * @param searchItem {*} item we use to match data
     * @param fnMatch {function} if defined this function will be used to match two models, other wise object reference will be used
     * @returns {number}
     */
    indexOfMatch: <Y>(searchItem:Y, fnMatch?:Function)=>number;
    /**
     * returns index of searched item at last found position, otherwise returns -1
     * @param searchItem {*} item we use to match data
     * @param fnMatch {function} if defined this function will be used to match two models, other wise object reference will be used
     * @returns {number}
     */
    lastIndexOfMatch: <Y>(searchItem:Y, fnMatch?:Function)=>number;
}

/**
 * Remove Item From Array, And Returns List Of Deleted Items
 * @param searchItem {*} item we use to match data
 * @param fnMatch {function} if defined this function will be used to match two models, other wise object reference will be used
 * @param removeOption {string} 'first' (default), 'last', 'all'
 * @returns {*[]} returns Deleted Items
 */
Array.prototype.remove=function <T>(searchItem: T, fnMatch?:Function, removeOption:string='first'):Array<T> {
    return Util.Utility.remove(this, searchItem, fnMatch, removeOption);
};

/**
 * Find item using Match function.
 * @param searchItem {*} item we use to match data
 * @param fnMatch {function} if defined this function will be used to match two models, other wise object reference will be used
 * @returns {*|null} returns matched item
 */
Array.prototype.find=function<Y>(searchItem:Y, fnMatch?:Function) {
    return Util.Utility.find(this, searchItem, fnMatch);
};

/**
 * returns true if the matched item exists within the array, otherwise returns false
 * @param searchItem {*} item we use to match data
 * @param fnMatch {function} if defined this function will be used to match two models, other wise object reference will be used
 * @returns {boolean}
 */
Array.prototype.contains= function <Y>(searchItem: Y, fnMatch?:Function) {
    return Util.Utility.contains(this, searchItem, fnMatch);
};

/**
 * returns index of searched item at first found position, otherwise returns -1
 * @param searchItem {*} item we use to match data
 * @param fnMatch {function} if defined this function will be used to match two models, other wise object reference will be used
 * @returns {number}
 */
Array.prototype.indexOfMatch = function<Y>(searchItem: Y, fnMatch?:Function) {
    return Util.Utility.indexOf(this, searchItem, fnMatch);
};

/**
 * returns index of searched item at last found position, otherwise returns -1
 * @param searchItem {*} item we use to match data
 * @param fnMatch {function} if defined this function will be used to match two models, other wise object reference will be used
 * @returns {number}
 */
Array.prototype.lastIndexOfMatch = function<Y>(searchItem: Y, fnMatch?:Function) {
    return Util.Utility.lastIndexOf(this, searchItem, fnMatch);
};

//// Add To Extensions
//// ReSharper disable once NativeTypePrototypeExtending
//String.prototype.toDate = function () {
//    "use strict";
//
//    var nd = this.toNumberDate();
//
//    if(nd != null) return nd;
//
//    var iso8601d = this.toISO8601Date();
//
//    if(iso8601d !=null )return iso8601d;
//
//    return null;
//};
//
//String.prototype.toNumberDate = function () {
//    "use strict";
//
//    var match = /\/Date\((\d{13})\)\//.exec(this);
//
//    return match === null ? null : new Date(parseInt(match[1], 10));
//};
//
//String.prototype.toISO8601Date = function (isUTC) {
//    var regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
//        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
//        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
//    var d = this.match(new RegExp(regexp));
//
//    var offset = 0;
//    var date = new Date(d[1], 0, 1);
//
//    if (d[3]) { date.setMonth(d[3] - 1); }
//    if (d[5]) { date.setDate(d[5]); }
//    if (d[7]) { date.setHours(d[7]); }
//    if (d[8]) { date.setMinutes(d[8]); }
//    if (d[10]) { date.setSeconds(d[10]); }
//    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
//    if (d[14]) {
//        offset = (Number(d[16]) * 60) + Number(d[17]);
//        offset *= ((d[15] == '-') ? 1 : -1);
//    }
//
//    //offset -= date.getTimezoneOffset();
//    var time = (Number(date) + (offset * 60 * 1000));
//    var newDate = new Date();
//    newDate.setTime(Number(time));
//
//    return (d===null)? null : newDate;
//};
//
//// ReSharper disable once NativeTypePrototypeExtending
//Array.prototype.unshiftRange = function (items){
//    "use strict";
//
//    for(var i = items.length -1 ; i >=0  ; i--){
//        this.unshift(items[i]);
//    }
//};
//
///**
// * Unshift range of array while creating new object from owned object
// * @param items
// * @param fnConvertor : convertor function, which receive item, and return new object
// * @example myArr.unshiftRange(existList, function(c){ return new { element1: c.element1, element2: c.element2}; });
// */
//
//Array.prototype.unshiftRange = function (items, fnConvertor) {
//    "use strict";
//
//    for(var i = items.length -1 ; i >= 0; i--){
//        this.unshift(fnConvertor(items[i]));
//    }
//};
//
//
///**
// * Unshift range of array while creating new object from owned object,
// * And let to do more operation in middle of adding items... Also iterate even after last item added
// * @param items
// * @param fnConvertor(curItem) : convertor function, which receive item, and return new object
// * @param fnBeforeAdd(thisArray, lowerItem, higherItem) :
// * @example myArr.unshiftRange(existList, function(c){ return new { element1: c.element1, element2: c.element2}; });
// */
//
//Array.prototype.unshiftRange = function (items, fnConvertor, fnBeforeAdd) {
//    "use strict";
//
//    for(var i = items.length -1 ; i >= -1; i--){
//        var convertedItem = (i != -1)? fnConvertor(items[i]) : null;
//
//        if(fnBeforeAdd != undefined) {
//            //first Item on list (after unshift new item is first item)
//            fnBeforeAdd(this, convertedItem, (this[0] != undefined) ? this[0] : null);
//        }
//
//        if(i != -1)
//            this.unshift(convertedItem);
//    }
//};