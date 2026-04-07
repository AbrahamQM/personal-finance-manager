import './App.css';
import Footer from './components/Footer';
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <h2>Welcome to Personal Financial Management App</h2>
        <p>Track your expenses, manage your budget, and achieve your financial goals.</p>
      </div>
      <Footer />
    </div>
  );
}

export default App;
