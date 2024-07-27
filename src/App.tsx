import React, { } from 'react';
import Create from './components/create';
import List from './components/list';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <div className='flex flex-col h-screen w-screen justify-center items-center bg-black p-2'>
      <Create /> 
      <List/>
    </div>
  );
};

export default App;

