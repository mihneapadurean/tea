export function formatUnicorn(template, values) {
    for (let key in values) {
        template = template.replace(new RegExp("\\$\\{" + key + "\\}", "gi"), values[key]);
    }

    return template;
}