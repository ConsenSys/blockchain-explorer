import React from 'react';
import moment from 'moment';
import { arrayOf, shape, array, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@Components/Tooltip';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const getNewsDateTime = age => {
  let dateTime = '';
  if (age) {
    const published = moment.unix(age);
    dateTime =
      moment().diff(published, 'days') > 7
        ? published.format('Do MMM, YYYY')
        : published.fromNow();
  }
  return dateTime;
};

function SimpleTable(props) {
  const { classes, blocks, searchResults, searchText } = props;

  let filteredRows = [...blocks];
  filteredRows = filteredRows.slice(-5);

  if (searchText && searchResults.blocks.length) {
    filteredRows = searchResults.blocks;
  }

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Height</TableCell>
          <TableCell>Hash</TableCell>
          <TableCell>Age</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredRows.map(row => (
          <TableRow key={row.hash}>
            <TableCell component="th" scope="row">
              {row.number}
            </TableCell>
            <TableCell>
              <Link to={`/blocks/${row.hash}`}>{row.hash}</Link>
            </TableCell>
            <TableCell>
              {' '}
              <Tooltip title={getNewsDateTime(row.timestamp)}>
                <InfoIcon />
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

SimpleTable.propTypes = {
  classes: shape({}).isRequired,
  blocks: arrayOf(shape({})).isRequired,
  searchResults: shape({
    blocks: array,
    transactions: array,
  }),
  searchText: string,
};

SimpleTable.defaultProps = {
  searchResults: shape({
    blocks: array,
    transactions: array,
  }),
  searchText: '',
};

export default withStyles(styles)(SimpleTable);
