import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./LaunchList.css";
import { launchAct } from "./LaunchSlice";

export const LaunchList = () => {
  // Gather all of our filters and data from our store
  const dispatch = useDispatch();
  const launches = useSelector((state) => state.launch.launchData);
  var nameFilter = useSelector((state) => state.launch.nameFilter);
  var dateFilter = useSelector((state) => state.launch.dateFilter);
  var launchFilter = useSelector((state) => state.launch.launchFilter);
  var landFilter = useSelector((state) => state.launch.landFilter);

  // Use our filters to get data that we want to show
  var filteredLaunches = launches.filter(
    (launch) =>
      launch.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      launch.date_local.substring(0, 4).includes(dateFilter) &&
      (launch.success ? "Success" : "Failure").includes(launchFilter) &&
      (launch.cores[0].landing_success ? "Success" : "Failure").includes(
        landFilter
      )
  );

  // Function used to call reducer to store new filters
  function updateFilters() {
    dispatch(
      launchAct.updateFilters({
        nameFilter: nameFilter,
        dateFilter: dateFilter,
        launchFilter: launchFilter,
        landFilter: landFilter,
      })
    );
  }

  // handle functions update our filters
  function handleNameChange(event) {
    nameFilter = event.target.value ? event.target.value : "";
    updateFilters();
  }
  function handleDateChange(event) {
    dateFilter = event.target.value ? event.target.value : "";
    updateFilters();
  }
  function handleLaunchBtn() {
    if (launchFilter === "") {
      launchFilter = "Success";
      document.getElementById("LaunchBtn").innerHTML = "Success";
    } else if (launchFilter === "Success") {
      launchFilter = "Failure";
      document.getElementById("LaunchBtn").innerHTML = "Failure";
    } else {
      launchFilter = "";
      document.getElementById("LaunchBtn").innerHTML = "None";
    }
    updateFilters();
  }
  function handleLandBtn() {
    if (landFilter === "") {
      landFilter = "Success";
      document.getElementById("LandBtn").innerHTML = "Success";
    } else if (landFilter === "Success") {
      landFilter = "Failure";
      document.getElementById("LandBtn").innerHTML = "Failure";
    } else {
      landFilter = "";
      document.getElementById("LandBtn").innerHTML = "None";
    }
    updateFilters();
  }
  function handleReset() {
    nameFilter = "";
    document.getElementById("MissionText").value = "";
    dateFilter = "";
    document.getElementById("YearText").value = "";
    launchFilter = "";
    document.getElementById("LaunchBtn").innerHTML = "None";
    landFilter = "";
    document.getElementById("LandBtn").innerHTML = "None";
    updateFilters();
  }

  // A lot of HTML -- might be some way to shorten this using other functions
  // 2 Rows of Filters, on any update, call fxn which changes store state and rerenders
  return (
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <div class="row row-title">Filters</div>
          <div class="row">
            <button class="Reset btn btn-primary" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <div class="col">
          <div class="row row-title">Mission Name</div>
          <div class="row">
            <input
              id="MissionText"
              type="text"
              class="MissionInput"
              onChange={handleNameChange}
            ></input>
          </div>
        </div>
        <div class="col">
          <div class="row row-title">Year Launched</div>
          <div class="row">
            <input
              class="YearInput"
              id="YearText"
              onChange={handleDateChange}
            ></input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="row row-title">Launch Result</div>
          <div class="row">
            <button
              id="LaunchBtn"
              class="btn-filter btn btn-primary"
              onClick={handleLaunchBtn}
            >
              None
            </button>
          </div>
        </div>
        <div class="col">
          <div class="row row-title">Landing Result</div>
          <div class="row">
            <button
              id="LandBtn"
              class="btn-filter btn btn-primary"
              onClick={handleLandBtn}
            >
              None
            </button>
          </div>
        </div>
      </div>

      {/* map our filtered data and then output it onto cards */}
      {filteredLaunches.map((launch) => (
        <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                src={
                  launch.links.patch.large !== null
                    ? launch.links.patch.large
                    : "ship.png"
                }
                class="card-img"
                alt="launchsig"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{launch.name}</h5>
                <p class="card-text">ID: {launch.id}</p>
                <p class="card-text">
                  Year Launched: {launch.date_utc.substring(0, 4)}
                </p>
                <p class="card-text">
                  Launch Result: {launch.success ? "Success" : "Failure"}
                </p>
                <p class="card-text">
                  Land Result:{" "}
                  {launch.cores[0].landing_success ? "Success" : "Failure"}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
