// src/App.js
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main className="App-main">
        {/* Aquí irá el router o las páginas */}
        <p>Contenido principal</p>
      </main>
      <Footer />
    </div>
  );
}

export default App;
