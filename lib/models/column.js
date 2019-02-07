var Column = /** @class */ (function () {
    function Column(id, name, title, fields) {
        this.id = id;
        this.name = name || "column-" + id;
        this.title = title || '';
        this.fields = fields || [];
    }
    return Column;
}());
export { Column };
