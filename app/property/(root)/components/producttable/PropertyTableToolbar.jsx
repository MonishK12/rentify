"use client"

import { useState } from "react";
import { Input } from "@/components/ui/input";

const PropertyTableToolbar = ({ table }) => {
  const [filterValue, setFilterValue] = useState(
    (table.getColumn("title")?.getFilterValue()) ?? ""
  );

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterValue(value);
    table.getColumn("title")?.setFilterValue(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter name"
          value={filterValue}
          onChange={handleFilterChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
    </div>
  );
};

export default PropertyTableToolbar;
