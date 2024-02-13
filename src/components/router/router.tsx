import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import BeerList from '../list/beers/beer.list';

const Register = lazy(() => import('../register/register'));
// Const ErrorPage = lazy(() => import('../error/error'));
// const CreateBeer = lazy(() => import('../beers/beers.form'));
const BeerDetails = lazy(() => import('../details/beer.details'));
const UserDetails = lazy(() => import('../details/user.details'));
const Home = lazy(() => import('../home/home'));

export function Router() {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/addBeer" element={<CreateBeer />} /> */}
          <Route path="/beers" element={<BeerList />} />
          <Route path="/user/" element={<UserDetails />}></Route>
          <Route path="/details/:beerId" element={<BeerDetails />}></Route>
          {/* <Route path="/*" element={<ErrorPage />} /> */}
        </Routes>
      </Suspense>
    </main>
  );
}
