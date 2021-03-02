import React from 'react'
import RequestForm from "./RequestForm"


function RequestContainer () {


    return (
        <div className="request-container">
            <img src={process.env.PUBLIC_URL + "/images/request-banner.jpg"} alt="create a request" />
            <RequestForm />
        </div>
    )
}

export default RequestContainer