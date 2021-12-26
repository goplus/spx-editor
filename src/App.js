import Appbar from './components/Appbar';
import Workspace from './components/Workspace';
import './App.css';

function App() {
  return (
    <div className='flex flex-col h-screen bg-gray-500'>
      <Appbar />
      <Workspace />
    </div>
  );
}

export default App;
