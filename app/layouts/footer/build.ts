import * as templates from '../../core/ts/templates';
let template = require('./tpl/default.hbs');
let styles = require('./scss/footer.scss');

let params = {
    styles: styles
};

export default templates.wrapTemplate(template, params);


