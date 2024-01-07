import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import Today from "./Components/Today";
import TripList from "./Components/TripList";
import ScanMember from "./Components/ScanMember";
import ScanDetail from "./Components/ScanDetail";
import { useState } from "react";

function App() {
  const [receivedData, setReceivedData] = useState("");

  const receiveDataHandler = (data) => {
    setReceivedData(data);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/today" element={<Today />} />
        <Route
          path="/tripList/:id"
          element={<TripList sendData={receiveDataHandler} />}
        />
        <Route path="/scanMember" element={<ScanMember />} />
        <Route
          path="/scanDetail/:id"
          element={<ScanDetail receivedData={receivedData} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
