
import './App.css';
import WeatherProvider from './services/WeatherContext';
// import {  BrowserRouter } from 'react-router-dom';
import WeatherDisplay from './components/WeatherDisplay';
// import WeatherForcast from './components/WeatherForcast';

function App() {
  return (
    <WeatherProvider>
        <WeatherDisplay />
    </WeatherProvider>
  );
}

export default App;
