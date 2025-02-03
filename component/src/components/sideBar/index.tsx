import React from "react"; 
import '../../assets/scss/app.scss';
const SideBar = () => {
  return (
    <div className="sideBar">
      <ul> 
        <li><a href="/">Dashboard</a></li>
        <li><a href="/tenant">Rentals</a></li>
        <li><a href="/payment">Payment Settings</a></li>
        <li><a href="/payment">Payment History</a></li>
        <li ><a href="/rewards">Tenant Referral</a></li>
        <li><a href="/rewards">Rewards Calculator</a></li>
        <li><a href="/rewards">Credit Score</a></li>
      </ul>
    </div>
  );
};

export default SideBar;
