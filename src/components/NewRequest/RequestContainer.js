import React, {useState, useEffect} from 'react'
import {useSelector} from "react-redux"
import {useHistory} from 'react-router-dom'
import RequestForm from "./RequestForm"


function RequestContainer () {

    
    const history = useHistory()


    return (
        <div className="request-container">
            <RequestForm />
        </div>
    )
}

export default RequestContainer