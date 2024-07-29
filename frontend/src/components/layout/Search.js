import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Autocomplete from 'react-autocomplete';


const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  let navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  const handleSelect = (value) => {
    setKeyword(value);
  };

  const getSuggestions = async (value) => {
    const response = await fetch(`${process.env.REACT_APP_API}/api/v1/products?keyword=${value}`);
    const data = await response.json();
    const suggestions = data.products.map((product) => product.name);
    setSuggestions(suggestions);
  };


  return (
    <form onSubmit={searchHandler}>
      <div class="groupsrc">
        <svg class="iconsrc" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>

        <Autocomplete
          id="search_field"
          items={suggestions}
          getItemValue={(item) => item}
          renderItem={(item, isHighlighted) => (
            <div key={item} style={{ background: isHighlighted ? 'blue' : 'white', fontFamily: 'Amazon Ember',textAlign:"left", fontSize: '15px', color: isHighlighted ? '#FFFFFF' : 'black'}}>
              {item}
            </div>
          )}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
            getSuggestions(e.target.value);
          }}
          onSelect={handleSelect}
          inputProps={{
            className: 'form-control',
            placeholder: 'Enter Product Name ...',
            style: { width: '300px' }, 
          }}
        />
      </div>
    </form>
  );
};

export default Search;
