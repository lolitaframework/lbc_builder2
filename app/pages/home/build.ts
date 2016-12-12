import * as templates from '../../core/ts/templates';
let template = require('./tpl/default.hbs');

let params = {
    header: templates.getLayout('header')
};

export default templates.wrapTemplate(template, params);