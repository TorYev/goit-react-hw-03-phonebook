import { Component } from 'react';
import MyPhonebook from './MyPhonebook/MyPhonebook';

class App extends Component {
  state = {
    contacts: [],
    name: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    return (
      <>
        <MyPhonebook />
      </>
    );
  }
}
export default App;
