# Setup and Usage Instructions

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Install Dependencies](#install-dependencies)
4. [Available Commands](#available-commands)
5. [Running Scripts](#running-scripts)
6. [Development Commands](#development-commands)
7. [Using the Application](#using-the-application)
8. [Configuration](#configuration)
9. [Best Practices](#best-practices)
10. [Extending the Application](#extending-the-application)
11. [Documentation](#documentation)
12. [External Resources](#external-resources)
13. [Troubleshooting](#troubleshooting)
14. [Version](#version)
15. [Last Updated](#last-updated)

## Prerequisites

### System Requirements

- **Node.js**: Version 12 or higher
- **Package Manager**: npm (or yarn)
- **Operating System**: Windows, macOS, or Linux
- **Browser**: Modern web browser (Chrome, Firefox, Safari, Edge)

### Knowledge Prerequisites

- Basic understanding of JavaScript (ES6+)
- Familiarity with web development
- Understanding of MVC pattern (helpful but not required)

## Initial Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/orassayag/forkify-search-over-1-000-000-recipes.git
   cd forkify-search-over-1-000-000-recipes
   ```

2. Configure API key (optional):
   - Open `src/js/config.js`
   - Replace the API key with your own from [Food2Fork](https://www.food2fork.com/about/api)
   - Note: A demo key is included but may have rate limits

## Install Dependencies

Install project dependencies using npm:

```bash
npm install
```

## Available Commands

| Command         | Description                              |
| --------------- | ---------------------------------------- |
| `npm start`     | Start development server with hot reload |
| `npm run dev`   | Build project in development mode        |
| `npm run build` | Create optimized production build        |

## Running Scripts

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

## Development Commands

### Code Style

- Follow ES6+ syntax and conventions
- Use meaningful variable and function names
- Keep functions focused and single-purpose

### Debugging

- Use browser DevTools for debugging
- Check Console tab for errors
- Monitor Network tab for API requests
- Use Application tab to inspect localStorage

## Best Practices

### Development Workflow

1. **Test in Development**: Always use `npm start` for development
2. **Check Errors**: Monitor browser console for JavaScript errors
3. **Responsive Testing**: Test on different screen sizes
4. **Persistence Check**: Verify favorites are saved across page reloads

### Code Quality

1. **Follow MVC Pattern**: Keep models, views, and controllers separate
2. **Meaningful Names**: Use descriptive variable and function names
3. **Single Responsibility**: Each function should do one thing well
4. **Comment When Needed**: Add comments for complex logic

## Extending the Application

### Adding New Features

1. **Models**: Create new models in `src/js/models/` for data handling
2. **Views**: Create new views in `src/js/views/` for UI rendering
3. **Controller**: Update `src/js/index.js` to connect models and views
4. **Configuration**: Update `src/js/config.js` if needed

### Example: Adding a New Feature

```javascript
// src/js/models/NewFeature.js
export default class NewFeature {
  constructor() {
    // Initialize data
  }

  // Add methods for data logic
}

// src/js/views/newFeatureView.js
export default class NewFeatureView {
  // Add methods for UI rendering
}

// src/js/index.js
import NewFeature from './models/NewFeature';
import newFeatureView from './views/newFeatureView';

// Add controller logic to connect model and view
```

## Documentation

- [README.md](README.md) - Project overview and main documentation
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [CHANGELOG.md](CHANGELOG.md) - Version history
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) - Code of conduct
- [SECURITY.md](SECURITY.md) - Security policy

## External Resources

- [Food2Fork API](https://www.food2fork.com/about/api) - Recipe API documentation
- [Webpack Documentation](https://webpack.js.org/) - Module bundler guide
- [Babel Documentation](https://babeljs.io/docs/) - JavaScript transpiler
- [Axios Documentation](https://axios-http.com/) - HTTP client library
- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference

## Version

**Version**: 1.0.0

## Last Updated

**Last Updated**: June 2026

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

- **Or Assayag** - _Initial work_ - [orassayag](https://github.com/orassayag)
- Or Assayag <orassayag@gmail.com>
- GitHub: https://github.com/orassayag
- StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
- LinkedIn: https://linkedin.com/in/orassayag
