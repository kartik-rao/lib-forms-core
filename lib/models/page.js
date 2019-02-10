export class Page {
    constructor(name, icon, sections, title, subtitle) {
        this.name = name || "";
        this.icon = icon || "";
        this.sections = sections || [];
        this.title = title;
        this.subtitle = subtitle;
    }
}
