import './App.css';
import { Footer, Header } from './components';
import { AllRoutes } from './routes/AllRoutes';
import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';

function App() {
  
  return (
    <AuthProvider>
      <AlertProvider>
        <div className="dark:bg-dark font-body">
          <Header />
          <AllRoutes />
          <Footer />
        </div>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
