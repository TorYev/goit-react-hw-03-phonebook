import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Container } from './MyPhonebook.styled';
import PhonebookForm from './PhonebookForm/PhonebookForm';
import PhonebookList from './PhonebookList/PhonebookList';

class MyPhonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContacts = data => {
    if (this.isDuplicate(data)) {
      return alert(
        `Contact with ${data.name} and ${data.number} already in list`
      );
    }

    const newContact = { id: nanoid(), ...data };
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact],
    }));
  };

  deleteContacts = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(item => item.id !== id),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  isDuplicate = ({ name }) => {
    const { contacts } = this.state;
    return contacts.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );
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
    const contacts = this.getFilteredContacts();
    return (
      <Container>
        <h2>Phonebook</h2>
        <PhonebookForm onSubmit={this.addContacts} />
        <div>
          <input
            onChange={this.changeFilter}
            name="filter"
            placeholder="Search"
          />
          <PhonebookList
            items={contacts}
            deleteContacts={this.deleteContacts}
          />
        </div>
      </Container>
    );
  }
}

export default MyPhonebook;
