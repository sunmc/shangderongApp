export class AreaOption {
    options: Area[];
}

export class Area {
    text: string;
    value: string;
    parentVal: string;
    ifShow: boolean;
    constructor() {
        this.ifShow = false;
    }
}
