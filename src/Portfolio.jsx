import React, { useState } from 'react';

const Portfolio = () => {
  const [theme, setTheme] = useState('neon-green');

  return (
    <div className={`theme-${theme} p-6`}>
      <h1 className="text-3xl font-bold mb-4">Welcome to My Cyberpunk Portfolio</h1>
      <p>This is your futuristic interface. Change the theme below.</p>
      <button onClick={() => setTheme('neon-green')} className="m-2 p-2 bg-green-500">Neon Green</button>
      <button onClick={() => setTheme('neon-orange')} className="m-2 p-2 bg-orange-500">Neon Orange</button>
    </div>
  );
};

export default Portfolio;
