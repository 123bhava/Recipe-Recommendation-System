document.getElementById('get-recipes').addEventListener('click', async () => {
    const ingredients = document.getElementById('ingredients').value.trim();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Loading...</p>';

    if (!ingredients) {
        resultsDiv.innerHTML = '<p>Please enter some ingredients.</p>';
        return;
    }

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=ea9725d312cb4d8e9a8b4f97ac1d2bcc`);
        const data = await response.json();
        displayRecipes(data);
    } catch {
        resultsDiv.innerHTML = '<p>Sorry, something went wrong. Please try again later.</p>';
    }
});

function displayRecipes(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = recipes.length
        ? recipes.map(recipe => `
            <div class="recipe">
                <div class="recipe-title">${recipe.title}</div>
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>`).join('')
        : '<p>No recipes found. Try different ingredients.</p>';
}
