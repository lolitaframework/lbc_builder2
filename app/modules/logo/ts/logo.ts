import * as blocks from "../../../core/ts/blocks";


export default class Logo extends blocks.MediaBlock {
    constructor(selector: string) {
        super(selector);
    }

    public initBlock(block: JQuery): void {
        block.text('hello');
    }

    public onScreenResize(event: JQueryEventObject): void {
        console.log(this.blocks);
    }
}


