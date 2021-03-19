import {
    elements,
    getElement
} from './base';

export const renderItem = ((item) => {
    if (!item) {
        return;
    }

    const markup = `
    <li class="shopping__item" data-itemid="${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}" class="shopping__count-value"></input>
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;
    getElement(elements.shopping).insertAdjacentHTML('beforeend', markup);
});

export const deleteItem = ((id) => {
    if (!id) {
        return;
    }

    const item = getElement(elements.shoppingItemId.replace('%id%', id));
    if (item) {
        item.parentNode.removeChild(item);
    }
});