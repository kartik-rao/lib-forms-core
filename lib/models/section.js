var Section = /** @class */ (function () {
    function Section(id, name, title, gutter, columns) {
        if (gutter === void 0) { gutter = 0; }
        this.id = id;
        this.name = name || "section-" + id;
        this.title = title || '';
        this.gutter = gutter;
        this.columns = columns || [];
    }
    return Section;
}());
export { Section };
