
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import { lazy } from 'react';
// import { appStore } from 'vantive-mfe-shell/appStore';

const DashboardList = lazy(() => import('./presentation/pages/DashboardList').then(module => ({ default: module.DashboardList })));
const DashboardDetails = lazy(() => import('./presentation/pages/DashboardDetails').then(module => ({ default: module.DashboardDetails })));

function RenderRoutes(props: { isStandalone? : boolean}) {
  const { isStandalone = true } = props;
  return (
    <>
      <h2>Remote Routes</h2>
      <p>---------------------</p>
      <Link to={isStandalone? "/" : "/dashboard"}>Dashboard List</Link>
      <Link to={isStandalone? "/details" : "/dashboard/details"}>Dashboard Details</Link>
      <Routes>
        <Route path="/" element={<DashboardList />} />
        <Route path="/details" element={<DashboardDetails />} />
      </Routes>
    </>
  );
}

interface DashboardProps {
  isStandalone?: boolean;
}

function App(props:DashboardProps) {
  console.log({propsv2: props});
  const { isStandalone = true } = props;
  // const stateData = appStore.getState();
  if(isStandalone) {
    return (
      <BrowserRouter>
        <RenderRoutes isStandalone={true}/>
      </BrowserRouter>
    )
  }
  return (
    <RenderRoutes isStandalone={false}/>
  )
 
}

export default App
