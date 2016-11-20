/**
 * Created by Hassan on 11/19/2016.
 */
class PositionInsertDto{
    public title:string;
    public startPrice:number;

    constructor(title: string, startPrice: number) {
        this.setup();
        if(title!=undefined) this.title = title;
        if(startPrice!=undefined) this.startPrice = startPrice;
    }

    private setup() {
        this.title = null;
        this.startPrice = 0;
    }
}