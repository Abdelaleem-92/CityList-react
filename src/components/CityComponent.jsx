import React, { useState, useEffect } from 'react'
import { editCity, saveTokenToLocalStorage } from './UtilsService';
import EditCityComponent from './EditCityComponent';

const CityComponent = (props) => {

    const [showEditCity, setShowEditCity] = useState(false);
    const [cityName, setCityName] = useState(props.image.name);
    const [photoUrl, setPhotoUrl] = useState(props.image.photoUrl);

    const handleShowEditCity = () => {
        setShowEditCity(!showEditCity);
        localStorage.removeItem("token");
    }

    const editCityThenReloadCities = () => {
         editCity(props.image.name, { "name": cityName, "photoUrl": photoUrl }).
            then((status) => {
                if (status) {
                    setTimeout(function () {
                        props.reloadCities();
                        setShowEditCity(!showEditCity);
                        alert("updated successfully")
                    }, 500)
                }
            }
            )

    }

    const handleSaveEditingCity = async () => {
        if (!localStorage.getItem('token')) {
            saveTokenToLocalStorage().then(
                () => {
                    editCityThenReloadCities();
                }
            );
        } else {
            editCityThenReloadCities();
        }

    }

    useEffect(() => {
        setCityName(props.image.name);
        setPhotoUrl(props.image.photoUrl);
    }, [props.image.name, props.image.photoUrl])

    return (
        <div className="cityContainer">
            <div >
                <span className="cityTitle" >{props.image.name}</span>
                <a className="editCity"
                    href
                    onClick={handleShowEditCity}
                >
                    edit
        </a>

            </div>

            <img className="cityImg" src={props.image.photoUrl} alt={props.image.name} title={props.image.id + ' - ' + props.image.name} />

            <EditCityComponent show={showEditCity} handleClose={handleShowEditCity} >
                <h3>Editing City : {props.image.name} </h3>

                <div className="form-group">
                    <label>city Name:</label>
                    <input
                        type="text"
                        value={cityName}
                        name="modalInputName"
                        onChange={e => { setCityName(e.target.value) }}
                        className="form-control"
                    />

                    <label>photo url:</label>
                    <input
                        type="text"
                        value={photoUrl}
                        name="modalInputName"
                        onChange={e => { setPhotoUrl(e.target.value) }}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <button onClick={handleSaveEditingCity} type="button">
                        Save
            </button>
                </div>
            </EditCityComponent>

        </div>
    )
}

export default CityComponent
