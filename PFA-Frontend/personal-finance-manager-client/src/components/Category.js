// src/components/Category.js
import { useState, useEffect } from "react";
import { getCategory, createCategory } from "../services/categoryService";

const Category = () => {
    const [categories, setCategory] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        const loadCategory = async () => {
            try {
                const data = await getCategory();
                setCategory(data);
            } catch (err) {
                console.error("Error loading categories:", err);
            }
        };

        loadCategory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newCategory.trim()) return;

        try {
            const created = await createCategory(newCategory);
            setCategory([...categories, created]);
            setNewCategory("");
        } catch (err) {
            console.error("Error creating category:", err);
        }
    };

    return (
        <div className="categories-container">
            <h2>Categorías</h2>

            <form className="category-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nueva categoría"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button type="submit" className="nav-btn">Crear</button>
            </form>

            <ul className="category-list">
                {categories.map((cat) => (
                    <li key={cat.id} className="category-item">
                        {cat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Category;
