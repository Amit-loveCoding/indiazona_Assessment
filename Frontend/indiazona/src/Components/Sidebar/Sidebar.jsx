import React, { useState } from 'react';
import "./Sidebar.css";
import indiazona from "../Asset/indiazona.jpeg";
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import CategoryIcon from '@mui/icons-material/Category';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

const Sidebar = () => {
  const items = ["Categories", "Sub-categories", "Specification", "HSN List", "Logistics Rate", "Brand List"];
  const [isToggle, setIsToggle] = useState(false);

  const handledropdown = () => {
    setIsToggle(!isToggle); 
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={indiazona} alt="Indiazona Logo" className="logo" />
        
      </div>

      <div className="sidebar-item">
        <DashboardIcon className="sidebar-icon" />
        <span className="sidebar-text">Dashboard</span>
      </div>

      <div className="sidebar-item">
        <GroupAddIcon className="sidebar-icon" />
        <span className="sidebar-text">Partner</span>
      </div>

      <div className="sidebar-item">
        <ShoppingCartRoundedIcon className="sidebar-icon" />
        <span className="sidebar-text">Product</span>
      </div>

      <div className="sidebar-item">
        <TrendingDownRoundedIcon className="sidebar-icon" />
        <span className="sidebar-text">Sales</span>
      </div>

      <div className="sidebar-item" onClick={handledropdown}>
        <CategoryIcon className="sidebar-icon" />
        <span className="sidebar-text">Items</span>
        {isToggle && (<div><ul className="dropdown-list">
            {items.map((item, index) => (
              <li key={index} className="dropdown-item">{item}</li>
            ))}
          </ul></div>
          
        )}
      </div>

      <div className="sidebar-item">
        <VolunteerActivismIcon className="sidebar-icon" />
        <span className="sidebar-text">Refunds</span>
      </div>
    </div>
  );
};

export default Sidebar;
