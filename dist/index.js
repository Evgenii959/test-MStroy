"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var TreeStore = /** @class */ (function () {
    function TreeStore(data) {
        var _this = this;
        this.items = new Map();
        this.childrenMap = new Map();
        data.forEach(function (item) {
            var _a;
            var id = item.id, parent = item.parent;
            _this.items.set(id, item);
            if (!_this.childrenMap.has(parent)) {
                _this.childrenMap.set(parent, []);
            }
            (_a = _this.childrenMap.get(parent)) === null || _a === void 0 ? void 0 : _a.push(item);
        });
    }
    TreeStore.prototype.getAll = function () {
        return Array.from(this.items.values());
    };
    TreeStore.prototype.getItem = function (id) {
        return this.items.get(id);
    };
    TreeStore.prototype.getChildren = function (id) {
        return this.childrenMap.get(id) || [];
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var result = [];
        var stack = __spreadArray([], this.getChildren(id), true);
        while (stack.length) {
            var current = stack.pop();
            if (current) {
                result.push(current);
                stack.push.apply(stack, this.getChildren(current.id));
            }
        }
        return result;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var result = [];
        var current = this.getItem(id);
        while (current && current.parent !== 'root') {
            result.push(current);
            current = this.getItem(current.parent);
        }
        if (current) {
            result.push(current);
        }
        return result.reverse();
    };
    return TreeStore;
}());
var items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
var ts = new TreeStore(items);
console.log(ts.getAll()); // Полный массив элементов
console.log(ts.getItem(7)); // Элемент с id 7
console.log(ts.getChildren(4)); // Дочерние элементы элемента с id 4
console.log(ts.getAllChildren(2)); // Все потомки элемента с id 2
console.log(ts.getAllParents(7)); // Все родители элемента с id 7
