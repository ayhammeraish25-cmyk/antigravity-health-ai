import React, { useState } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import './Recipes.css';

const RECIPE_DB = [
    {
        id: 1,
        title: 'Avocado Toast & Eggs',
        category: 'Breakfast',
        time: '15m',
        cal: 350,
        protein: 18,
        image: '🥑',
        ingredients: ['2 slices Whole Grain Bread', '1 Avocado', '2 Eggs', 'Chili Flakes'],
        instructions: 'Toast bread. Mash avocado. Fry eggs. Assemble.'
    },
    {
        id: 2,
        title: 'Grilled Salmon Bowl',
        category: 'Dinner',
        time: '30m',
        cal: 550,
        protein: 45,
        image: '🥗',
        ingredients: ['Salmon Fillet', 'Quinoa', 'Cucumber', 'Lemon Dressing'],
        instructions: 'Grill salmon 5 mins/side. Cook quinoa. Chop veggies. Mix.'
    },
    {
        id: 3,
        title: 'Berry Protein Smoothie',
        category: 'Snack',
        time: '5m',
        cal: 250,
        protein: 25,
        image: '🥤',
        ingredients: ['Whey Protein', 'Frozen Berries', 'Almond Milk', 'Spinach'],
        instructions: 'Blend all ingredients until smooth.'
    },
    {
        id: 4,
        title: 'Chicken Stir-Fry',
        category: 'Lunch',
        time: '20m',
        cal: 480,
        protein: 40,
        image: '🥘',
        ingredients: ['Chicken Breast', 'Broccoli', 'Peppers', 'Soy Sauce', 'Rice'],
        instructions: 'Stir fry chicken. Add veggies. Add sauce. Serve over rice.'
    },
];

const Recipes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [activeRecipe, setActiveRecipe] = useState(null);

    const { logMeal } = useApp();

    const filteredRecipes = RECIPE_DB.filter(recipe => {
        const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleAddToLog = (recipe) => {
        logMeal({
            name: recipe.title,
            cal: recipe.cal,
            p: recipe.protein,
            c: 30, // Mock carb
            f: 10  // Mock fat
        });
        alert(`Added "${recipe.title}" to your Nutrition Checklist!`);
        setActiveRecipe(null);
    };

    return (
        <Layout>
            <div className="recipes-container">
                <div className="recipes-header">
                    <h2>Recipe Library</h2>
                    <div className="recipe-controls">
                        <input
                            type="text"
                            placeholder="Search recipes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <div className="category-filters">
                            {['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'].map(cat => (
                                <button
                                    key={cat}
                                    className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="recipes-grid">
                    {filteredRecipes.map(recipe => (
                        <div key={recipe.id} className="recipe-card glass-panel" onClick={() => setActiveRecipe(recipe)}>
                            <div className="recipe-img">{recipe.image}</div>
                            <div className="recipe-info">
                                <div className="recipe-meta">
                                    <span className="time">⏱️ {recipe.time}</span>
                                    <span className="cal">🔥 {recipe.cal} kcal</span>
                                </div>
                                <h3>{recipe.title}</h3>
                                <span className="badge-cat">{recipe.category}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recipe Detail Modal */}
                {activeRecipe && (
                    <div className="modal-overlay" onClick={() => setActiveRecipe(null)}>
                        <div className="recipe-modal glass-panel" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2>{activeRecipe.title}</h2>
                                <button className="close-btn" onClick={() => setActiveRecipe(null)}>×</button>
                            </div>

                            <div className="modal-body">
                                <div className="modal-top">
                                    <span className="big-icon">{activeRecipe.image}</span>
                                    <div className="nutri-box">
                                        <div><strong>{activeRecipe.cal}</strong> kcal</div>
                                        <div><strong>{activeRecipe.protein}g</strong> protein</div>
                                        <div><strong>{activeRecipe.time}</strong> prep</div>
                                    </div>
                                </div>

                                <div className="modal-section">
                                    <h4>Ingredients</h4>
                                    <ul>
                                        {activeRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                                    </ul>
                                </div>

                                <div className="modal-section">
                                    <h4>Instructions</h4>
                                    <p>{activeRecipe.instructions}</p>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <Button variant="secondary" onClick={() => setActiveRecipe(null)}>Close</Button>
                                <Button variant="primary" onClick={() => handleAddToLog(activeRecipe)}>+ Add to Daily Log</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Recipes;
