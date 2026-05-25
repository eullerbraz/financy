import { Route, Routes } from 'react-router-dom';
import { Page } from './components/Page';
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';
import { Dashboard } from './pages/Dashboard';
import { Transactions } from './pages/Transactions';

function App() {
  return (
    <Routes>
      <Route
        path='/signup'
        element={
          <Page hasHeader={false}>
            <Signup />
          </Page>
        }
      />
      <Route
        path='/login'
        element={
          <Page hasHeader={false}>
            <Login />
          </Page>
        }
      />
      <Route
        path='/'
        element={
          <Page hasHeader={true}>
            <Dashboard />
          </Page>
        }
      />
      <Route
        path='/transactions'
        element={
          <Page hasHeader={true}>
            <Transactions />
          </Page>
        }
      />
    </Routes>
  );
}

export default App;
