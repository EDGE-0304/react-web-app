import React from "react";
import "./Dashboard.css";
import { useUser } from '../../UserContext'; // Adjust the import path as necessary

const MAX_RETRIES = 1;
let retryCount = 0;
const RETRY_DELAY = 1000;

function Dashboard() {
  // can make this dynamic by passing props or fetching from an API
  const { userCredentials, setUserCredentials } = useUser();

  console.log(userCredentials);

  const ssid = "FarDream";
  const password = "fardream526";

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

  async function bluetoothSendWifi() {
    let ssidCharacteristic, passwordCharacteristic;

    alert("attempting to connect to bluetooth...");

    let currentDevice;

    await navigator.bluetooth
        .requestDevice({
            filters: [{
                services: ["991cbd4a-2e1b-4182-bc44-ca34489f6324"], // Custom WiFi Service UUID
            }],
        })
        .then(device => {
            console.log("Device selected:", device);
            currentDevice = device;
            return currentDevice.gatt.connect(); // Connect to the GATT Server.
        })
        .then(server => {
            console.log("Connecting to the primary service");
            return server.getPrimaryService("991cbd4a-2e1b-4182-bc44-ca34489f6324");
        })
        .then(service => {
            console.log("Getting the wifi and password characteristic");
            return Promise.all([
                service.getCharacteristic("abcd1234-ab12-cd34-ef56-abcdef123456"), // WiFi SSID Characteristic
                service.getCharacteristic("abcd5678-ab12-cd34-ef56-abcdef123457"), // Password Characteristic
            ]);
        })
        .then(characteristics => {
            console.log("Got the characteristics");

            [ssidCharacteristic, passwordCharacteristic] = characteristics;

            // // Convert SSID and Password strings into ArrayBuffers
            let encoder = new TextEncoder();
            let ssidBuffer = encoder.encode(ssid); // Ensure you have the SSID defined
            let passwordBuffer = encoder.encode(password); // Ensure you have the Password defined

            // Sequentially write SSID and Password with response handling
            return ssidCharacteristic.writeValueWithResponse(ssidBuffer)
              .then(() => {
                console.log('SSID written with response');
                return passwordCharacteristic.writeValueWithResponse(passwordBuffer);
              })
              .then(() => {
                console.log('Password written with response');
                return true;
              });
        })
        .then(successfullySent => {
            if(successfullySent) {
              console.log("WiFi configuration sent successfully.");
              // if (currentDevice && currentDevice.gatt.connected) {
              //     currentDevice.gatt.disconnect();
              //     console.log("Disconnected from the device.");
              // }
            } else {
              throw new Error("Cannot send wifi configuration")
            }
        })
        .catch(error => {
            console.error("Error during the operation:", error);
        });

    if (retryCount < MAX_RETRIES) {
      setTimeout(() => {
        console.log(`Retrying... (${retryCount + 1})`);
        retryCount += 1;
        bluetoothSendWifi();
      }, RETRY_DELAY);
    }
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
        <button onClick={bluetoothSendWifi}>"Connect to bluetooth"</button>
        <div id="wifiInfo"></div>
      </div>
    </div>
  );
}

export default Dashboard;
