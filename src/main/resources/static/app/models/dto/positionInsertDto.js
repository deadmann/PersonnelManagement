/**
 * Created by Hassan on 11/19/2016.
 */
var PositionInsertDto = (function () {
    function PositionInsertDto(title, startPayment) {
        this.setup();
        if (title != undefined)
            this.title = title;
        if (startPayment != undefined)
            this.startPayment = startPayment;
    }
    PositionInsertDto.prototype.setup = function () {
        this.title = null;
        this.startPayment = 0;
    };
    return PositionInsertDto;
}());
