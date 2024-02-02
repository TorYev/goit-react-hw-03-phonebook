import { Component } from 'react';
import MyPhonebook from './MyPhonebook/MyPhonebook';

class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  render() {
    return (
      <>
        <MyPhonebook />
      </>
    );
  }
}
export default App;
