"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ChartCard from "./chartCard";

export default function FetchFiveDay() {
  const [term, setTerm] = useState("");
  const [data, setData] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const handleInput = (event) => {
    setTerm(event.target.value);
  };

  const handleTheSearch = () => {
    if (term) {
      setSearchValue(term);
    }
  };

  useEffect(() => {
    const FetchFiveDay = async () => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              q: searchValue,
              units: "imperial",
              appid: API_KEY,
            },
          }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("error", error);
        setData(null);
      }
    };
    if (searchValue) {
      FetchFiveDay();
    }
  }, [searchValue, API_KEY]);

  let tempArray = [];
  let humidArray = [];
  let pressureArray = [];

  if (data) {
    for (let i = 0; i < data.list.length; i++) {
      const item = data.list[i];
      tempArray.push(item.main.temp);
      humidArray.push(item.main.humidity);
      pressureArray.push(item.main.pressure);
    }
  }

  // console.log(pressureArray);
  // console.log(humidArray);
  // console.log(tempArray);

  return (
    <div className="container">
      <div className="text-center my-5">
        <h1 className="mb-4">Five Day Weather</h1>

        <div className="d-flex justify-content-center mb-3">
          <div className="input-group mb-3">
            <input
              type="text"
              value={term}
              onChange={handleInput}
              placeholder="Enter a city"
              className="form-control"
            />
            <button className="btn btn-outline-primary" onClick={handleTheSearch}>
              Search
            </button>
          </div>
        </div>

       

        {data && (
          <div>
            <div
              className="card text-dark bg-info mb-3"
              style={{ width: "55rem", margin: "0 auto" }}
            >
              <div className="card-header">Current Weather</div>
              <div className="card-body">
                <h2 className="card-title">{data.city.name}</h2>
                <p className="card-text"></p>
<p className="card-text">
                Temperature: {data.list[0].main.temp} °F
              </p>
              <p className="card-text">
                Humidity: {data.list[0].main.humidity} %
              </p>
              <p className="card-text m-1">
                Pressure: {data.list[0].main.pressure} hPa
              </p>




              </div>
              
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3">
              <ChartCard
                dataArray={tempArray}
                title="Temperature"
                color="yellow"
              />
              <ChartCard
                dataArray={pressureArray}
                title="Pressure"
                color="green"
              />
              <ChartCard dataArray={humidArray} title="Humidity" color="red" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
