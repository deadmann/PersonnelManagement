///<reference path="dialogResultType.ts"/>
/**
 * Created by Hassan on 9/10/2016.
 */
class DialogResult{
    public Result:DialogResultType;
    public Data:any;

    constructor(result: DialogResultType, data: any){
        this.Result = result;
        this.Data = data;
    }
}