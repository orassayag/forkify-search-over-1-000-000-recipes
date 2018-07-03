import {
    elements,
    getElement,
    limitRecipeTitle
} from './base';

export const toggleLikeBtn = ((isLiked) => {
    const iconString = isLiked ? elements.likedImg : elements.likeImg;
    getElement(elements.recipeLikeUse).setAttribute('href', `img/icons.svg#${iconString}`);
});

export const toggleLikesMenu = ((numOfLikes) => {
    getElement(elements.likesMenu).style.visibility = numOfLikes > 0 ? 'visible' : 'hidden';
});

export const renderLike = ((like) => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}" title="${like.title}" />
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;
    getElement(elements.likesList).insertAdjacentHTML('beforeend', markup);
});

export const deleteLike = ((id) => {
    const el = getElement(elements.allLikes.replace('%id%', id));
    if (el) {
        el.parentNode.removeChild(el);
    }
});