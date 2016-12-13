import * as templates from '../../core/ts/templates';

let template = require('./tpl/default.hbs');
let styles = require('./scss/logo.scss');

let params = {
    name: 'Logo',
    styles: styles
};

export default templates.wrapTemplate(template, params);
