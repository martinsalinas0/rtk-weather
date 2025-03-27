"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCity,
  fetchForecast,
  resetList,
} from "@/store/slices/forecastSlice";

import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine,
} from "react-sparklines";

export default function CityView() {
  const { forecastData, loading, error, cities } = useSelector(
    (state) => state.forecast
  );

  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  useEffect(() => {}, []);

  const handleSearch = () => {
    if (!query || query.trim() === "") {
      alert("Search cannot be empty");
      setQuery("");
    } else {
      dispatch(fetchForecast(query));
      setQuery("");
    }
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset? ")) {
      dispatch(resetList());
    }
  };

  const handleInput = (event) => {
    setQuery(event.target.value);
  };

  const handleDelete = (cityId) => {
    if (confirm("are you sure you want to delete this city?")) {
      dispatch(deleteCity(cityId));
    }
  };

  function average(arr) {
    return arr.reduce((sum, num) => sum + num) / arr.length;
  }

  return (
    <div className="container">
      <div className="input-group m-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search city"
          value={query}
          onChange={handleInput}
          required
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <div className="container">
        <div className=" text-center">
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={handleReset}
          >
            {" "}
            reset list
          </button>
          
        </div>
      </div>

      <h2 className="text-center m-4">City Forecast</h2>
      {loading && <div>Loading...</div>}
      {!loading && error && <div>Error: {error}</div>}
      {!loading && forecastData && (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">City</th>
                <th scope="col">Temperature (°F)</th>
                <th scope="col">Humidity (%)</th>
                <th scope="col">Pressure (hPa)</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => {
                const tempArray = city.list.map((item) => item.main.temp);
                const humidityArray = city.list.map(
                  (item) => item.main.humidity
                );
                const pressureArray = city.list.map(
                  (item) => item.main.pressure
                );

                const tempAvg = Math.round(average(tempArray));
                const humidAvg = Math.round(average(humidityArray));
                const pressAvg = Math.round(average(pressureArray));

                return (
                  <tr key={city.id} className="align-bottom">
                    <td scope="row" className="align-middle"></td>
                    <td className="align-middle">
                      <h2>{city.name}</h2>
                    </td>
                    <td className="align-bottom">
                      <Sparklines data={tempArray} height={75} width={125}>
                        <SparklinesLine color="red" />
                        <SparklinesReferenceLine type="mean" />
                      </Sparklines>
                      <div className="text-center">
                        {" "}
                        <h5>{tempAvg} °F </h5>
                      </div>
                    </td>
                    <td className="align-bottom">
                      <Sparklines data={humidityArray} height={75} width={125}>
                        <SparklinesLine color="green" />
                        <SparklinesReferenceLine type="mean" />
                      </Sparklines>
                      <div className="text-center">
                        {" "}
                        <h5>{humidAvg} %</h5>
                      </div>
                    </td>
                    <td className="align-bottom">
                      <Sparklines data={pressureArray} height={75} width={125}>
                        <SparklinesLine color="blue" />
                        <SparklinesReferenceLine type="mean" />
                      </Sparklines>
                      <div className="text-center">
                        <h5>{pressAvg} hPa </h5>
                      </div>
                    </td>
                    <td className="text-center align-middle">
                      <button
                        onClick={() => handleDelete(city.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
