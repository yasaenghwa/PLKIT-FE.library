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
    fetch(`${process.env.PUBLIC_URL}/data/smartFarmData.json`)
        .then(response => response.json())
        .then(setData);
    }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { tempHumData, waterLevelData, illuminationData, tdsData, liquidTempData, predictionData, pieData } = data;

// 임시 데이터 설정
const donutData = [
    { name: 'Water', value: 54, fill: '#00C49F' },
    { name: 'Nutrient', value: 100, fill: '#FFBB28' }
  ];


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

         {/* Water Level Chart 대신 Water Level List 구현 */}
        <div className="card">
          <h3>Water Level</h3>
          <div className="water-level">
            <div className="water-level-item">
              <span>tank1 (water level)</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
              <span>60% Correct</span>
            </div>
            <div className="water-level-item">
              <span>tank2 (nutrient solution level)</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '45%' }}></div>
              </div>
              <span>45% Correct</span>
            </div>
            <div className="water-level-item">
              <span>tank3 (recycle fluid level)</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '20%' }}></div>
              </div>
              <span>20% Correct</span>
            </div>
            <div className="water-level-item">
              <span>tank4 (farm level)</span>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '45%' }}></div>
              </div>
              <span>45% Correct</span>
            </div>
          </div>
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

        {/* Water and Nutrient Solution Prediction 섹션 */}
        <div className="card double-card" style={{ width: '100%' }}>
          <h3>Water and Nutrient Solution Prediction</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '50%' }}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={predictionData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid stroke="#ccc" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="water" fill="#00C49F" />
                  <Bar dataKey="nutrient" fill="#FFBB28" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="80%" height={300}>
                <PieChart>
                  <Pie
                    data={donutData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    label
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <h1>Control</h1>
      <div className="control">
        {/* Control Card 섹션 */}
        <div className="control-card">
          <h3>Fan</h3>
          <label className="switch">
            <input type="checkbox" className="checkbox" checked={fan} onChange={() => setFan(!fan)} />
            <div className="slider"></div>
          </label>
        </div>

        <div className="control-card">
          <h3>Heater</h3>
          <label className="switch">
            <input type="checkbox" className="checkbox" checked={heater} onChange={() => setHeater(!heater)} />
            <div className="slider"></div>
          </label>
        </div>

        <div className="control-card">
          <h3>LED Light</h3>
          <label className="switch">
            <input type="checkbox" className="checkbox" checked={ledLight} onChange={() => setLedLight(!ledLight)} />
            <div className="slider"></div>
          </label>
        </div>

        {/* Pump 섹션 */}
        <div className="slider-container">
          <h3>Pump</h3>
          <div className="slider-wrapper">
            <select>
              <option value="tank1">Tank 1</option>
            </select>
            <input type="range" min="0" max="100" value={tank1} onChange={(e) => setTank1(e.target.value)} />
          </div>
          <div className="slider-wrapper">
            <select>
              <option value="tank2">Tank 2</option>
            </select>
            <input type="range" min="0" max="100" value={tank2} onChange={(e) => setTank2(e.target.value)} />
          </div>
          <div className="slider-wrapper">
            <select>
              <option value="tank3">Tank 3</option>
            </select>
            <input type="range" min="0" max="100" value={tank3} onChange={(e) => setTank3(e.target.value)} />
          </div>
          <div className="slider-wrapper">
            <select>
              <option value="tank4">Tank 4</option>
            </select>
            <input type="range" min="0" max="100" value={tank4} onChange={(e) => setTank4(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
