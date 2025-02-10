import { Navigate, Route, Routes } from 'react-router-dom';
import { Typography, Spin } from 'antd';
import { lazy, Suspense } from 'react';

const AppRoutes: React.FC = () => {
  const EfoTerms = lazy(() => import('./components/EfoTerms'));

  const { Title } = Typography;

  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<Navigate to={'/efo-terms'} />} />
        <Route path="/efo-terms" element={<EfoTerms />} />
        <Route
          path="*"
          element={
            <>
              <Title level={2}>Error 404: Page not found</Title>
            </>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
