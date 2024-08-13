import React, { useState, useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

function CountrySelector() {
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
  };

  return (
    <div className="bg-slate-100 rounded justify-center px-4 py-4">
      <h4 className="text-lg font-medium mb-2 text-blue">Location</h4>
      <Select options={options} value={value} onChange={changeHandler} />
    </div>
  );
}

export default CountrySelector;
