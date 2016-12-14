// This is start for Browser

import {Settings} from "./core/ts/blocks";
import Logo from "./modules/logo/ts/logo";

// define site settings
Settings.addMediaBreakpoint({name: "xl", upValue: 9999});
Settings.addMediaBreakpoint({name: "lg", upValue: 1400});
Settings.addMediaBreakpoint({name: "md", upValue: 1000});
Settings.addMediaBreakpoint({name: "sm", upValue: 768});

export namespace LolitaFramework {
    export let logo = new Logo(".something");
}

