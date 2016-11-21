/**
 * Created by Hassan on 9/4/2016.
 */
var DialogResultType;
(function (DialogResultType) {
    DialogResultType[DialogResultType["Ok"] = 0] = "Ok";
    DialogResultType[DialogResultType["Cancel"] = 1] = "Cancel";
    DialogResultType[DialogResultType["Abort"] = 2] = "Abort";
    DialogResultType[DialogResultType["Yes"] = 3] = "Yes";
    DialogResultType[DialogResultType["No"] = 4] = "No";
    DialogResultType[DialogResultType["Close"] = 5] = "Close";
})(DialogResultType || (DialogResultType = {}));
