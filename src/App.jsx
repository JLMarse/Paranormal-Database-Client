import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import AppRoutes from './routes/AppRoutes'
import Footer from '../src/components/Footer/Footer'
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className='totalApp parent'>
      <Navigation />
      <div className="Approutes">
        <AppRoutes />
      </div>
      <Footer />
    </div>


  );
}

export default App
