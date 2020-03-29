import React from "react";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            {/* GET /users {id: string;  spendingLimit: number;} */}
            {/* GET /requests {id: string; phoneNumber: string; zipcode: string; created_at: timestamp; last_attempted: timestamp;} */}
            {/* GET /vendors/:zipcode -> {id: string; name: string; address: string; hours: {"monday": "9am-9pm"...} } */}
            {/* PATCH /requests {id: string; recipientAddress: string; dispatcherId: string; peopleCount: number; epochPickUpTime: string; } */}
            {/* PATCH /requests/:id {status: [{action: Enum<new|assigned_dispatcher|assigned_delivery|done>, created_at: timestamp; notes: string;}]} */}

            {/* PATCH /privacy { dispatcherId: string; amount: number (in pennies);} -> {cardNumber: string; cvv: string; expirationDate: string; }*/}
            {/* POST /orders {requestId: string; restaurantAddress: string; amount: number; vendorId: string; } } throws [task could not be created;] -> 200*/}
        </div>
    );
};

export async function getStaticProps() {
    return {
        props: { title: "Dashboard" } // will be passed to the page component as props
    };
}

export default Dashboard;
