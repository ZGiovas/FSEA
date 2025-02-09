import { Navigate, Route, Routes } from 'react-router-dom';
import EfoTerms from './components/EfoTerms';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/efo-terms'} />} />
      <Route path="/efo-terms" element={<EfoTerms />} />
    </Routes>
  );
};

export default AppRoutes;
