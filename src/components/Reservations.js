// import axios from "axios";
// import React, { useEffect, useState } from "react";

// import { ReservationCard } from "./restaurant subcomponents/ReservationCard";

// const API = process.env.REACT_APP_API_URL;

// /**
//  * All reservations component
//  * @returns all reservations
//  */
// export const Reservations = () => {
//     const [reservations, setReservations] = useState();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         axios.get(`${API}/reservations`).then((response) => {
//             setReservations(response.data.reservations);
//             setLoading(false);
//         });
//     }, []);

//     return (
//         <div>
//             {!loading &&
//                 reservations.map((e) => 
//                 <ReservationCard 
//                     key={e.id}
//                     info={e}
//                 />
//                 )}
//         </div>
//     );
// };
