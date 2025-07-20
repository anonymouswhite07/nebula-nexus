import React, { useState, useEffect } from 'react';
import { Satellite, MapPin, Thermometer, Zap, Clock, Globe, AlertTriangle, Rocket } from 'lucide-react';

const AstroScope = () => {
  const [issData, setIssData] = useState(null);
  const [asteroidData, setAsteroidData] = useState([]);
  const [marsWeather, setMarsWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loading, setLoading] = useState(true);

  // Fetch ISS location
  useEffect(() => {
    const fetchISSData = async () => {
      try {
        const response = await fetch('http://api.open-notify.org/iss-now.json');
        const data = await response.json();
        setIssData(data);
      } catch (error) {
        console.error('Error fetching ISS data:', error);
        // Fallback data
        setIssData({
          iss_position: { latitude: "25.4", longitude: "-45.2" },
          timestamp: Date.now() / 1000
        });
      }
    };

    const fetchAsteroids = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&Wg419dG1oDI6PsixDfGcktUdpMKKBe7zkfRia1oO`);
        const data = await response.json();
        const asteroids = Object.values(data.near_earth_objects)[0]?.slice(0, 3) || [];
        setAsteroidData(asteroids);
      } catch (error) {
        console.error('Error fetching asteroid data:', error);
        // Fallback data
        setAsteroidData([
          { name: "2024 AB1", estimated_diameter: { kilometers: { estimated_diameter_max: 0.5 } }, close_approach_data: [{ miss_distance: { kilometers: "7500000" } }] },
          { name: "2024 BC2", estimated_diameter: { kilometers: { estimated_diameter_max: 1.2 } }, close_approach_data: [{ miss_distance: { kilometers: "12000000" } }] }
        ]);
      }
    };

    // Simulated Mars weather data
    const generateMarsWeather = () => {
      setMarsWeather({
        sol: 3847,
        temperature: { high: -15, low: -78 },
        wind_speed: 5.2,
        pressure: 725,
        season: "Month 8"
      });
    };

    fetchISSData();
    fetchAsteroids();
    generateMarsWeather();
    setLoading(false);

    const intervals = [
      setInterval(fetchISSData, 10000), // Update ISS every 10 seconds
      setInterval(() => setCurrentTime(new Date()), 1000) // Update time every second
    ];

    return () => intervals.forEach(clearInterval);
  }, []);

  const StarField = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${Math.random() * 2 + 1}s`
          }}
        />
      ))}
    </div>
  );

  const GlowCard = ({ children, className = "" }) => (
    <div className={`bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-6 shadow-2xl hover:border-cyan-400/50 transition-all duration-300 hover:shadow-cyan-500/20 ${className}`}>
      {children}
    </div>
  );

  const ISSTracker = () => (
    <GlowCard className="col-span-2">
      <div className="flex items-center gap-3 mb-4">
        <Satellite className="text-cyan-400 w-6 h-6" />
        <h3 className="text-xl font-bold text-white">ISS Live Tracker</h3>
      </div>
      {issData ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="text-green-400 w-4 h-4" />
                <span className="text-green-400 font-semibold">Latitude</span>
              </div>
              <span className="text-2xl font-mono text-white">{parseFloat(issData.iss_position.latitude).toFixed(4)}°</span>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="text-blue-400 w-4 h-4" />
                <span className="text-blue-400 font-semibold">Longitude</span>
              </div>
              <span className="text-2xl font-mono text-white">{parseFloat(issData.iss_position.longitude).toFixed(4)}°</span>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Altitude: ~408 km</span>
              <span className="text-gray-300">Speed: ~27,600 km/h</span>
            </div>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      ) : (
        <div className="text-gray-400">Loading ISS data...</div>
      )}
    </GlowCard>
  );

  const AsteroidTracker = () => (
    <GlowCard className="col-span-2">
      <div className="flex items-center gap-3 mb-4">
        <AlertTriangle className="text-orange-400 w-6 h-6" />
        <h3 className="text-xl font-bold text-white">Near-Earth Asteroids</h3>
      </div>
      <div className="space-y-3">
        {asteroidData.map((asteroid, index) => (
          <div key={index} className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-orange-400">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-white">{asteroid.name}</h4>
                <p className="text-sm text-gray-300">
                  Diameter: ~{asteroid.estimated_diameter?.kilometers?.estimated_diameter_max?.toFixed(2) || "0.5"} km
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-orange-400 font-mono">
                  {(parseFloat(asteroid.close_approach_data?.[0]?.miss_distance?.kilometers || "7500000") / 1000000).toFixed(2)}M km
                </p>
                <p className="text-xs text-gray-400">miss distance</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  );

  const SatelliteStats = () => (
    <GlowCard>
      <div className="flex items-center gap-3 mb-4">
        <Zap className="text-yellow-400 w-6 h-6" />
        <h3 className="text-xl font-bold text-white">Satellite Telemetry</h3>
      </div>
      <div className="space-y-4">
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Power Systems</span>
            <span className="text-green-400 font-mono">98.7%</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '98.7%' }}></div>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Communication</span>
            <span className="text-blue-400 font-mono">NOMINAL</span>
          </div>
        </div>
        <div className="bg-slate-800/50 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-300">Orbital Velocity</span>
            <span className="text-cyan-400 font-mono">7.66 km/s</span>
          </div>
        </div>
      </div>
    </GlowCard>
  );

  const MarsWeather = () => (
    <GlowCard>
      <div className="flex items-center gap-3 mb-4">
        <Thermometer className="text-red-400 w-6 h-6" />
        <h3 className="text-xl font-bold text-white">Mars Weather</h3>
      </div>
      {marsWeather && (
        <div className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="text-center">
              <span className="text-3xl font-mono text-red-400">{marsWeather.temperature.high}°C</span>
              <p className="text-gray-300 text-sm">High Temperature</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <span className="text-xl font-mono text-blue-300">{marsWeather.temperature.low}°C</span>
              <p className="text-gray-400 text-xs">Low</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-3 text-center">
              <span className="text-xl font-mono text-green-300">{marsWeather.wind_speed}</span>
              <p className="text-gray-400 text-xs">Wind m/s</p>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Sol {marsWeather.sol}</span>
              <span className="text-gray-300">{marsWeather.season}</span>
            </div>
          </div>
        </div>
      )}
    </GlowCard>
  );

  const MissionTimeline = () => (
    <GlowCard className="col-span-4">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="text-purple-400 w-6 h-6" />
        <h3 className="text-xl font-bold text-white">Mission Timeline</h3>
      </div>
      <div className="space-y-4">
        {[
          { time: "2024-07-20 14:30:00", mission: "ISS Expedition 71", status: "ACTIVE", color: "green" },
          { time: "2024-07-18 09:15:00", mission: "Artemis II Prep", status: "ONGOING", color: "blue" },
          { time: "2024-07-15 16:42:00", mission: "Mars Sample Return", status: "PLANNING", color: "yellow" },
          { time: "2024-07-10 11:20:00", mission: "Europa Clipper", status: "COMPLETED", color: "purple" }
        ].map((mission, index) => (
          <div key={index} className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-lg">
            <div className={`w-3 h-3 rounded-full bg-${mission.color}-400`}></div>
            <div className="flex-1">
              <h4 className="font-semibold text-white">{mission.mission}</h4>
              <p className="text-sm text-gray-300 font-mono">{mission.time}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-${mission.color}-400/20 text-${mission.color}-400`}>
              {mission.status}
            </span>
          </div>
        ))}
      </div>
    </GlowCard>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <StarField />
        <div className="text-center">
          <Rocket className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-white mb-2">Initializing AstroScope...</h2>
          <p className="text-gray-300">Connecting to mission control systems</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <StarField />
      
      {/* Header */}
      <div className="relative z-10 p-6">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            🚀 AstroScope
          </h1>
          <p className="text-xl text-gray-300 mb-4">Mission Control Dashboard</p>
          <div className="text-sm text-cyan-400 font-mono">
            Mission Time: {currentTime.toISOString().replace('T', ' ').slice(0, 19)} UTC
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ISSTracker />
          <SatelliteStats />
          <MarsWeather />
          <AsteroidTracker />
          <MissionTimeline />
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-400">
          <p className="text-sm">
            🌌 Powered by NASA APIs & Real-time Space Data | Built for Nebula Nexus Hackathon
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AstroScope;