import React from "react";
import firebase from "firebase";

const Dashboard = () => {
    const email = "hjhart+onemore@gmail.com";
    const password = "buttsbutts";
    firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });

    return (
        <>
            <h1>Dashboard</h1>
            Your email is ${firebase.auth().currentUser.email}
            {/* GET /users {id: string;  spendingLimit: number;} */}
            {/* GET /requests {id: string; phoneNumber: string; zipcode: string; created_at: timestamp; last_attempted: timestamp;} */}
            {/* GET /vendors/:zipcode -> {id: string; name: string; address: string; hours: {"monday": "9am-9pm"...} } */}
            {/* PATCH /requests {id: string; recipientAddress: string; dispatcherId: string; peopleCount: number; epochPickUpTime: string; } */}
            {/* PATCH /requests/:id {status: [{action: Enum<new|assigned_dispatcher|assigned_delivery|done>, created_at: timestamp; notes: string;}]} */}
            {/* PATCH /privacy { dispatcherId: string; amount: number (in pennies);} -> {cardNumber: string; cvv: string; expirationDate: string; }*/}
            {/* POST /orders {requestId: string; restaurantAddress: string; amount: number; vendorId: string; } } throws [task could not be created;] -> 200*/}
        </>
    );
};

export async function getStaticProps() {
    return {
        props: { title: "Dashboard" }
    };
}

export default Dashboard;
