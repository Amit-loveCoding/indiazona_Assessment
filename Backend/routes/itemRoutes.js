import express from 'express';
import { getCategories, createCategory } from '../controllers/categoryController.js';
import { getSubCategories, createSubCategory, updateSubCategory, deleteSubCategory } from '../controllers/subCategoryController.js';

const router = express.Router();

// Category Routes
router.get('/categories', getCategories);
router.post('/categories', createCategory);

// Sub-Category Routes
router.get('/subcategories', getSubCategories);
router.post('/subcategories', createSubCategory);
router.put('/subcategories/:id', updateSubCategory); // Route to update sub-category
router.delete('/subcategories/:id', deleteSubCategory); // Route to delete sub-category

export default router;
