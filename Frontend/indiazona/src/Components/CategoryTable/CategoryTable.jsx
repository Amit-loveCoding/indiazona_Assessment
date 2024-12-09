import React, { useState } from 'react';
import axios from 'axios';
import './CategoryTable.css';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';

const CategoryTable = ({ subCategories, categories, setSubCategories }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedSubCategory, setEditedSubCategory] = useState({});

  // Handle edit button click
  const handleEdit = (id) => {
    const subCategoryToEdit = subCategories.find((sub) => sub.id === id);
    if (subCategoryToEdit) {
      setEditedSubCategory(subCategoryToEdit); // Set the selected sub-category for editing
      setEditMode(true);
    }
  };

  // Handle saving the edited sub-category
  const handleSaveEdit = async () => {
    const { id, name, categoryId } = editedSubCategory;

    // Validate input
    if (!name || !categoryId) {
      alert('Sub-category name and category are required!');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/subcategories/${id}`, {
        name,
        categoryId,
      });

      // Update sub-category list
      setSubCategories(
        subCategories.map((sub) =>
          sub.id === id ? response.data : sub
        )
      );

      // Exit edit mode
      setEditMode(false);
      setEditedSubCategory({});
    } catch (error) {
      console.error('Error updating sub-category:', error);
    }
  };

  // Handle deleting a sub-category
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sub-category?')) {
      try {
        await axios.delete(`http://localhost:5000/api/subcategories/${id}`);
        setSubCategories(subCategories.filter((sub) => sub.id !== id));
      } catch (error) {
        console.error('Error deleting sub-category:', error);
      }
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedSubCategory({});
  };

  // Get category name by ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <div>
      {/* Edit Form */}
      {editMode && (
        <div className="edit-form">
          <h3>Edit Sub-category</h3>
          <div>
            <label>Sub-category Name:</label>
            <input
              type="text"
              value={editedSubCategory.name || ''}
              onChange={(e) =>
                setEditedSubCategory({
                  ...editedSubCategory,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label>Category:</label>
            <select
              value={editedSubCategory.categoryId || ''}
              onChange={(e) =>
                setEditedSubCategory({
                  ...editedSubCategory,
                  categoryId: e.target.value,
                })
              }
            >
              <option value="">Select from dropdown</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}

      {/* Sub-category Table */}
      <table className="category-table">
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Category</th>
            <th>Sub-category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subCategories && subCategories.length > 0 ? (
            subCategories.map((sub, index) => (
              <tr key={sub.id}>
                <td>{index + 1}</td>
                <td>{getCategoryName(sub.categoryId)}</td>
                <td>{sub.name}</td>
                <td>
                  <div className='action-container'>
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(sub.id)}
                  >
                    <EditNoteIcon/>
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(sub.id)}
                  >
                    <DeleteForeverIcon/>
                  </button>
                  </div>
                
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No sub-categories available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
