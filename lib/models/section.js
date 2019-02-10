export class Section {
    constructor(id, name, title, gutter = 0, columns) {
        this.id = id;
        this.name = name || `section-${id}`;
        this.title = title || '';
        this.gutter = gutter;
        this.columns = columns || [];
    }
}
