import * as templates from '../../core/ts/templates';
require('font-awesome/css/font-awesome.css');

let template = require('./tpl/default.hbs');
let styles = require('./scss/logo.scss');


let params = {
    name: 'Vitaliy',
    styles: styles
};

export default templates.wrapTemplate(template, params);
