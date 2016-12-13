import * as templates from '../../core/ts/templates';

let template = require('./tpl/default.hbs');
let styles = require('./scss/logo.scss');

let params = {
    name: 'Vitaliy',
    styles: styles
};

export default templates.wrapTemplate(template, params);
