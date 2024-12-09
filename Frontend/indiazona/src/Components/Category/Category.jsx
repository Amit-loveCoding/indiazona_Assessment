import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import './Category.css'; 
import CategoryTable from '../CategoryTable/CategoryTable';

const Category = () => {
  const [showAddSubCategory, setShowAddSubCategory] = useState(false);
  const [subCategoryName, setSubCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subCategories, setSubCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  
  useEffect(() => {
    const fetchCategoriesAndSubCategories = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:5000/api/categories');
        setCategories(categoriesResponse.data);

        const subCategoriesResponse = await axios.get('http://localhost:5000/api/subcategories');
        setSubCategories(subCategoriesResponse.data);
      } catch (error) {
        console.error('Error fetching categories and sub-categories:', error);
      }
    };

    fetchCategoriesAndSubCategories();
  }, []);

  const handleAdd = () => {
    setShowAddSubCategory(true); 
  };

  const handleCancel = () => {
    setShowAddSubCategory(false); 
  };

  const handleCross = () => {
    setShowAddSubCategory(false);
  };

  const handleSubmit = async () => {
    
    if (subCategoryName && selectedCategory) {
      try {
        const response = await axios.post('http://localhost:5000/api/subcategories', {
          name: subCategoryName,
          categoryId: selectedCategory,
        });

      
        setSubCategories([...subCategories, response.data]);

       
        setSubCategoryName('');
        setSelectedCategory('');
        setShowAddSubCategory(false);
      } catch (error) {
        console.error('Error adding sub-category:', error);
      }
    }
  };

  return (
    <div className="category-container">
      <p>Sub-categories</p>
      <h3>All Sub-categories</h3>
      <div className="inside-body">
        <div className="input-container">
          <SearchOutlinedIcon className="search-icon" />
          <input
            type="text"
            placeholder="Search via name, mobile number, or email ID"
            className="search-input"
          />
        </div>
        <div className="button-inline">
          <button className='swap-button'>
            <SwapVertOutlinedIcon />
          </button>
          <button className="add-sub" onClick={handleAdd}>
            + Add new Sub-category
          </button>
        </div>
      </div>

      {showAddSubCategory && (
        <div className="add-subcategory-form">
          <div className="cross" onClick={handleCross}>
            ×
          </div>
          <div>
            <label>Category<span>*</span></label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select from dropdown</option>
              <option value="1">Electronics</option>
              <option value="2">Home Appliances</option>
              <option value="3">Fashion</option>
            </select>
          </div>

          <div>
            <label>Sub-Category Name <span>*</span></label>
            <input
              type="text"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
              placeholder="Enter Sub-category name"
              required
            />
          </div>

          <div className="form-actions">
            <button onClick={handleSubmit}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}

<div className="table-data">
  <CategoryTable
    subCategories={subCategories}
    categories={categories}
    setSubCategories={setSubCategories}
  />
</div>

    </div>
  );
};

export default Category;
