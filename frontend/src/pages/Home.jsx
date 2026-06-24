// import { useAuth } from "../context/AuthContext";

// function Home() {

//   const { user, logout } = useAuth();

//   return (
//     <div>

//       <h1>Home Page</h1>

//       <h2>
//         {user
//           ? `Welcome ${user.name}`
//           : "Guest"}
//       </h2>

//       {user && (
//         <button onClick={logout}>
//           Logout
//         </button>
//       )}

//     </div>
//   );
// }

// export default Home;

import { useEffect, useState } from "react";
import api from "../api/axios";
import ToiletCard from "../components/ToiletCard";
import DemandCard from "../components/DemandCard";

function Home() {

  const [toilets, setToilets] = useState([]);
  const [demands, setDemands] = useState([]);

  useEffect(() => {

    const fetchToilets = async () => {

      try {

        const res =
          await api.get("/toilets");

        setToilets(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    const fetchDemands = async () => {

      try {

        const res =
          await api.get("/demands");

        setDemands(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchToilets();
    fetchDemands();

  }, []);

  return (
    <div>

      <h1>All Toilets</h1>

      {/* {toilets.map((toilet) => (

        <div key={toilet._id}>

          <h3>
            {toilet.name}
          </h3>

          <p>
            {toilet.address}
          </p>

        </div>

      ))} */}

      {toilets.map((toilet) => (

        <ToiletCard
          key={toilet._id}
          toilet={toilet}
        />

      ))}

      <h1>Toilet Demands</h1>

      {
        demands.length === 0
        ? (
            <p>No demands found</p>
          )
        : (
            demands.map((demand) => (

              <DemandCard
                key={demand._id}
                demand={demand}
              />

            ))
          )
      }

    </div>
  );
}

export default Home;
