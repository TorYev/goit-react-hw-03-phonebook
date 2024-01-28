import { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
} from './PhonebookForm.styled';

class PhonebookForm extends Component {
  PhoneNameId = nanoid();
  PhoneNumberId = nanoid();

  state = {
    name: '',
    number: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit({ ...this.state });
    this.setState({
      name: '',
      number: '',
    });
  };
  render() {
    const { PhoneNameId, PhoneNumberId, handleSubmit, handleChange } = this;
    const { name, number } = this.state;
    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor={PhoneNameId}>Name</Label>
          <Input
            value={name}
            onChange={handleChange}
            id={PhoneNameId}
            type="text"
            name="name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor={PhoneNumberId}>Number</Label>
          <Input
            value={number}
            onChange={handleChange}
            id={PhoneNumberId}
            type="tel"
            name="number"
            required
          />
        </FormGroup>
        <SubmitButton type="submit">Add contact</SubmitButton>
      </Form>
    );
  }
}
export default PhonebookForm;
