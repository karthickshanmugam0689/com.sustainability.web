import './App.css';
import { Button } from '@sustainability/core-ui-modules';
import { SampleMfe1 } from './components/SampleMfe1';
import { SampleMfe2 } from './components/SampleMfe2';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Button onClick={() => alert('clicked')} text='Click me' />
        <SampleMfe1 />
        <SampleMfe2 />
      </header>
    </div>
  );
}

export default App;
