import './App.css';
import Footer from './Layout/Footer';
import Nav from './Layout/Nav';
import Routers from './Routers';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routers/>
      <Footer/>
    </div>
  );
}

export default App;
