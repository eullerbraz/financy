import { Route, Routes } from 'react-router-dom';
import { Page } from './components/Page';
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';
import { Categories } from './pages/Categories';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
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
        path='/profile'
        element={
          <Page hasHeader={true}>
            <Profile />
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
      <Route
        path='/categories'
        element={
          <Page hasHeader={true}>
            <Categories />
          </Page>
        }
      />
    </Routes>
  );
}

export default App;
