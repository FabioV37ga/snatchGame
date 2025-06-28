class Path {
    static _ID = 0;
    id;
    x1;
    y1;
    x2;
    y2;

    constructor(x1, y1, x2, y2) {
        this.id = Path._ID;
        Path._ID++;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;      
    }
}