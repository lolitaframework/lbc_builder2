///<reference path="../def/custom.d.ts"/>

/**
 * Update Object from source - only first level
 * @param object
 * @param source
 * @returns {Object}
 */
function updateObject(object:Object, source:Object) {
    for (let key in source) {
        object[key] = source[key];
    }
    return object;
}

/**
 * Get Page
 * @param name
 * @param params
 * @returns {any}
 */
export function getPage(name: string, params?: Object) {
    let page = require('../../pages/' + name + '/build').default;
    if (params) {
        return page(params)
    } else {
        return page();
    }
}

/**
 * Get Layout
 * @param name
 * @param params
 * @returns {any}
 */
export function getLayout(name: string, params?: Object) {
    let layout = require('../../layouts/' + name + '/build').default;
    if (params) {
        return layout(params)
    } else {
        return layout();
    }
}

/**
 * Get Module
 * @param name
 * @param params
 * @returns {any}
 */
export function getModule(name: string, params?: Object) {
    let module = require('../../modules/' + name + '/build').default;
    if (params) {
        return module(params)
    } else {
        return module();
    }
}

/**
 * Get Component
 * @param name
 * @param params
 * @returns {any}
 */
export function getComponent(name: string, params?: Object) {
    let component = require('../../modules/_components/' + name + '/build').default;
    if (params) {
        return component(params)
    } else {
        return component();
    }
}

/**
 * Template Closure
 * @param template
 * @param params
 * @returns {any}
 */
export function wrapTemplate(template: any, params?: Object ) {
    if (params) {
        return (externalParams?: Object) => {
            if (externalParams) {
                params = updateObject(params, externalParams);
            }
            return template(params);
        };
    } else {
        return template;
    }
}