import React from 'react';

const MySelect = ({options, value, onChange}) => {
  return (
    <select
      value={value}
      onChange={e => onChange(e)}
      >
      {/* <option disabled value="">{defaultValue}</option> */}
      {options.map(option => 
      <option key={option.value} value={option.value}>{option.name}</option>
      )}
      </select>
  );
};

export default MySelect;