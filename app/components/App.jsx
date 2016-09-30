// Execution of application
import React from 'react';
import uuid from 'uuid';
import Notes from './Notes';
import connect from '../libs/connect';

class App extends React.Component {
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
        {this.props.test}
        <button className="add-note" onClick={this.addNote}>+</button>
        {/* Pass data through a prop to Notes */}
        <Notes notes={notes}
        onNoteClick={this.activateNoteEdit}
        onEdit={this.editNote}
        onDelete={this.deleteNote} />
      </div>
    )
  }

  addNote = () => {
    this.setState({
      notes: this.state.notes.concat([{
        id: uuid.v4(),
        task: 'New task'
      }])
    });
  }

  deleteNote = (id, e) => {
    // Avoid bubbling to edit
    e.stopPropagation();

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }

  activateNoteEdit = (id) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(note.id === id) {
          note.editing = true;
        }

        return note;
      })
    });
  }

  editNote = (id, task) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(note.id === id) {
          note.editing = false;
          note.task = task;
        }

        return note;
      })
    });
  }
}

export default connect(() => ({
  test: 'test'
}))(App)
