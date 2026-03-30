# Instructions

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/orassayag/forkify-search-over-1-000-000-recipes.git
   cd forkify-search-over-1-000-000-recipes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API key (optional):
   - Open `src/js/config.js`
   - Replace the API key with your own from [Food2Fork](https://www.food2fork.com/about/api)
   - Note: A demo key is included but may have rate limits

## Running the Application

### Development Mode
Start the webpack dev server with hot reload:
```bash
npm start
```
The application will open automatically at `http://localhost:8080`

### Build for Production
Create an optimized production build:
```bash
npm run build
```
Output files will be in the `dist/` directory.

### Development Build
Create a development build without starting the server:
```bash
npm run dev
```

## Using the Application

### Search for Recipes
1. Enter a search term in the search box (e.g., "pizza", "pasta", "chicken")
2. Click the search button or press Enter
3. Browse through search results (up to 30 recipes per search)
4. Use pagination buttons to navigate through results

### View Recipe Details
1. Click on any recipe from the search results
2. View full recipe details including:
   - Recipe image and title
   - Publisher/Author
   - Cooking time (estimated based on ingredients)
   - Servings count
   - Ingredients list
   - Link to original recipe source

### Adjust Servings
1. Open a recipe
2. Use the + and - buttons next to servings count
3. Ingredient quantities automatically recalculate

### Add to Shopping List
1. Open a recipe
2. Click "ADD TO SHOPPING LIST" button
3. View ingredients in the shopping list panel
4. Update quantities directly by typing in the input field
5. Delete items using the × button

### Save Favorite Recipes (Likes)
1. Open a recipe
2. Click the heart icon to like/unlike
3. Liked recipes are saved in browser localStorage
4. Access liked recipes from the likes menu (heart icon in header)
5. Likes persist across browser sessions

## Project Structure

```
forkify-search-over-1-000-000-recipes/
├── src/
│   ├── js/
│   │   ├── models/         # Data models and business logic
│   │   │   ├── Search.js   # Search functionality and API calls
│   │   │   ├── Recipe.js   # Recipe data and ingredient parsing
│   │   │   ├── List.js     # Shopping list management
│   │   │   └── Likes.js    # Favorites persistence
│   │   ├── views/          # UI rendering and DOM manipulation
│   │   │   ├── searchView.js    # Search results display
│   │   │   ├── recipeView.js    # Recipe details rendering
│   │   │   ├── listView.js      # Shopping list UI
│   │   │   ├── likesView.js     # Likes menu display
│   │   │   └── base.js          # Shared DOM elements and utilities
│   │   ├── index.js        # Main application controller
│   │   └── config.js       # Configuration and API settings
│   ├── css/
│   │   └── style.css       # Application styles
│   └── index.html          # HTML template
├── dist/                   # Production build output
├── webpack.config.js       # Webpack configuration
├── .babelrc               # Babel configuration
└── package.json           # Project dependencies and scripts
```

## Configuration

### API Settings (`src/js/config.js`)
- `proxy`: CORS proxy URL (required for API requests)
- `key`: Food2Fork API key

### Webpack Configuration (`webpack.config.js`)
- Entry point: `src/js/index.js`
- Output: `dist/js/bundle.js`
- HTML template: `src/index.html`
- Dev server port: 8080

## Features Explained

### Recipe Search
- Searches the Food2Fork database of 1,000,000+ recipes
- Results paginated (10 recipes per page)
- Async API calls with error handling

### Ingredient Parsing
The application intelligently parses ingredient strings:
- Normalizes unit measurements (tablespoons → tbsp, ounces → oz)
- Removes parentheses and extra formatting
- Extracts count, unit, and ingredient name
- Handles fractions and mixed numbers

### Cooking Time Estimation
- Automatically calculated based on ingredient count
- Formula: 15 minutes per 3 ingredients
- Provides reasonable time estimates for planning

### Shopping List
- Add entire recipe ingredients at once
- Update quantities on the fly
- Remove individual items
- State persists during session

### Favorites (Likes)
- localStorage persistence
- Survives browser restarts
- Quick access menu
- Visual heart icon indicator

## Browser Support

Tested and working on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Requires ES6 support (transpiled by Babel for older browsers).

## Troubleshooting

### API Issues
- **Rate limit exceeded**: Wait a few minutes or get your own API key
- **CORS errors**: Ensure proxy URL is correct in config.js
- **No results**: Try different search terms or check internet connection

### Build Issues
- **Webpack errors**: Delete `node_modules` and `package-lock.json`, then run `npm install`
- **Babel errors**: Ensure `.babelrc` configuration is correct
- **Missing dependencies**: Run `npm install`

### Runtime Issues
- **Recipes not loading**: Check browser console for API errors
- **Likes not persisting**: Check localStorage is enabled in browser
- **Shopping list issues**: Refresh page and try again

## Development Tips

1. Use browser DevTools for debugging
2. Check Network tab for API response issues
3. Monitor Console for JavaScript errors
4. Test localStorage in Application tab
5. Use responsive design mode for mobile testing

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag
