// This is start point of application

import * as templates from './core/ts/templates';
require('normalize-css/normalize.css');
require('font-awesome/css/font-awesome.css');

function routing(locals: any) {
    switch (locals.path) {
        case '/tpls/test.html':
            return templates.getPage('test');
    }
}

export default routing;