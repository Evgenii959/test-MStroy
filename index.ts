class TreeStore {
  private items: Map<string | number, any>;
  private childrenMap: Map<string | number, any[]>;

  constructor(data: { id: string | number, parent: string | number, [key: string]: any }[]) {
    this.items = new Map();
    this.childrenMap = new Map();

    data.forEach(item => {
      const { id, parent } = item;
      this.items.set(id, item);

      if (!this.childrenMap.has(parent)) {
        this.childrenMap.set(parent, []);
      }
      this.childrenMap.get(parent)?.push(item);
    });
  }

  getAll() {
    return Array.from(this.items.values());
  }

  getItem(id: string | number) {
    return this.items.get(id);
  }

  getChildren(id: string | number) {
    return this.childrenMap.get(id) || [];
  }

  getAllChildren(id: string | number): any[] {
    const result: any[] = [];
    const stack: any[] = [...this.getChildren(id)];

    while (stack.length) {
      const current = stack.pop();
      if (current) {
        result.push(current);
        stack.push(...this.getChildren(current.id));
      }
    }

    return result;
  }

  getAllParents(id: string | number): any[] {
    const result: any[] = [];
    let current = this.getItem(id);

    while (current && current.parent !== 'root') {
      result.push(current);
      current = this.getItem(current.parent);
    }

    if (current) {
      result.push(current);
    }

    return result.reverse();
  }
}

const items = [
  { id: 1, parent: 'root' },
  { id: 2, parent: 1, type: 'test' },
  { id: 3, parent: 1, type: 'test' },
  { id: 4, parent: 2, type: 'test' },
  { id: 5, parent: 2, type: 'test' },
  { id: 6, parent: 2, type: 'test' },
  { id: 7, parent: 4, type: null },
  { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

console.log(ts.getAll()); // Полный массив элементов
console.log(ts.getItem(7)); // Элемент с id 7
console.log(ts.getChildren(4)); // Дочерние элементы элемента с id 4
console.log(ts.getAllChildren(2)); // Все потомки элемента с id 2
console.log(ts.getAllParents(7)); // Все родители элемента с id 7
