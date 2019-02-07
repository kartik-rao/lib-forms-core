var Page = /** @class */ (function () {
    function Page(name, icon, sections, title, subtitle) {
        this.name = name || "";
        this.icon = icon || "";
        this.sections = sections || [];
        this.title = title;
        this.subtitle = subtitle;
    }
    return Page;
}());
export { Page };
