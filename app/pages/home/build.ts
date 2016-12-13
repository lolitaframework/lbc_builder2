import * as templates from '../../core/ts/templates';
let template = require('./tpl/default.hbs');

let params = {
    header: templates.getLayout('header'),
    footer: templates.getLayout('footer'),
    name: 'This is home page'
};

export default templates.wrapTemplate(template, params);
