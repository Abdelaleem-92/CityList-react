import React, { useState, useEffect } from 'react'
import { getAllCities, getAllCitiesUrl } from './UtilsService';
import CityComponent from './CityComponent';
import PaginationComponent from './PaginationComponent';


const MainComponent = () => {

    const [cityList, setCityList] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [fetchStatus, setFetchStatus] = useState("");

    useEffect(() => {
        loadCitiesData();
    }, []);

    const loadCitiesData = () => {
        //setFetchStatus('');
        getAllCities().then(function(response) {
            setCityList(response);
            setFilteredCities(response);
            if(response && response.length > 0)
                setFetchStatus('success');
            else
                setFetchStatus('No Data');
        })
    }

    const getFilteredData = (cities, searchValue) => {
        if(cities){
            const filteredData = cities.filter(city => {
                if (city.name.includes(searchValue)) {
                    return true;
                } else {
                    return false;
                }
            });
            return filteredData;
        }
        
    }

    const handleSearchInputChange = (e => {
        setSearchQuery(e.target.value);
        if (e.target.value.length > 0) {
            let filteredData = [];
            if (e.target.value.length > searchQuery.length) {
                filteredData = getFilteredData(filteredCities, e.target.value);
            } else {
                filteredData = getFilteredData(cityList, e.target.value);
            }
            setFilteredCities(filteredData);
        } else {
            setFilteredCities(cityList);
        }
    })

    const showCitiesData = () => {
        if (fetchStatus.length == 0) {
            return (
                <div className="dataFetchLoading"><span >Loading Cities Data...</span>  </div>
            )
        } else
            if (fetchStatus == 'success') {
                return (
                    <PaginationComponent
                        data={filteredCities} RenderComponent={CityComponent} title="City List" pageLimit={10} dataLimit={50}
                        searchQuery={searchQuery} reloadCities = {loadCitiesData}
                    />
                )

            } else {
                return (
                    <div className="dataFetchFailure"><span >Failed to load Cities 😟</span>  </div>
                )
            }

    }

    return (
        <div className="mainContainer">

            <div className="search-wrapper">

                <input
                    type="search"
                    name="search-form"
                    id="search-form"
                    className="search-input"
                    placeholder="Search for cities..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />

            </div>


            {
                showCitiesData()
            }

            

        </div>
    )

}

export default MainComponent;