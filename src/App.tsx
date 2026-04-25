import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { CaseBoardPage } from './pages/CaseBoardPage';
import { FormDetailPage } from './pages/FormDetailPage';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/case" element={<CaseBoardPage />} />
        <Route path="/case/:formKey" element={<FormDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
