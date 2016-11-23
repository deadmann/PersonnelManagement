/**
 * Created by Hassan on 11/19/2016.
 */
class PositionInsertDto{
    public title:string;
    public startPayment:number;

    constructor(title: string, startPayment: number) {
        this.setup();
        if(title!=undefined) this.title = title;
        if(startPayment!=undefined) this.startPayment = startPayment;
    }

    private setup() {
        this.title = null;
        this.startPayment = 0;
    }
}