import * as templates from '../../core/ts/templates';
let template = require('./tpl/default.hbs');
let styles = require('./scss/header.scss');

let params = {
    logo: templates.getModule('logo'),
    styles: styles
};

export default templates.wrapTemplate(template, params);


