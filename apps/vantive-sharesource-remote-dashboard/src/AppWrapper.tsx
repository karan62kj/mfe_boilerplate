import App from './App';
import { Provider as LocalProvider } from 'react-redux';
import { dashboardStore } from './business/store/dashboard.store';

interface DashboardProps {
  isStandalone?: boolean;
}

const AppWrapper = (props: DashboardProps) => {
  return (
    <LocalProvider store={dashboardStore}>
      <App {...props} />
    </LocalProvider>
  );
};

export default AppWrapper;
