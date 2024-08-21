import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import '../App.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [fan, setFan] = useState(false); // Fan 상태 관리
  const [heater, setHeater] = useState(false); // Heater 상태 관리
  const [ledLight, setLedLight] = useState(false); // LED Light 상태 관리
  const [tank1, setTank1] = useState(50); // Tank1 슬라이더 상태 관리
  const [tank2, setTank2] = useState(50); // Tank2 슬라이더 상태 관리
  const [tank3, setTank3] = useState(50); // Tank3 슬라이더 상태 관리
  const [tank4, setTank4] = useState(50); // Tank4 슬라이더 상태 관리

  useEffect(() => {
    fetch('/data/smartFarmData.json')
      .then(response => response.json())
      .then(setData);
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { tempHumData, waterLevelData, illuminationData, tdsData, liquidTempData, predictionData, pieData } = data;

  return (
    <div className="Overview">
      <h1>Overview</h1>
      <div className="dashboard">
        <div className="card">
          <h3>Farm Air Temperature and Humidity</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={tempHumData}>
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="hum" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Water Level</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={waterLevelData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Illumination</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={illuminationData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="light" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>TDS</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={tdsData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="tds" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Farm Liquid Temperature</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={liquidTempData}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temp" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Water and Nutrient Solution Prediction</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={predictionData}>
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="water" stroke="#8884d8" />
              <Line yAxisId="right" type="monotone" dataKey="nutrient" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h3>Water vs Nutrient</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#FFBB28'][index % 2]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="control">
        <h1>Controls</h1>
        <div className="switches">
          <label className="switch">
            <input type="checkbox" className="checkbox" checked={fan} onChange={() => setFan(!fan)} />
            <div className="slider"></div>
            <span>Fan</span>
          </label>
          <label className="switch">
            <input type="checkbox" className="checkbox" checked={heater} onChange={() => setHeater(!heater)} />
            <div className="slider"></div>
            <span>Heater</span>
          </label>
          <label className="switch">
            <input type="checkbox" className="checkbox" checked={ledLight} onChange={() => setLedLight(!ledLight)} />
            <div className="slider"></div>
            <span>LED Light</span>
          </label>
        </div>
        <div className="sliders">
          <label>
            Tank 1
            <input type="range" min="0" max="100" value={tank1} onChange={(e) => setTank1(e.target.value)} />
          </label>
          <label>
            Tank 2
            <input type="range" min="0" max="100" value={tank2} onChange={(e) => setTank2(e.target.value)} />
          </label>
          <label>
            Tank 3
            <input type="range" min="0" max="100" value={tank3} onChange={(e) => setTank3(e.target.value)} />
          </label>
          <label>
            Tank 4
            <input type="range" min="0" max="100" value={tank4} onChange={(e) => setTank4(e.target.value)} />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
