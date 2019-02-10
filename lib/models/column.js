export class Column {
    constructor(id, name, title, fields) {
        this.id = id;
        this.name = name || `column-${id}`;
        this.title = title || '';
        this.fields = fields || [];
    }
}
