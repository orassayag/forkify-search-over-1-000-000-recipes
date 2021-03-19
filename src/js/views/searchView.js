import {
    elements,
    getElement,
    getElementAll,
    limitRecipeTitle
} from './base';

export const clearInput = (() => {
    getElement(elements.searchInput).value = '';
});

export const clearResults = (() => {
    getElement(elements.searchResultsList).innerHTML = '';
    getElement(elements.searchResPages).innerHTML = '';
});

export const highlightSelected = ((id) => {
    const resultsArr = Array.from(getElementAll(elements.recipeMenuItem));

    resultsArr.forEach((el) => {
        el.classList.remove('results__link--active');
    });

    getElement(elements.highlight.replace('%id%', id)).classList.add('results__link--active');
});

const renderRecipe = ((recipe) => {
    return `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}" title="${recipe.title}" />
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>`;
});

export const getInput = (() => {
    return getElement(elements.searchInput).value;
});

const renderButton = ((page, type) => {
    const optionPage = type === 'prev' ? page - 1 : page + 1;
    return `<button class="btn-inline results__btn--${type}" data-goto="${optionPage}">
            <span>Page ${optionPage}</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
    </button>
    `;
});

const renderButtons = ((page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let buttons = '';

    if (page === 1 && pages > 1) {
        // Only button to go to next page
        buttons = renderButton(page, 'next');
    } else if (page < pages) {
        // Both buttons
        buttons = `${renderButton(page, 'next')}
                  ${renderButton(page, 'prev')}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to previous page
        buttons = renderButton(page, 'prev');
    }
    getElement(elements.searchResPages).innerHTML = buttons;
});

export const renderResults = ((recipes, page = 1, resPerPage = 10) => {
    // Check if any recipes exist
    if (!recipes) {
        return;
    }

    // Render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    let recipesHtml = '';
    recipes.slice(start, end).forEach((el) => {
        recipesHtml += renderRecipe(el);
    });
    getElement(elements.searchResultsList).innerHTML = recipesHtml;

    // Render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
});