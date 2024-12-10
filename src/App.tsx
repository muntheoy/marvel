import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CharactersPage from './components/CharactersPage';
import ComicsPage from './components/ComicsPage';
import Footer from './components/Footer';
import CharacterDetails from './components/CharacterDetails';
import ComicDetails from './components/ComicDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/comics" element={<ComicsPage />} />
          <Route path="/characters/:id" element={<CharacterDetails />} />
          <Route path="/comics/:id" element={<ComicDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
