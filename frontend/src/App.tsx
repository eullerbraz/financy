import { Navigate, Route, Routes } from 'react-router-dom';
import { Page } from './components/Page';
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';
import { Categories } from './pages/Categories';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Transactions } from './pages/Transactions';
import { useAuthStore } from './stores/auth';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  return isAuthenticated ? <>{children}</> : <Navigate to='/login' replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  return !isAuthenticated ? <>{children}</> : <Navigate to='/' replace />;
}

function App() {
  return (
    <Routes>
      <Route
        path='/signup'
        element={
          <PublicRoute>
            <Page hasHeader={false}>
              <Signup />
            </Page>
          </PublicRoute>
        }
      />
      <Route
        path='/login'
        element={
          <PublicRoute>
            <Page hasHeader={false}>
              <Login />
            </Page>
          </PublicRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <ProtectedRoute>
            <Page hasHeader={true}>
              <Profile />
            </Page>
          </ProtectedRoute>
        }
      />
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <Page hasHeader={true}>
              <Dashboard />
            </Page>
          </ProtectedRoute>
        }
      />
      <Route
        path='/transactions'
        element={
          <ProtectedRoute>
            <Page hasHeader={true}>
              <Transactions />
            </Page>
          </ProtectedRoute>
        }
      />
      <Route
        path='/categories'
        element={
          <ProtectedRoute>
            <Page hasHeader={true}>
              <Categories />
            </Page>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
