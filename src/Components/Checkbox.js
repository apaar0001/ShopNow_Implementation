import React, { useState } from 'react';

function Checkbox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label style={{fontSize:"10px"}}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span style={{marginLeft:"10px"}}>I have read & accept all the Terms & Conditons</span>
      </label>
    </div>
  );
}

export default Checkbox;