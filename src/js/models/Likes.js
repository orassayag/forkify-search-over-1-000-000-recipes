export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        }
        this.likes.push(like);

        // Persist data in localStorage
        this.persistData();
        return like;
    }

    deleteLike(id) {
        if (this.likes && this.likes.length > 0) {
            const index = this.likes.findIndex((el) => {
                return el.id === id;
            });

            if (index > -1) {
                this.likes.splice(index, 1);

                // Persist data in localStorage
                this.persistData();
            }
        }
    }

    isLiked(id) {
        let index = -1;
        if (this.likes && this.likes.length > 0) {
            index = this.likes.findIndex((el) => {
                return el.id === id;
            });
        }
        return index > -1;
    }

    getNumLikes() {
        let num = 0;
        if (this.likes && this.likes.length > 0) {
            num = this.likes.length;
        }
        return num;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        // Resorting likes from the localStorage
        const storage = localStorage.getItem('likes');
        if (storage) {
            this.likes = JSON.parse(storage);
        }
    }
};