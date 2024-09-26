import React, { useState, useEffect } from "react";
import Overview from "./Overview";
import Control from "./Control";
import "../App.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [fan, setFan] = useState(false);
  const [heater, setHeater] = useState(false);
  const [ledLight, setLedLight] = useState(false);
  const [tank1, setTank1] = useState(50);
  const [tank2, setTank2] = useState(50);
  const [tank3, setTank3] = useState(50);
  const [tank4, setTank4] = useState(50);
  const [waterLevel, setWaterLevel] = useState(0);

  const handleWaterLevelChange = (level) => {
    setWaterLevel(level);
  };

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/smartFarmData.json`)
      .then((response) => response.json())
      .then(setData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Overview data={data} />
      <Control
        fan={fan}
        setFan={setFan}
        heater={heater}
        setHeater={setHeater}
        ledLight={ledLight}
        setLedLight={setLedLight}
        tank1={tank1}
        setTank1={setTank1}
        tank2={tank2}
        setTank2={setTank2}
        tank3={tank3}
        setTank3={setTank3}
        tank4={tank4}
        setTank4={setTank4}
        waterLevel={waterLevel}
        handleWaterLevelChange={handleWaterLevelChange}
      />
    </div>
  );
};

export default Dashboard;
