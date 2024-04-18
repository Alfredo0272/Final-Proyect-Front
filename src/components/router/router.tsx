import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import BeerList from '../list/beers/beer.list';
import PubList from '../list/pubs/pub.list';

const Register = lazy(() => import('../register/register'));
const ErrorPage = lazy(() => import('../error/error'));
const CreateBeer = lazy(() => import('../beers/beers.form'));
const CreatePubs = lazy(() => import('../pubs/pubs.form'));
const BeerDetails = lazy(() => import('../details/beer.details'));
const PubDetails = lazy(() => import('../details/pub.details'));
const UserDetails = lazy(() => import('../details/user.details'));
const Home = lazy(() => import('../home/home'));

export function Router() {
  return (
    <main>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addBeer" element={<CreateBeer />} />
          <Route path="/addPubs" element={<CreatePubs />} />
          <Route path="/beers" element={<BeerList />} />
          <Route path="/pubs" element={<PubList />} />
          <Route path="/user/" element={<UserDetails />}></Route>
          <Route path="/details/:beerId" element={<BeerDetails />}></Route>
          <Route path="/pubs/:pubId" element={<PubDetails />}></Route>
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </main>
  );
}
