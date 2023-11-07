import Result from "./Components/Result";
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [hoveredElement, setHoveredElement] = useState(null);

  const changeTheSearch = (event) => {
    setSearch(event.target.value);
  }

  const handleMouseEnter = (elementId) => {
    setHoveredElement(elementId);
  };

  const handleMouseLeave = () => {
    setHoveredElement(null);
  };

  const getAllMovies = () => {
    axios.get(APIURL)
      .then(
        (response) => {
          console.log(response.data.results)
          setMovies(response.data.results);
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  const getSearchedMovies = () => {
    axios.get(
      SEARCHAPI + search
    )
      .then(
        (response) => {
          console.log(response.data.results)
          setMovies(response.data.results);
        }
      )
      .catch(
        (error) => { 
          console.log(error);
        }
      )
  }

  useEffect(
    () => {
      setMovies([]);
      if (search === "") {
        getAllMovies();
      } else {
        getSearchedMovies();
      }
    },
    [search]
  )

  return (
    <div style={{ backgroundColor: "black", color: "lightgreen" }}>
      <h1 align="center">Movie Corps</h1>
      <div className="max-w-[1240px] shadow-xl min-h-[200px] mx-auto p-3">
        <input 
        type="search" 
        value={search} 
        onChange={changeTheSearch} 
        className="w-full border border-black rounded text-slate-700 p-4"
         />
        {movies.length === 0 ? (
          <div className="text-3xl text-center mt-2"> Loading... </div>
        ) : (
          <Result movies={movies} />
        )}
      </div>
    </div>
  );
  
}

export default App;
