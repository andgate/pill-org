import {AddMedDialog} from 'components/AddMedDialog';

import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';

import IconButton from 'material-ui/IconButton';

import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

var moment = require('moment');


export class MedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addMedVisible: false,   
    };

    this.handleOpenAddMed = this.handleOpenAddMed.bind(this);
    this.handleCancelAddMed = this.handleCancelAddMed.bind(this);
    this.handleSubmitAddMed = this.handleSubmitAddMed.bind(this);
  }

  handleOpenAddMed = () => {
    this.setState({addMedVisible: true, });
  }

  handleCancelAddMed = () => {
    this.setState({addMedVisible: false, });
  }

  handleSubmitAddMed = (med) => {
    this.props.onAddMed(med);
  }

  render() {
    let meds = this.props.meds;
    const addMedVisible = this.state.addMedVisible;

    return (
      <Paper zDepth={2}>
        <Subheader>
          Medications
          <IconButton onClick={this.handleOpenAddMed}><ContentAddCircle /></IconButton>
        </Subheader>
        <AddMedDialog
          visible={addMedVisible}
          onOpen={this.handleOpenAddMed} 
          onCancel={this.handleCancelAddMed}
          onSubmit={this.handleSubmitAddMed}
        />

        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Dose</TableHeaderColumn>
              <TableHeaderColumn>Time</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            { meds.map( med => (
                <TableRow>
                  <TableRowColumn>
                    {med.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {med.dose + med.units}
                  </TableRowColumn>
                  <TableRowColumn>
                    {moment(med.time).format("h:mm a")}
                  </TableRowColumn>
                  <Divider />
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}