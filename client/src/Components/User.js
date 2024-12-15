// import React, { useEffect, useState } from "react";  
// import axios from "axios";  

// const User = () => {  
//   const [data, setData] = useState([]);  
//   const SHEET_ID = "1MRf6aF8PN03w18_9BwKhTRc4zK4eNis9hm5m7ldFwdQ";  
//   const API_KEY = "AIzaSyCz0y0Ot7zSeZ_eRfE1VBCJECZhW2HGkhk";  
//   const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;  

//   useEffect(() => {  
//     axios  
//       .get(URL)  
//       .then((response) => {  
//         setData(response.data.values);  
//       })  
//       .catch((error) => {  
//         console.error("Error fetching spreadsheet data:", error);  
//       });  
//   }, []);  

//   return (  
//     <div style={{ textAlign: "center", marginTop: "50px" }}>  
//       <h2>User</h2>  
//       <table border="1" style={{ margin: "0 auto", borderCollapse: "collapse" }}>  
//         <thead>  
//           <tr>  
//             {data[0]?.map((header, index) => (  
//               <th key={index}>{header}</th>  
//             ))}  
//           </tr>  
//         </thead>  
//         <tbody>  
//           {data.slice(1).map((row, rowIndex) => (  
//             <tr key={rowIndex}>  
//               {row.map((cell, cellIndex) => (  
//                 <td key={cellIndex}>{cell}</td>  
//               ))}  
//             </tr>  
//           ))}  
//         </tbody>  
//       </table>  
//     </div>  
//   );  
// };  

// export default User;  






import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [data, setData] = useState([]);
  const SHEET_ID = "1MRf6aF8PN03w18_9BwKhTRc4zK4eNis9hm5m7ldFwdQ";
  const API_KEY = "AIzaSyCz0y0Ot7zSeZ_eRfE1VBCJECZhW2HGkhk";
  const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1?key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(URL)
      .then((response) => {
        setData(response.data.values);
      })
      .catch((error) => {
        console.error("Error fetching spreadsheet data:", error);
      });
  }, []);

  const styles = {
    container: {
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "Arial, sans-serif",
      color: "#333",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#4CAF50",
    },
    table: {
      margin: "0 auto",
      borderCollapse: "collapse",
      width: "80%",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    th: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px",
      fontSize: "1rem",
      textAlign: "center",
      border: "1px solid #ddd",
    },
    td: {
      padding: "10px",
      textAlign: "left",
      border: "1px solid #ddd",
      textAlign: "center",
      fontSize: "0.9rem",
      backgroundColor: "#f9f9f9",
    },
    rowOdd: {
      backgroundColor: "#f2f2f2",
    },
    rowEven: {
      backgroundColor: "#ffffff",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Data</h2>

      {data?.length &&
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd}
              >
                {row.map((cell, cellIndex) => (
                  <td style={styles.td} key={cellIndex}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      }
    </div>
  );
};

export default User;
