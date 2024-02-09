import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './MyPhonebook.styled';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import PhonebookList from './PhonebookList/PhonebookList';

class MyPhonebook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('my-contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('my-contacts', JSON.stringify(contacts));
    }
  }

  isDuplicate({ name, number }) {
    const { contacts } = this.state;
    return contacts.some(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() ||
        contact.number.toLowerCase() === number.toLowerCase()
    );
  }

  addContact = data => {
    if (this.isDuplicate(data)) {
      alert(
        `Contact with name ${data.name} or number ${data.number} already exists.`
      );
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id: nanoid(), ...data }],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const contacts = this.getFilteredContacts();

    return (
      <Container>
        <h2>Phonebook</h2>
        <PhonebookForm onSubmit={this.addContact} />
        <input
          value={filter}
          onChange={this.changeFilter}
          name="filter"
          placeholder="Search"
        />
        <PhonebookList items={contacts} deleteContact={this.deleteContact} />
      </Container>
    );
  }
}

export default MyPhonebook;
