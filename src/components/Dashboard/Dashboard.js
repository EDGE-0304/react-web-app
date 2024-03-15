import React from "react";
import "./Dashboard.css";
import { useUser } from '../../UserContext'; // Adjust the import path as necessary


function Dashboard() {
  // can make this dynamic by passing props or fetching from an API
  const { userCredentials, setUserCredentials } = useUser();

  console.log(userCredentials);

  const stats = [
    { period: "Today", count: 0 },
    { period: "This week", count: 0 },
    { period: "This month", count: 0 },
    { period: "This year", count: 1 },
    { period: "All time", count: 12 },
  ];

  const options = {
    acceptAllDevices: true,
  };

  // function bluetoothConnect() {
  //   alert("attempting to connect to bluetooth...");
  //   navigator.bluetooth
  //     .requestDevice(options)
  //     .then((device) => {
  //       console.log("Device selected:", device);
  //     })
  //     .catch((error) => {
  //       console.error("Error during Bluetooth device selection:", error);
  //     });
  // }

  function bluetoothConnect() {
    let ssidCharacteristic, passwordCharacteristic;

    alert("attempting to connect to bluetooth...");
    navigator.bluetooth
      .requestDevice({
        filters: [
          {
            services: ["991cbd4a-2e1b-4182-bc44-ca34489f6324"], // Custom WiFi Service UUID
          },
        ],
      })
      .then((device) => {
        console.log("Device selected:", device);
      })
      .then((server) =>
        server.getPrimaryService("991cbd4a-2e1b-4182-bc44-ca34489f6324")
      )
      .then((service) => {
        // Get the WiFi SSID and Password characteristics
        return Promise.all([
          service.getCharacteristic("abcd1234-ab12-cd34-ef56-abcdef123456"),
          service.getCharacteristic("abcd5678-ab12-cd34-ef56-abcdef123457"),
        ]);
      })
      .then((characteristics) => {
        [ssidCharacteristic, passwordCharacteristic] = characteristics;
        return Promise.all([
          ssidCharacteristic.readValue(),
          passwordCharacteristic.readValue(),
        ]);
      })
      .then((values) => {
        const ssidValue = new TextDecoder().decode(values[0]);
        const passwordValue = new TextDecoder().decode(values[1]);

        document.getElementById(
          "wifiInfo"
        ).innerHTML = `SSID: ${ssidValue}<br>Password: ${passwordValue}`;
      })
      .catch((error) => {
        console.error("Error during Bluetooth device selection:", error);
      });
  }

  return (
    <div className="dashboard-container">
      <h1>Welcome, user!</h1>
      <p>You killed 0 bugs today!</p>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <h2>{stat.period}</h2>
            <p>{stat.count}</p>
            <button>Leaderboard</button>
            <button>View Trend</button>
          </div>
        ))}
      </div>
      <div>
        <button onClick={bluetoothConnect}>"Connect to bluetooth"</button>
        <div id="wifiInfo"></div>
      </div>
    </div>
  );
}

export default Dashboard;
