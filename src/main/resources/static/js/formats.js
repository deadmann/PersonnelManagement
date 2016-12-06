/**
 * Created by Hassan Faghihi on 7/22/2015.
 */
angular.module('hsFormats', [])
    .controller('ctrl',['$scope', '$filter', function ($scope, $filter) {

    }])

    //Basic And Buggy Operation
    //directive('format', ['$filter', function ($filter) {
    //    return {
    //        require: '?ngModel',
    //        link: function (scope, elem, attrs, ctrl) {
    //            if (!ctrl) return;
    //            ctrl.$formatters.unshift(function (a) {
    //                return $filter(attrs.format)(ctrl.$modelValue)
    //            });
    //            ctrl.$parsers.unshift(function (viewValue) {
    //                var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
    //                elem.val($filter(attrs.format)(plainNumber));
    //                return plainNumber;
    //            });
    //        }
    //    };
    //}])

    //hsNotNull Prevent Empty Text Box
    //hsFormat Format Number Data
    .directive('hsInt', ['$filter', function ($filter){
        function link(scope, elem, attrs, ngModelCtrl) {

            if(!ngModelCtrl && attrs.hsNotNull == undefined)
                return;

            function fromModel(text){
                var emptySign = (attrs.hsNotNull != undefined)? '0': '';

                var unstableResult = (ngModelCtrl)? ngModelCtrl.$modelValue.toString().replace(/[^0-9\.]/g, '') : emptySign;

                var result = Utility.tryParseInt(unstableResult, unstableResult);

                return (attrs.hsFormat != undefined)? $filter(attrs.hsFormat)(result) : result;
            }

            function fromUser(text) {
                var originInput = text.replace(/[^0-9]/g, '');
                var transformedInput = originInput;

                transformedInput = transformedInput.trimStart('0');

                if( (attrs.hsNotNull!=undefined || originInput == '0') && (transformedInput == undefined || transformedInput == ''))
                    transformedInput='0';

                console.log(transformedInput);

                //If get Updated, Function Will Call Again - Careful Here
                //if(transformedInput != originInput) { //!== => (4,4) -> true   X Wrong Answer
                    //Apply Filter On The Number
                    var filteredValue = (attrs.hsFormat != undefined)? $filter(attrs.hsFormat)(transformedInput) : transformedInput;
                    //If TextBox Can Be Empty And User Clear It Up, Then Clear Value, And Don't Use Number Format
                    var nullCheckedValue = (attrs.hsNotNull !=undefined || transformedInput != '')? filteredValue: '';
                    ngModelCtrl.$setViewValue(nullCheckedValue);//transformedInput);
                    ngModelCtrl.$render();
                //}

                return transformedInput;
            }
            ngModelCtrl.$formatters.push(fromModel);
            ngModelCtrl.$parsers.push(fromUser);
        }
        return {
            restrict: 'A',
            require: '?ngModel',
            link: link
        };
    }])
    .directive('hsFloat', ['$filter', function ($filter){
        function link(scope, elem, attrs, ngModelCtrl) {

            if(!ngModelCtrl && attrs.hsNotNull == undefined)
                return;

            function fromModel(text){
                var emptySign = (attrs.hsNotNull != undefined)? '0': '';

                var unstableResult = (ngModelCtrl)? ngModelCtrl.$modelValue.toString().replace(/[^0-9\.]/g, '') : emptySign;

                var result = Utility.tryParseFloat(unstableResult, unstableResult);

                return (attrs.hsFormat != undefined)? $filter(attrs.hsFormat)(result) : result;
            }

            function fromUser(text) {
                var originInput = text.replace(/[^0-9\.]/g, '');

                var transformedInput = originInput;

                //It may be a copy paste, so we may even have more than 2 '.'
                while(transformedInput.indexOf('.') != transformedInput.lastIndexOf('.')) {//It contains double '.'
                    transformedInput = transformedInput.replaceAt(transformedInput.lastIndexOf('.'), 1, '');
                }

                if( !transformedInput.startWith('0.'))
                    transformedInput = transformedInput.trimStart('0');

                if( (attrs.hsNotNull!=undefined || originInput == '0') && (transformedInput == undefined || transformedInput == ''))
                    transformedInput='0';
                console.log(transformedInput);
                //If get Updated, Function Will Call Again - Careful Here
                //if(transformedInput != originInput) { //!== => (4,4) -> true   X Wrong Answer
                    var hasDotInTheEnd = transformedInput.endWith('.');
                    if(hasDotInTheEnd){
                        transformedInput.trimEnd('.');
                    }

                    //Apply Filter On The Number
                    var filteredValue = (attrs.hsFormat != undefined)? $filter(attrs.hsFormat)(transformedInput) : transformedInput;
                    //If TextBox Can Be Empty And User Clear It Up, Then Clear Value, And Don't Use Number Format
                    var nullCheckedValue = (attrs.hsNotNull!=undefined || transformedInput != '')? filteredValue: '';
                    //elem.val($filter(attrs.format)(plainNumber));
                    ngModelCtrl.$setViewValue(nullCheckedValue + (hasDotInTheEnd?'.':''));//transformedInput);
                    ngModelCtrl.$render();
                //}

                return transformedInput;
            }

            ngModelCtrl.$formatters.push(fromModel);
            ngModelCtrl.$parsers.push(fromUser);
        }
        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    }]);