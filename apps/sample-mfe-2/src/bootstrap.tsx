import ReactDOM from 'react-dom';

import App from './App';

const mount = (el: Element): (() => void) => {
  ReactDOM.render(<App />, el);

  return () => {
    ReactDOM.unmountComponentAtNode(el);
  };
};

export { mount };
