/**
 * Created by Hassan on 11/19/2016.
 */
var PositionInsertDto = (function () {
    function PositionInsertDto(title, startPrice) {
        this.setup();
        if (title != undefined)
            this.title = title;
        if (startPrice != undefined)
            this.startPrice = startPrice;
    }
    PositionInsertDto.prototype.setup = function () {
        this.title = null;
        this.startPrice = 0;
    };
    return PositionInsertDto;
}());
//# sourceMappingURL=positionInsertDto.js.map