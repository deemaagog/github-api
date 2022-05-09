import './App.css';
import { iconMainSearch } from './assets/index';

function App() {
  return (
    <div className="App">
      <div className='initial-section'>
        <div className='initial-container'>
          <img className='initial-icon' src={iconMainSearch} alt='search'/>
          <h1 className='initial-description'>Start with searching a GitHub user</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
