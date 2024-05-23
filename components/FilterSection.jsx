"use client";

import MyCard from "@/components/MyCard";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

const FilterSection = ({ propertyData }) => {
  const [newPropertyData, setNewPropertyData] = useState(propertyData);

  const allCity = Array.from(new Set(propertyData.map((p) => p.city)));
  const allState = Array.from(new Set(propertyData.map((p) => p.state)));
  const bhkOptions = [1, 2, 3, 4];

  const [selectedCities, setSelectedCities] = useState(null);
  const [selectedStates, setSelectedStates] = useState(null);
  const [selectedBHK, setSelectedBHK] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPge, SetPostsPerPage] = useState(2);

  const handleBHKChange = (e) => {
    const bhk = parseInt(e.target.value);
    if (selectedBHK.includes(bhk)) {
      setSelectedBHK(selectedBHK.filter((el) => el !== bhk));
    } else {
      setSelectedBHK([...selectedBHK, bhk]);
    }
  };

  useEffect(() => {
    filterProperties();
  }, [selectedCities, selectedStates, selectedBHK]);

  const filterProperties = () => {
    let tempProperties = propertyData;

    if (selectedCities) {
      tempProperties = tempProperties.filter(
        (property) => selectedCities === property.city
      );
    }

    if (selectedStates) {
      tempProperties = tempProperties.filter(
        (property) => selectedStates === property.state
      );
    }

    if (selectedBHK.length > 0) {
      tempProperties = tempProperties.filter((property) =>
        selectedBHK.includes(property.BHK)
      );
    }
    setCurrentPage(1);
    setNewPropertyData(tempProperties);
  };

  const indexOfLastPost = currentPage * postsPerPge;
  const indexOfFirstPost = indexOfLastPost - postsPerPge;

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col space-y-4 mx-4">
      <div className="flex justify-evenly ">
        <div>
          <h3 className="font-semibold mb-2">Cities</h3>
          <select
            value={selectedCities || ""}
            onChange={(e) => setSelectedCities(e.target.value)}
            className="w-full max-w-xs p-2 border rounded"
          >
            <option value="">Select City</option>
            {allCity.map((city, idx) => (
              <option key={`city-${idx}`} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-semibold mb-2">States</h3>
          <select
            value={selectedStates || ""}
            onChange={(e) => setSelectedStates(e.target.value)}
            className="w-full max-w-xs p-2 border rounded"
          >
            <option value="">Select State</option>
            {allState.map((state, idx) => (
              <option key={`state-${idx}`} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-semibold mb-2">BHK</h3>
          <div className="flex flex-wrap gap-4">
            {bhkOptions.map((bhk, idx) => (
              <div key={`bhk-${idx}`} className="flex items-center">
                <input
                  type="checkbox"
                  value={bhk}
                  checked={selectedBHK.includes(bhk)}
                  onChange={handleBHKChange}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
                <label className="ml-2">{bhk} BHK</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Button
            onClick={() => {
              setSelectedCities(null);
              setSelectedStates(null);
              setSelectedBHK([]);
            }}
            className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-800"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {newPropertyData.length !== 0 ? (
        <div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {newPropertyData
              .slice(indexOfFirstPost, indexOfLastPost)
              .map((item, index) => (
                <div key={index} className="p-4">
                  <MyCard propertyData={item} />
                </div>
              ))}
          </div>
          <div>
            <Pagination
              length={newPropertyData.length}
              postsPerPage={postsPerPge}
              handlePagination={handlePagination}
              currentPage={currentPage}
            />
          </div>
        </div>
      ) : (
        <div>No properties to display</div>
      )}
    </div>
  );
};

export default FilterSection;
