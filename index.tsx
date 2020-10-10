import React from 'react';
import { render } from 'react-dom';

import { getStore } from './logic';
import './style.css';
import {App} from "./App";
import { useAsync } from "react-async-hook";


const Switcher: React.FunctionComponent = ()=>{


  const asyncGetStore = useAsync(getStore, []);

  return(
    <div>
    {
      asyncGetStore.loading ? <h1>Loading...</h1> : <App store={asyncGetStore.result} />
    }

    </div>
  )
}

render(<Switcher />, document.getElementById('root'));
