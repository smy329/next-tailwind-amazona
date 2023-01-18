import mongoose from "mongoose";


// we are going to save the previous connection with this constant 
const connection = {}
//async function to connect with MongoDB
async function connect() {

    if (connection.isConnected) {
        console.log('Already Connected')
        return
    }

    //while we have connections in connection queue
    if (mongoose.connections.length > 0) {
        //get readyState of the first connections in the mongoose and set it to the connection constant if isConnected failed
        connection.isConnected = mongoose.connections[0].readyState;

        //when ready state is 1 and we are connected to the database
        if (connection.isConnected === 1) {
            // that means there is no need to connect to the datatbase, cause we are already connected 
            console.log("Use previous connection");
            return;
        }
        // if isConnected !== 1, we need to disconnect. Because it is not in the connected mode 
        await mongoose.disconnect();
    }

    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log("New Connection")
    connection.isConnected = db.connections[0].readyState; 
}

async function disconnect() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log("Not Disconnected");
        }
    }
}

const db = { connect, disconnect }
export default db;