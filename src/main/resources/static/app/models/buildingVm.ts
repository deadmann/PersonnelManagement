///<reference path="workVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
class BuildingVm {
    public id: number;
    public name: string;
    public works: Array<WorkVm>;

    constructor(id: number, name: string, works: Array<WorkVm>) {
        this.setup();
        if (id != undefined) this.id = id;
        if (name != undefined) this.name = name;
        if (works != undefined) this.works = works;
    }

    private setup() {
        this.id = 0;
        this.name = null;
        this.works = [];
    }
}