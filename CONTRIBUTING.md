# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/forkify-search-over-1-000-000-recipes/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Browser and version information
   - Screenshots if applicable

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly in different browsers
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **ES6 JavaScript** with modern syntax
- **Webpack** for module bundling
- **Babel** for transpilation
- **MVC architecture** pattern

Before submitting:
```bash
# Build the project
npm run build

# Start development server and test
npm start
```

### Coding Standards

1. **MVC Pattern**: Keep models, views, and controllers separate
2. **ES6 Modules**: Use import/export for all modules
3. **Async/Await**: Use modern async patterns with promises
4. **Error Handling**: Always include try/catch blocks for async operations
5. **Naming**: Use clear, descriptive names for variables and functions
6. **Comments**: Add comments for complex logic only

### Project Structure

When adding new features, maintain the existing structure:
- **Models** (`src/js/models/`): Data and business logic
- **Views** (`src/js/views/`): UI rendering and DOM manipulation
- **Controllers** (`src/js/index.js`): Application flow and event handling
- **Config** (`src/js/config.js`): Configuration and constants

### Testing Your Changes

1. Test recipe search functionality
2. Test recipe detail view and ingredient parsing
3. Test servings adjustment calculations
4. Test shopping list add/delete/update
5. Test likes persistence in localStorage
6. Test pagination functionality
7. Verify responsive design on mobile devices
8. Test in multiple browsers (Chrome, Firefox, Safari, Edge)

### API Considerations

The project uses the Food2Fork API:
- Be mindful of API rate limits
- Do not commit real API keys to version control
- Test with various recipe queries
- Handle API errors gracefully

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
