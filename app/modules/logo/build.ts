import * as templates from '../../core/ts/templates';

let template = require('./tpl/default.hbs');
let styles = require('./scss/logo.scss');
let image = require('./img/img.jpg');
let logo = require('./img/logo.svg');
require('./fonts/test.woff');

let params = {
    name: 'Vitaliy',
    image: image,
    styles: styles
};

export default templates.wrapTemplate(template, params);
