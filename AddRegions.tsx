import { getRegions, Region } from "./API/DataApi";

import React, { useEffect, useState } from "react";

const AddRegions = () => {
  const [regions, setRegions] = useState([]);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    let filteredRegions = regions
      .filter((region: Region) => {
        return region.name.includes(query);
      })
      .slice(0, 50);
    setSuggestions(query === "" ? [] : filteredRegions);
  }, [query]);

  useEffect(() => {
    fetchRegions().then((regions: Region[]) => {
      setRegions(regions);
    });
  }, []);

  async function fetchRegions() {
    return await getRegions().then((continents) => {
      return continents.flatMap((continent) => {
        return [
          continent,
          ...continent.countries.flatMap((country) => [
            country,
            ...country.states,
          ]),
        ];
      });
    });
  }
};

export default AddRegions;
