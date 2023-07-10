import './App.css';
import { Footer, Header } from './components';
import { AllRoutes } from './routes/AllRoutes';
import { AuthProvider } from './context/AuthContext';

function App() {
  
  return (
    <AuthProvider>
      <div className="dark:bg-dark font-body">
        <Header />
        <AllRoutes />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
