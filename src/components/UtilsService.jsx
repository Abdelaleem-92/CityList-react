import React from 'react'

const getAllCitiesUrl = 'http://localhost:8080/api/cityList/allCities';
const signinUrl = 'http://localhost:8080/api/auth/signin';
const editCityUrl = 'http://localhost:8080/api/cityList/editCity/';
const username = 'kuehneNagel';
const password = 'kuehneNagel';

export function getAllCities() {
    return new Promise((resolve) => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        const citiesData = fetch(getAllCitiesUrl, requestOptions)
            .then(
                response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('error fetching Cities');
                    }
                }
            )
            .then(data => {
                return data;
            }).catch((error) => {
                return null;
            })

        setTimeout(() => {
            resolve(citiesData);
            ;
        }, 1000
        );
    });

}

export function saveTokenToLocalStorage() {
    return new Promise((resolve) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "username": username,
                    "password": password
                }
            )
        };

        fetch(signinUrl, requestOptions)
            .then(
                response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('error fetching Cities');
                    }
                }
            )
            .then(data => {
                localStorage.setItem("token", data.token);
            }).catch((error) => {
                localStorage.removeItem("token");
            })

        setTimeout(() => {
            resolve();
            ;
        }, 1000
        );
    });
}

export function editCity(existingCityName, newCity) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
        body: JSON.stringify(newCity)
    };

    const status = fetch(editCityUrl + existingCityName, requestOptions)
        .then(
            response => {
                if (response.ok) {
                    return true;
                } else {
                    throw new Error('error fetching Cities');
                }
            }
        )
        .catch((error) => {
            return false;
        })
    return status;
}
