// Execution of application
import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';

export default class App extends React.Component {
  constructor(props) {
    // If you dont pass props to super, this.props wont get set
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Do laundry'
        }
      ]
    };
  }
  render() {
    const {notes} = this.state;

    return (
      // React returns a single component, wrap application within a <div>
      <div>
        <button onClick={this.addNote}>+</button>
        {/* Pass data through a prop to Notes */}
        <Notes notes={notes} />
      </div>
    );
  }

  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  }
}
