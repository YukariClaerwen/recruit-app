"use client";
import React, { useState } from 'react'

const useLocalStorage = (key, initialValue, childkey) => {
    const [state, setState] = useState(() => {

        try {
            const value = window.localStorage.getItem(key)
            const data = JSON.parse(value);
            if(childkey) {
                return data[childkey]
            }

            return (value && !childkey) ? JSON.parse(value) : initialValue

        } catch (err) {
            // console.log(err);
        }
    })

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(state) : value;
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
            setState(value)
        } catch (e) {
            // console.log(e);
        }
    }

    return [state, setValue]
}

export default useLocalStorage

export const removeLocal = (key) => {
    try {
        window.localStorage.removeItem(key)
    } catch(e){}
}