import * as templates from '../../core/ts/templates';
let template = require('./tpl/default.hbs');

let params = {
    testBlock: templates.getModule('logo')
};

export default templates.wrapTemplate(template, params);