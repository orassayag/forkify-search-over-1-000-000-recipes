import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {
    elements,
    getElement,
    renderLoader,
    clearLoader,
    getClosest,
    matchSelector
} from './views/base';
import {
    polyfill
} from 'es6-promise';
import "babel-polyfill";
polyfill();

/* Global state of the app
-Search object
-Current recipe object
-Shopping list object
-Liked recipes
*/
const state = {};

// SEACH CONTROLLER
const controlSearch = (() => {
    // Get query from the view
    const query = searchView.getInput();

    if (query) {
        // New search object and add to state
        state.search = new Search(query);

        // Prepare UI for the results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(getElement(elements.searchResult));

        try {
            // Search for recipes
            state.search.getResults(() => {
                // Render results on UI
                clearLoader();
                searchView.renderResults(state.search.results);
            });
        } catch (error) {
            clearLoader();
        }
    }
});

// SEACH CONTROLLER - PAGER
const controlPageSearch = ((e) => {
    // Get the page destination by data on the button
    const btn = getClosest(e.target, elements.pagerBtn);
    if (btn) {
        const goToPage = Number(btn.dataset.goto);

        // Render page result to UI
        searchView.clearResults();
        searchView.renderResults(state.search.results, goToPage);
    }
});

// RECIPE CONTROLLER
const controlRecipe = () => {
    if (window.location.hash) {

        // Get id from the url by hash
        const id = window.location.hash.replace('#', '');

        if (id) {
            // Prepare the UI for changes
            recipeView.clearRecipe();
            renderLoader(getElement(elements.recipe));

            // Highlight selected recipe
            if (state.search) {
                searchView.highlightSelected(id);
            }

            // Create new Recipe object
            state.recipe = new Recipe(id);

            try {
                // Get recipe data
                state.recipe.getRecipe(() => {
                    // Parse ingredients
                    state.recipe.parseIngredients();

                    // Calculate servings and cooking time
                    state.recipe.calculateCookTime();
                    state.recipe.calculateServings();

                    // Render and display the recipe to the UI
                    clearLoader();
                    let isLiked = false;
                    if (state.likes) {
                        isLiked = state.likes.isLiked(id);
                    }
                    recipeView.renderRecipe(state.recipe, isLiked);
                });
            } catch (error) {
                clearLoader();
            }
        }
    }
};

// LIST CONTROLLER
const controlList = (() => {
    // Create a new list IF there is none yet
    if (!state.list) {
        state.list = new List();
    }

    // Add each in ingredient to the list and UI
    if (state.recipe) {
        state.recipe.ingredients.forEach((el) => {
            const item = state.list.addItem(el.count, el.unit, el.ingredient);
            listView.renderItem(item);
        });
    }
});

// LIKE CONTROLLER
const controlLike = (() => {
    if (!state.likes) {
        state.likes = new Likes();
    }

    const currentId = state.recipe.id;
    // User has NOT yet liked current recipe
    if (!state.likes.isLiked(currentId)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentId,
            state.recipe.title,
            state.recipe.author,
            state.recipe.img
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to the UI list
        likesView.renderLike(newLike);
    } else {
        // User HAS yet liked current recipe

        // Remove like to the state
        state.likes.deleteLike(currentId);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from the UI list
        likesView.deleteLike(currentId);
    }
    likesView.toggleLikesMenu(state.likes.getNumLikes());
});

// Restore liked recpies when page loads
window.addEventListener('load', (() => {
    state.likes = new Likes();

    // Restore likes
    state.likes.readStorage();

    // Toggle like menu button
    likesView.toggleLikesMenu(state.likes.getNumLikes());

    // Render the existing likes
    state.likes.likes.forEach((el) => {
        likesView.renderLike(el);
    });
}));

// When submit the search form, active the search control
getElement(elements.searchForm).addEventListener('submit', ((e) => {
    e.preventDefault();
    controlSearch();
}));

// When paging the search form, active the page search control
getElement(elements.searchResPages).addEventListener('click', ((e) => {
    e.preventDefault();
    controlPageSearch(e);
}));

// Add load and hash event to display the recipe
['hashchange', 'load'].forEach((e) => {
    window.addEventListener(e, controlRecipe);
});

// Handle update and delete item events
getElement(elements.shopping).addEventListener('click', ((e) => {
    // Get the clicked id
    let id;
    const item = getClosest(e.target, elements.shopingItem);
    if (item) {
        id = item.dataset.itemid;
    }

    if (id) {
        // Handle delete button
        if (matchSelector(e.target, elements.shopingDelete)) {
            // Delete from state
            state.list.deleteItem(id);

            // Delete from UI
            listView.deleteItem(id);
        } else if (matchSelector(e.target, elements.shopintItemValue)) {

            // Handle the count update
            const val = Number(e.target.value);
            state.list.updateCount(id, val);
        }
    }
}));

// Handling recipe button clicks
getElement(elements.recipe).addEventListener('click', ((e) => {
    if (matchSelector(e.target, elements.decreaseBtn)) {
        // Decrease buttnon is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (matchSelector(e.target, elements.increaseBtn)) {
        // Increase buttnon is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (matchSelector(e.target, elements.recipeBtn)) {

        // Add ingredients to shopping list
        controlList();
    } else if (matchSelector(e.target, elements.recipeLike)) {
        // Like controller
        controlLike();
    }
}));