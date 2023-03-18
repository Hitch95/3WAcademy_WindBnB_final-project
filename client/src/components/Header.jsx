import "../styles/header.scss";
import { MenuIcon, UserCircleIcon, SearchIcon, UserIcon, UsersIcon } from "@heroicons/react/solid";

import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";

export default function Header({ placeholder }) {

  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [numOfGuests, setNumOfGuests] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const resetInput = () => {
    setSearchInput("");
  };

  const goToSearchPage = () => {
    const queryParams = new URLSearchParams({
      location: searchInput,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      numOfGuests,
    });
    console.log(queryParams.toString());
    navigate({
      pathname: "/search",
      search: queryParams.toString(),
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handleInputClick = (event) => {
    if (
      event.target.name === "checkInInput" ||
      event.target.name === "checkOutInput"
    ) {
      setIsInputClicked(true);
    } else {
      setIsInputClicked(false);
    }
  };

  return (
    <header>
      <div>
        <a href="/" target="noreferrer">
          <img src="/images/logo.png" alt="logo" />
        </a>
        <div className="sign-log-container">
          <MenuIcon className="menu-icon" />
          <UserCircleIcon className="user-icon" />
        </div>
      </div>

      <div className="input-container">
        <div className="location">
          <p>Location</p>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder={placeholder || "Where are you going?"}
          />
        </div>
        <div className="check-in">
          <p>Check in</p>
          <input
            name="checkInInput"
            onClick={handleInputClick}
            type="text"
            placeholder="Add dates"
          />
        </div>
        <div className="check-out">
          <p>Check out</p>
          <input
            name="checkOutInput"
            onClick={handleInputClick}
            type="text"
            placeholder="Add dates"
          />
        </div>
        <div className="guests">
          <p>Guests</p>
          <input type="text" placeholder="Add guests" />
          <span>
            <i className="lni lni-search-alt"></i>
          </span>
        </div>
      </div>

      {searchInput && isInputClicked && (
        <div className="date-range-picker">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FD5B61"]}
            onChange={handleSelect}
          />
          <div>
            <h2>Number of Guests</h2>
            <UsersIcon />
            <input type="number" min={1}
              value={numOfGuests}
              onChange={(e) => setNumOfGuests(e.target.value)} />
          </div>

          <div>
            <button onClick={resetInput}>Cancel</button>
            <button onClick={goToSearchPage}>Search</button>
          </div>
        </div>
      )}
    </header>
  );
}
