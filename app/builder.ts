// This is start point of application
require('normalize-css/normalize.css');
require('font-awesome/css/font-awesome.css');
import * as templates from './core/ts/templates';

function routing(locals) {
    switch (locals.path) {
        case '/tpls/test.html':
            return templates.getPage('test');
    }
}

export default routing;