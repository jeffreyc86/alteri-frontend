import {createConsumer} from "@rails/actioncable"



let consumer = null

const createConnection = () => {
    const token = localStorage.getItem("token");
    consumer = createConsumer(`${process.env.REACT_APP_WS_URL}?token=${token}`);
}


export {consumer, createConnection}