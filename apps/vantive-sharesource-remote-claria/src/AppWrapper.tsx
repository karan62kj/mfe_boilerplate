import App from './App';

interface AppWrapperProps {
  isStandalone?: boolean;
}

const AppWrapper = (props: AppWrapperProps) => {
  const { isStandalone = false } = props;
  
  return <App isStandalone={isStandalone} />;
};

export default AppWrapper;
