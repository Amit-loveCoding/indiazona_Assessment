import SubCategory from '../models/SubCategory.js';
import Category from '../models/Category.js';

// Get all sub-categories with category details
export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.findAll({ include: Category });
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new sub-category
export const createSubCategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ error: 'Name and Category ID are required' });
    }

    // Check if the category exists
    const categoryExists = await Category.findByPk(categoryId);
    if (!categoryExists) {
      return res.status(400).json({ error: 'Category ID does not exist' });
    }

    // Create the sub-category
    const subCategory = await SubCategory.create({ name, categoryId });
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an existing sub-category
export const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res.status(400).json({ error: 'Name and Category ID are required' });
    }

    // Find the sub-category
    const subCategory = await SubCategory.findByPk(id);
    if (!subCategory) {
      return res.status(404).json({ error: 'Sub-category not found' });
    }

    // Update the sub-category
    subCategory.name = name;
    subCategory.categoryId = categoryId;
    await subCategory.save();

    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a sub-category
export const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the sub-category
    const subCategory = await SubCategory.findByPk(id);
    if (!subCategory) {
      return res.status(404).json({ error: 'Sub-category not found' });
    }

    await subCategory.destroy();
    res.status(200).json({ message: 'Sub-category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
