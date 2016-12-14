import jQuery from "jquery";

/**
 * Breakpoint interface
 */
export interface Breakpoint {
    name: string;
    upValue: number;
}

export class Settings {
    /**
     * Breakpoints
     * @type {Array}
     */
    protected static mediaBreakpoints: Array<Breakpoint> = [];

    /**
     * Added breakpoint to mediaBreakpoints value
     * @param breakpoint
     */
    public static addMediaBreakpoint(breakpoint: Breakpoint): void {
        if (!breakpoint.name) {
            throw new RangeError("Breakpoint label should be not empty");
        }
        if (breakpoint.upValue < 1) {
            throw new RangeError("Breakpoint upValue should be positive");
        }
        Settings.mediaBreakpoints.push(breakpoint);

        // sort
        Settings.mediaBreakpoints = Settings.mediaBreakpoints.sort((a, b): number => {
            if (b.upValue > a.upValue) {
                return -1;
            } else if (b.upValue < a.upValue) {
                return 1;
            } else {
                return 0;
            }
        });
    }

    /**
     * Get Current Breakpoint
     * @param width
     * @returns {any}
     */
    public static getCurrentBreakPoint(width: number): any {
        for (let breakpoint of Settings.mediaBreakpoints) {
            if (width <= breakpoint.upValue) {
                return breakpoint;
            }
        }
        return undefined;
    }
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
    get blocks(): Array<JQuery> {
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
        jQuery(window).on("resize",
            (event) => {
                if (this.isInitialized) {
                    let currentBreakpoint = Settings.getCurrentBreakPoint(jQuery(window).width());
                    this.onScreenResize(currentBreakpoint, event);
                }
            }
        );
    }

    /**
     * On Screen Resize
     */
    public abstract onScreenResize(breakpoint: Breakpoint, event?: JQueryEventObject): void;
}

