export const elements = {
    searchForm: '.search',
    searchInput: '.search__field',
    searchResult: '.results',
    searchResultsList: '.results__list',
    loader: '.loader',
    searchResPages: '.results__pages',
    pagerBtn: '.btn-inline',
    recipe: '.recipe',
    highlight: '.results__link[href="#%id%"]',
    recipeMenuItem: '.results__link',
    decreaseBtn: '.btn-decrease, .btn-decrease *',
    increaseBtn: '.btn-increase, .btn-increase *',
    servings: '.recipe__info-data--people',
    ingredientsList: '.recipe__ingredient-list',
    shopping: '.shopping__list',
    shoppingItemId: '[data-itemid="%id%"]',
    recipeBtn: '.recipe__btn--add, .recipe__btn--add *',
    shoppingItem: '.shopping__item',
    shoppingDelete: '.shopping__delete, .shopping__delete *',
    shopintItemValue: '.shopping__count-value',
    recipeLike: '.recipe__love, .recipe__love *',
    likeImg: 'icon-heart-outlined',
    likedImg: 'icon-heart',
    recipeLikeUse: '.recipe__love use',
    likesMenu: '.likes__field',
    likesList: '.likes__list',
    allLikes: '.likes__link[href="#%id%"]'
};

export const getElement = ((elementName) => {
    return document.querySelector(elementName)
});

export const getElementAll = ((elementName) => {
    return document.querySelectorAll(elementName)
});

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title && title.length > 17) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
};

export const renderLoader = ((parent) => {
    const loader = `
        <div class="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
});

export const matchSelector = ((node, selector) => {
    let func = node.matches || node.msMatchesSelector;
    return func.call(node, selector);
});

export const getClosest = ((elem, selector) => {
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) { }
                return i > -1;
            };
    }

    // Get closest match
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;
});

export const clearLoader = (() => {
    const loader = getElement(elements.loader);
    if (loader) {
        loader.parentNode.removeChild(loader);
    }
});