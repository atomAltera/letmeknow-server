import {compile} from "handlebars";

/**
 * Takes template string and params and interpolates it
 */
export function renderTemplate(template: string, params: any): string {
    const compiledTemplate = compile(template);
    return compiledTemplate(params);
}
