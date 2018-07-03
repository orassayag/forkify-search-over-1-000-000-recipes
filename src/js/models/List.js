import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        if (this.items && this.items.length > 0) {
            const index = this.items.findIndex((el) => {
                return el.id === id;
            });

            if (index > -1) {
                this.items.splice(index, 1);
            }
        }
    }

    updateCount(id, newCount) {
        if (this.items && this.items.length > 0) {
            const index = this.items.findIndex((el) => {
                return el.id === id;
            });

            if (index > -1) {
                this.items[index].count = newCount;
            }
        }
    }
};