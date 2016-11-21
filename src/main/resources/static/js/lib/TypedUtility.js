/**
 * Created by Hassan Faghihi on 7/25/2015.
 */
var Util;
(function (Util) {
    var Utility = (function () {
        function Utility() {
        }
        Utility.isNullOrUndefined = function (obj) {
            //return obj == null //juggling-check
            return typeof obj === 'undefined' || obj === null; //strict-check
        };
        Utility.isNullOrUndefinedOrEmpty = function (obj) {
            if (Utility.isNullOrUndefined(obj))
                return true;
            //typeof for primitive string, instanceof for objective string
            if (typeof (obj) == "string" || obj instanceof String)
                return obj.valueOf() == "";
            else if (obj instanceof Array)
                return obj.length === 0;
            throw "Not Supported Exception";
        };
        Utility.isNullOrUndefinedOrWhiteSpace = function (obj) {
            return Utility.isNullOrUndefined(obj) || obj.valueOf().trim() === "";
        };
        Utility.isNumeric = function (obj) {
            //From JQuery
            return !isNaN(parseFloat(obj)) && isFinite(obj);
        };
        Utility.tryParseInt = function (str, defaultValue) {
            var retValue = defaultValue;
            if (str !== null) {
                if (str.length > 0) {
                    if (!isNaN(str)) {
                        retValue = parseInt(str);
                    }
                }
            }
            return retValue;
        };
        Utility.tryParseFloat = function (str, defaultValue) {
            var retValue = defaultValue;
            if (str !== null) {
                if (str.length > 0) {
                    if (!isNaN(str)) {
                        retValue = parseFloat(str);
                    }
                }
            }
            return retValue;
        };
        /**
         * Remove Item From Array, And Returns List Of Deleted Items
         * @param itemList {*[]}
         * @param searchItem {*}
         * @param fnMatch {function}
         * @param removeOption {string} 'first' (default), 'last', 'all'
         * @returns {*[]} returns Deleted Items
         */
        Utility.remove = function (itemList, searchItem, fnMatch, removeOption) {
            if (removeOption === void 0) { removeOption = 'first'; }
            var index;
            if (removeOption == 'first') {
                index = this.indexOf(itemList, searchItem, fnMatch);
                return itemList.splice(index, 1);
            }
            else if (removeOption == 'last') {
                index = this.indexOf(itemList, searchItem, fnMatch);
                return itemList.splice(index, 1);
            }
            else if (removeOption == 'all') {
                var deletedItems = [];
                while ((index = this.indexOf(itemList, searchItem, fnMatch)) != -1) {
                    deletedItems.push(itemList.splice(index, 1)[0]);
                }
                return deletedItems;
            }
            else {
                throw "remove option is not supported";
            }
        };
        Utility.find = function (arr, searchItem, fnMatch) {
            for (var i = 0; i < arr.length; i++) {
                if (fnMatch) {
                    if (fnMatch(arr[i], searchItem)) {
                        return arr[i];
                    }
                }
                else {
                    if (arr[i] === searchItem) {
                        return arr[i];
                    }
                }
            }
            return null;
        };
        Utility.forEach = function (arr, callBack) {
            for (var i = 0; i < arr.length; i++) {
                callBack(arr[i]);
            }
        };
        Utility.hasDuplicates = function (arr) {
            var x = {}, len = arr.length;
            for (var i = 0; i < len; i++) {
                if (x[arr[i]] === true) {
                    return true;
                }
                x[arr[i]] = true;
            }
            return false;
        };
        Utility.isDistinct = function (arr) {
            return !Utility.hasDuplicates(arr);
        };
        Utility.contains = function (items, searchItem, fnMatch) {
            var flag = false;
            for (var i = 0; i < items.length; i++) {
                if (fnMatch) {
                    if (fnMatch(items[i], searchItem)) {
                        flag = true;
                    }
                }
                else {
                    if (items[i] === searchItem) {
                        flag = true;
                    }
                }
            }
            return flag;
        };
        Utility.indexOf = function (items, searchItem, fnMatch) {
            //If we don't have specific match function, we can use array indexOf if exists
            if (!fnMatch && Array.prototype.indexOf) {
                return items.indexOf(searchItem);
            }
            for (var i = 0; i < items.length; i++) {
                if (fnMatch) {
                    if (fnMatch(items[i], searchItem)) {
                        return i;
                    }
                }
                else {
                    if (items[i] === searchItem) {
                        return i;
                    }
                }
            }
            return -1;
        };
        Utility.lastIndexOf = function (items, searchItem, fnMatch) {
            //If we don't have specific match function, we can use array lastIndexOf if exists
            if (!fnMatch && Array.prototype.lastIndexOf) {
                return items.lastIndexOf(searchItem);
            }
            var index = -1;
            for (var i = 0; i < items.length; i++) {
                if (fnMatch) {
                    if (fnMatch(items[i], searchItem)) {
                        index = i;
                    }
                }
                else {
                    if (items[i] === searchItem) {
                        return i;
                    }
                }
            }
            return index;
        };
        /**
         * Padding desired value with specified character
         * @param val {string} Value to pad
         * @param len {number} desired total length
         * @param sign {string} the sign to used for padding (default '0')
         * @returns {string}
         */
        Utility.padLeft = function (val, len, sign) {
            return Array(len - String(val).length + 1).join(sign || "0") + val;
        };
        /**
         * Padding desired value with specified character
         * @param val {string} Value to pad
         * @param len {number} desired total length
         * @param sign {string} the sign to used for padding (default '0')
         * @returns {string}
         */
        Utility.padRight = function (val, len, sign) {
            return val + Array(len - String(val).length + 1).join(sign || "0");
        };
        Utility.escapeRegExp = function (str) {
            return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        };
        Utility.compareDates = function (date1, date2) {
            var dateNum1 = parseInt(date1.replace(/\D/g, ''));
            var dateNum2 = parseInt(date2.replace(/\D/g, ''));
            return dateNum1 - dateNum2;
        };
        Utility.isBetweenDates = function (date, startDate, endDate) {
            return (this.compareDates(date, startDate) >= 0 && this.compareDates(date, endDate) <= 0);
        };
        /**
         * (Slow) Generate Random Distinguishable Human Readable Color
         * @param number
         * @returns {string[]} String Array of Hexadecimal RGB color
         */
        Utility.generateRandomDistinguishableColors = function (number) {
            /*
             This generates colors using the following algorithm:
             Each time you create a color:
             Create a random, but attractive, color{
             Red, Green, and Blue are set to random luminosity.
             One random value is reduced significantly to prevent grayscale.
             Another is increased by a random amount up to 100%.
             They are mapped to a random total luminosity in a medium-high range (bright but not white).
             }
             Check for similarity to other colors{
             Check if the colors are very close together in value.
             Check if the colors are of similar hue and saturation.
             Check if the colors are of similar luminosity.
             If the random color is too similar to another,
             and there is still a good opportunity to change it:
             Change the hue of the random color and try again.
             }
             Output array of all colors generated
             */
            //if we've passed preloaded colors and they're in hex format
            if (typeof (arguments[1]) != 'undefined' && arguments[1].constructor == Array && arguments[1][0] && arguments[1][0].constructor != Array) {
                for (var i = 0; i < arguments[1].length; i++) {
                    var vals = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(arguments[1][i]); //get RGB values
                    arguments[1][i] = [parseInt(vals[1], 16), parseInt(vals[2], 16), parseInt(vals[3], 16)]; //and convert them to base 10
                }
            }
            var loadedColors = typeof (arguments[1]) == 'undefined' ? [] : arguments[1], //predefine colors in the set
            number = number + loadedColors.length, //reset number to include the colors already passed
            lastLoadedReduction = Math.floor(Math.random() * 3), //set a random value to be the first to decrease
            rgbToHSL = function (rgb) {
                var r = rgb[0], g = rgb[1], b = rgb[2], cMax = Math.max(r, g, b), cMin = Math.min(r, g, b), delta = cMax - cMin, l = (cMax + cMin) / 2, h = 0, s = 0;
                if (delta == 0)
                    h = 0;
                else if (cMax == r)
                    h = 60 * ((g - b) / delta % 6);
                else if (cMax == g)
                    h = 60 * ((b - r) / delta + 2);
                else
                    h = 60 * ((r - g) / delta + 4);
                if (delta == 0)
                    s = 0;
                else
                    s = delta / (1 - Math.abs(2 * l - 1));
                return [h, s, l];
            }, hslToRGB = function (hsl) {
                var h = hsl[0], s = hsl[1], l = hsl[2], c = (1 - Math.abs(2 * l - 1)) * s, x = c * (1 - Math.abs(h / 60 % 2 - 1)), m = l - c / 2, r, g, b;
                if (h < 60) {
                    r = c;
                    g = x;
                    b = 0;
                }
                else if (h < 120) {
                    r = x;
                    g = c;
                    b = 0;
                }
                else if (h < 180) {
                    r = 0;
                    g = c;
                    b = x;
                }
                else if (h < 240) {
                    r = 0;
                    g = x;
                    b = c;
                }
                else if (h < 300) {
                    r = x;
                    g = 0;
                    b = c;
                }
                else {
                    r = c;
                    g = 0;
                    b = x;
                }
                return [r, g, b];
            }, shiftHue = function (rgb, degree) {
                var hsl = rgbToHSL(rgb); //convert to hue/saturation/luminosity to modify hue
                hsl[0] += degree; //increment the hue
                if (hsl[0] > 360) {
                    hsl[0] -= 360; //decrease it mod 360
                }
                else if (hsl[0] < 0) {
                    hsl[0] += 360; //increase it mod 360
                }
                return hslToRGB(hsl); //convert back to rgb
            }, differenceRecursions = {
                differences: [],
                values: [] //used to store the actual colors
            }, fixDifference = function (color) {
                if (differenceRecursions.values.length > 23) {
                    //if so, get the biggest value in differences that we have and its corresponding value
                    var ret = differenceRecursions.values[differenceRecursions.differences.indexOf(Math.max.apply(null, differenceRecursions.differences))];
                    differenceRecursions = { differences: [], values: [] }; //then reset the recursions array, because we're done now
                    return ret; //and then return up the recursion chain
                } //okay, so we still have some hues to try.
                var differences = []; //an array of the "difference" numbers we're going to generate.
                for (var i = 0; i < loadedColors.length; i++) {
                    var difference = loadedColors[i].map(function (value, index) {
                        return Math.abs(value - color[index]); //replace it with the difference in that value between the two colors
                    }), sumFunction = function (sum, value) {
                        return sum + value;
                    }, sumDifference = difference.reduce(sumFunction), //add up the difference array
                    loadedColorLuminosity = loadedColors[i].reduce(sumFunction), //get the total luminosity of the already generated color
                    currentColorLuminosity = color.reduce(sumFunction), //get the total luminosity of the current color
                    lumDifference = Math.abs(loadedColorLuminosity - currentColorLuminosity), //get the difference in luminosity between the two
                    //how close are these two colors to being the same luminosity and saturation?
                    differenceRange = Math.max.apply(null, difference) - Math.min.apply(null, difference), luminosityFactor = 50, //how much difference in luminosity the human eye should be able to detect easily
                    rangeFactor = 75; //how much difference in luminosity and saturation the human eye should be able to dect easily
                    if (luminosityFactor / (lumDifference + 1) * rangeFactor / (differenceRange + 1) > 1) {
                        //set the biggest difference for these colors to be whatever is most significant
                        differences.push(Math.min(differenceRange + lumDifference, sumDifference));
                    }
                    differences.push(sumDifference); //otherwise output the raw difference in RGB values
                }
                var breakdownAt = 64, //if you're generating this many colors or more, don't try so hard to make unique hues, because you might fail.
                breakdownFactor = 25, //how much should additional colors decrease the acceptable difference
                shiftByDegrees = 15, //how many degrees of hue should we iterate through if this fails
                acceptableDifference = 250, //how much difference is unacceptable between colors
                breakVal = loadedColors.length / number * (number - breakdownAt), //break down progressively (if it's the second color, you can still make it a unique hue)
                totalDifference = Math.min.apply(null, differences); //get the color closest to the current color
                if (totalDifference > acceptableDifference - (breakVal < 0 ? 0 : breakVal) * breakdownFactor) {
                    differenceRecursions = { differences: [], values: [] }; //reset the recursions object, because we're done
                    return color; //and return that color
                } //otherwise the current color is too much like another
                //start by adding this recursion's data into the recursions object
                differenceRecursions.differences.push(totalDifference);
                differenceRecursions.values.push(color);
                color = shiftHue(color, shiftByDegrees); //then increment the color's hue
                return fixDifference(color); //and try again
            }, color = function () {
                var scale = function (x) {
                    return x * 210 + 300; //(no brighter than #ff0 or #0ff or #f0f, but still pretty bright)
                }, randVal = function () {
                    return Math.floor(scale(Math.random()));
                }, luminosity = randVal(), //random luminosity
                red = randVal(), //random color values
                green = randVal(), //these could be any random integer but we'll use the same function as for luminosity
                blue = randVal(), rescale, //we'll define this later
                thisColor = [red, green, blue], //an array of the random values
                /*
                 #ff0 and #9e0 are not the same colors, but they are on the same range of the spectrum, namely without blue.
                 Try to choose colors such that consecutive colors are on different ranges of the spectrum.
                 This shouldn't always happen, but it should happen more often then not.
                 Using a factor of 2.3, we'll only get the same range of spectrum 15% of the time.
                 */
                valueToReduce = Math.floor(lastLoadedReduction + 1 + Math.random() * 2.3) % 3, //which value to reduce
                /*
                 Because 300 and 510 are fairly close in reference to zero,
                 increase one of the remaining values by some arbitrary percent betweeen 0% and 100%,
                 so that our remaining two values can be somewhat different.
                 */
                valueToIncrease = Math.floor(valueToIncrease + 1 + Math.random() * 2) % 3, //which value to increase (not the one we reduced)
                increaseBy = Math.random() + 1; //how much to increase it by
                lastLoadedReduction = valueToReduce; //next time we make a color, try not to reduce the same one
                thisColor[valueToReduce] = Math.floor(thisColor[valueToReduce] / 16); //reduce one of the values
                thisColor[valueToIncrease] = Math.ceil(thisColor[valueToIncrease] * increaseBy); //increase one of the values
                rescale = function (x) {
                    return x * luminosity / thisColor.reduce(function (a, b) {
                        return a + b;
                    }); //sum red, green, and blue to get the total luminosity
                };
                thisColor = fixDifference(thisColor.map(function (a) {
                    return rescale(a);
                })); //fix the hue so that our color is recognizable
                if (Math.max.apply(null, thisColor) > 255) {
                    rescale = function (x) {
                        return x * 255 / Math.max.apply(null, thisColor);
                    };
                    thisColor = thisColor.map(function (a) {
                        return rescale(a);
                    });
                }
                return thisColor;
            };
            for (var i = loadedColors.length; i < number; i++) {
                loadedColors.push(color().map(function (value) {
                    return Math.round(value); //round RGB values to integers
                }));
            }
            //then, after you've made all your colors, convert them to hex codes and return them.
            return loadedColors.map(function (color) {
                var hx = function (c) {
                    var h = c.toString(16); //then convert it to a hex code
                    return h.length < 2 ? '0' + h : h; //and assert that it's two digits
                };
                return "#" + hx(color[0]) + hx(color[1]) + hx(color[2]); //then return the hex code
            });
        };
        ;
        /**
         * (Fast) Generate Random Color
         * @param number {number}
         * @returns {Array<object>} Object Array of HSL Color
         */
        Utility.generateRandomHslColors = function (number) {
            var colors = [];
            for (var i = 0; i < 360; i += 360 / number) {
                var HSLColor = {
                    hue: null, saturation: null, lightness: null
                };
                HSLColor.hue = i;
                HSLColor.saturation = 90 + Math.random() * 10;
                HSLColor.lightness = 50 + Math.random() * 10;
                colors.push(HSLColor);
            }
            return colors;
        };
        ;
        /**
         * Converts an HSL color value to RGB. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes h, s, and l are contained in the set [0, 1] and
         * returns r, g, and b in the set [0, 255].
         *
         * @param   {number}  h       The hue
         * @param   {number}  s       The saturation
         * @param   {number}  l       The lightness
         * @return  {Array}           The RGB representation
         */
        Utility.hslToRgb = function (h, s, l) {
            var r, g, b;
            if (s == 0) {
                r = g = b = l; // achromatic
            }
            else {
                var hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0)
                        t += 1;
                    if (t > 1)
                        t -= 1;
                    if (t < 1 / 6)
                        return p + (q - p) * 6 * t;
                    if (t < 1 / 2)
                        return q;
                    if (t < 2 / 3)
                        return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        };
        /**
         * Converts an RGB color value to HSL. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes r, g, and b are contained in the set [0, 255] and
         * returns h, s, and l in the set [0, 1].
         *
         * @param   {number}  r       The red color value
         * @param   {number}  g       The green color value
         * @param   {number}  b       The blue color value
         * @return  {Array}           The HSL representation
         */
        Utility.rgbToHsl = function (r, g, b) {
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;
            if (max == min) {
                h = s = 0; // achromatic
            }
            else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return [h, s, l];
        };
        /**
         * Convert RGB to Hex
         * @param r
         * @param g
         * @param b
         * @returns {string}
         */
        Utility.rgbToHex = function (r, g, b) {
            var componentToHex = function (c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            };
            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        };
        /**
         * Convert Hex to RGB
         * @param hex
         * @returns {{r: number, g: number, b: number}}
         */
        Utility.hexToRgb = function (hex) {
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        };
        /**
         * Return all values within passed enum
         * @param enumeration {Enumerator}
         * @returns {Array<string>}
         */
        Utility.getEnumValues = function (enumeration) {
            var result = [];
            for (var item in enumeration) {
                var isValueProperty = parseInt(item, 10) >= 0; //parse int in system of base 10 (normal human numerical language)
                if (!isValueProperty) {
                    result.push(item);
                }
            }
            return result;
        };
        /**
         * Return all values within passed enum
         * @param enumeration {Enumerator}
         * @returns {Array<number>}
         */
        Utility.getEnumKeys = function (enumeration) {
            var result = [];
            var value;
            for (var item in enumeration) {
                var isValueProperty = (value = parseInt(item, 10)) >= 0; //parse int in system of base 10 (normal human numerical language)
                if (isValueProperty) {
                    result.push(value);
                }
            }
            return result;
        };
        return Utility;
    }());
    Util.Utility = Utility;
})(Util || (Util = {}));
