import React, { useState, useEffect } from 'react'

const PaginationComponent = ({ data, RenderComponent, title, pageLimit, dataLimit, searchQuery, reloadCities }) => {

    const [pages] = useState(data? Math.round(data.length / dataLimit) : 1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if(searchQuery.length > 0)
            setCurrentPage(1);
    }, [{searchQuery}])

    function goToNextPage() {
        setCurrentPage((page) => page + 1);
    }

    function goToPreviousPage() {
        setCurrentPage((page) => page - 1);
    }

    function changePage(event) {
        const pageNumber = Number(event.target.textContent);
        setCurrentPage(pageNumber);
    }

    const getPaginatedData = () => {
        if(data && data.length > 0){
            const startIndex = currentPage * dataLimit - dataLimit;
        const endIndex = startIndex + dataLimit;
        return data.slice(startIndex, endIndex);
        }
        
    };

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
        return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
    };

    const showPaginatrfCitiesData = () => {
        if (getPaginatedData()) {
            return (
                getPaginatedData().map((d, idx) => (
                    <RenderComponent key={idx} image={d} reloadCities = {reloadCities} />))
            )
        } 

    }

    return (
        <div>
            <h1>{title}</h1>

            
            <div className="dataContainer">
                {
                    showPaginatrfCitiesData()
                }
            </div>

            <div className="pagination">
                <button
                    onClick={goToPreviousPage}
                    className={'prev ' + (currentPage === 1 || searchQuery.length > 0 ? 'disabled' : '')}
                >
                    prev
      </button>

                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={changePage}
                        className={'paginationItem ' + (searchQuery.length > 0 ? 'disabled' : (currentPage === item ? 'active' : null))}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                <button
                    onClick={goToNextPage}
                    className={'next ' + (currentPage === pages || searchQuery.length > 0 ? 'disabled' : '')}
                >
                    next
      </button>

            </div>


        </div>
    )
}

export default PaginationComponent
