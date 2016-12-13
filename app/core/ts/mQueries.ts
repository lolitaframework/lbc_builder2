namespace LolitaFramework {

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
         * Block object
         * @type {JQuery}
         */
        protected block: JQuery;

        /**
         * Block selector
         * @type {string}
         */
        protected blockSelector: string;

        /**
         * Constructor
         */
        constructor(blockSelector: string) {
            this.blockSelector = blockSelector;
            this.block = jQuery(blockSelector);

            if (!this.block.length) {
                console.warn('There is no any blocks with selector: ' + this.blockSelector);
            }
        }
    }

    /**
     * MediaBreakpoints supporting
     */
    export abstract class MediaBreakpoints extends Block {

        /**
         * Array of device types
         * @type {Array}
         */
        protected static mediaBreakpoints: Array<Breakpoint> = [];

        /**
         * Current device type
         * @type {Breakpoint}
         */
        protected currentDeviceType: Breakpoint;

        /**
         * Constructor
         */
        constructor(blockSelector: string) {
            super(blockSelector);
        }

        /**
         * Init Mediabreakpoints
         */
        protected init() {
            jQuery(window).on('resize',
                () => {
                    this.onResize();
                }
            );
            this.onResize();
        }

        /**
         * On breakpoint changed
         */
        protected abstract onBreakpointChange(breakpoint: Breakpoint): void;

        /**
         * On screen resize
         */
        protected onResize() {
            MediaBreakpoints.mediaBreakpoints = MediaBreakpoints.mediaBreakpoints.sort((a, b): number => {
                if (b.upValue > a.upValue) {
                    return 1;
                } else if (b.upValue < a.upValue) {
                    return -1;
                } else {
                    return 0;
                }
            });

            let currentWidth: number = <number>jQuery(document).width();
            let currentDeviceType: Breakpoint;

            for (let breakpoint of MediaBreakpoints.mediaBreakpoints) {
                if (currentWidth <= breakpoint.upValue) {
                    currentDeviceType = breakpoint;
                } else {
                    // break;
                }
            }

            if (currentDeviceType != this.currentDeviceType) {
                this.currentDeviceType = currentDeviceType;
                if (currentDeviceType == undefined) {
                    console.warn('Current device type is undefined');
                }
                this.onBreakpointChange(currentDeviceType);
            }
        }

        /**
         * Added breakpoint to mediaBreakpoints value
         * @param {Breakpoint} breakpoint description
         */
        public static addMediaBreakpoint(breakpoint: Breakpoint): void {
            if (!breakpoint.name) {
                throw new RangeError('Breakpoint label should be not empty');
            }
            if (breakpoint.upValue < 1) {
                throw new RangeError('Breakpoint upValue should be positive');
            }
            MediaBreakpoints.mediaBreakpoints.push(breakpoint);
        }
    }
}
