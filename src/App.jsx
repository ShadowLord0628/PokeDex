import './App.css'
import Pokedex from './Components/Pokedex/Pokedex'
import CustomRoutes from './routes/CustomRoutes'
import { Link } from 'react-router-dom';

function App() {

  return (
    <div className='outer-pokedex'>
      <h1 id="pokedex-heading">
        <Link to="/">PokeDex</Link>
      </h1>
      <CustomRoutes />
    </div>
  )
}

export default App;
