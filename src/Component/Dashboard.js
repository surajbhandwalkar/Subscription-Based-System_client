import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Style/Dashboard.css'
export default function Dashboard() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get(`${process.env.REACT_APP_API_URL}/api/auth/status`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setStatus(res.data.status))
    .catch(err => setStatus("Unauthorized"));
  }, []);

  return (
    <div>
      <h1>Subscription Status: {status}</h1>
      {status === "Active" ? <p>Welcome to the service!</p> : <p>Please renew your subscription.</p>}
    </div>
  );
}
