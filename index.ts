import Handlebars from "handlebars";

const cv_path = "cv.json";
const cv_file = Bun.file(cv_path);
const cv = await cv_file.json();

const template_path = "theme/template.hbs";
const template_file = Bun.file(template_path);
const template_source = await template_file.text();


const template = Handlebars.compile(template_source);
console.log(template(cv));
