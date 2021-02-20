import axios from 'axios';
import {
    key,
    proxy
} from '../config';

export default class Recipe {
    constructor(id) {
        this.id = id;
        this.title;
        this.author;
        this.img;
        this.url;
        this.ingredients;
        this.cookTime;
        this.servings;
    }

    getRecipe(callback) {
        try {
            const res = axios(`${proxy}http://food2fork.com/api/get?key=${key}&rId=${this.id}`)
                .then((res) => {
                    if (res && res.data.recipe) {
                        this.title = res.data.recipe.title;
                        this.author = res.data.recipe.publisher;
                        this.img = res.data.recipe.image_url;
                        this.url = res.data.recipe.source_url;
                        this.ingredients = res.data.recipe.ingredients;

                        if (callback) {
                            callback();
                        }
                    } else {
                        throw 'No recipe';
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    // Assuming that we need 15 minutes for each 3 ingredients
    calculateCookTime() {
        if (this.ingredients) {
            this.cookTime = (Math.ceil(this.ingredients.length / 3)) * 15;
        } else {
            this.cookTime = 'Unknown';
        }
    }

    // Assuming that we need 4 servings
    calculateServings() {
        this.servings = 4;
    }

    // Parse the ingredients array to propitiate array
    parseIngredients() {
        if (this.ingredients) {
            const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
            const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
            const units = [...unitsShort, 'kg', 'g'];

            this.ingredients = this.ingredients.map((el) => {
                if (el) {
                    // Uniform units
                    let ingredient = el.toLowerCase();
                    unitsLong.forEach((unit, i) => {
                        ingredient = ingredient.replace(unit, unitsShort[i]);
                    });

                    // Remove parentheses
                    ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ').trim();

                    // Parse ingredients into count, unit, and the ingredient itself
                    const arrIng = ingredient.split(' ');
                    const unitIndex = arrIng.findIndex((el2) => units.includes(el2));

                    let objIng;
                    if (unitIndex > -1) {
                        // There is a unit
                        const arrCount = arrIng.slice(0, unitIndex);
                        let count;
                        if (arrCount.length === 1) {
                            count = eval(arrIng[0].replace('-', '+'));
                        } else {
                            count = eval(arrIng.slice(0, unitIndex).join('+'));
                        }

                        objIng = {
                            count,
                            unit: arrIng[unitIndex],
                            ingredient: arrIng.slice(unitIndex + 1).join(' ')
                        };

                    } else if (parseInt(arrIng[0], 10)) {
                        // There is NO a unit, but the first element is a number
                        objIng = {
                            count: parseInt(arrIng[0], 10),
                            unit: '',
                            ingredient: arrIng.slice(1).join(' ')
                        };

                    } else if (unitIndex === -1) {
                        // There is NO a unit and NO number in 1st position
                        objIng = {
                            count: 1,
                            unit: '',
                            ingredient
                        };
                    }
                    return objIng;
                }
            });
        }
    }

    updateServings(type) {
        // Update servings
        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

        // Update ingredients
        this.ingredients.forEach((el) => {
            el.count *= (newServings / this.servings);
        });

        this.servings = newServings;
    }
};