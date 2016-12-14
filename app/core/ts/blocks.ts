import jQuery from 'jquery';

/**
 * Breakpoint interface
 */
export interface Breakpoint {
    name: string,
    upValue: number
}

/**
 * Block generic Class
 */
export abstract class Block {
    /**
     * Blocks
     */
    protected _blocks: JQuery[] = [];

    /**
     * Selector
     */
    protected _selector: string;

    /**
     * Is Initialized
     */
    private initialized: boolean = false;

    /**
     * Get blocks
     * @returns {JQuery[]}
     */
    get blocks(): JQuery[] {
        return this._blocks;
    }

    /**
     * Get Selector
     * @returns {string}
     */
    get selector(): string {
        return this._selector;
    }

    /**
     * Is Initialized
     * @returns {boolean}
     */
    get isInitialized(): boolean {
        return this.initialized;
    }

    /**
     * Constructor
     * @param selector
     */
    constructor(selector: string) {
        let blocks = jQuery(selector);
        blocks.each(
            (index, item) => {
                let currentItem: JQuery = jQuery(item);
                this._blocks.push(currentItem);
                this.initBlock(currentItem);
            }
        );
        this.initialized = true;
    }

    /**
     * Init Single Block
     */
    public abstract initBlock(block: JQuery): void;
}

export abstract class MediaBlock extends Block {
    /**
     * Constructor
     * @param selector
     */
    constructor(selector: string) {
        super(selector);
        jQuery(window).on('resize',
            (event) => {
                if (this.isInitialized) {
                    this.onScreenResize(event);
                }
            }
        );
    }

    /**
     * On Screen Resize
     */
    public abstract onScreenResize(event: JQueryEventObject): void;
}

