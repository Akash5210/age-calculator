import './App.css';
import Agecalculator from './Agecalculator';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Agecalculator/>
      <ToastContainer/>
      <footer>
        <p>&copy; created by Akash Kumar</p>
      </footer>
    </div>
  );
}

export default App;
