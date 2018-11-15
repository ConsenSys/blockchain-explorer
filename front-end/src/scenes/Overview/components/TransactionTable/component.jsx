import React from 'react';
import { arrayOf, shape, array, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

function SimpleTable(props) {
  const { classes, transactions, searchResults, searchText } = props;
  let filteredRows = [...transactions];
  filteredRows = filteredRows.sort((a, b) => a - b).slice(0, 5);

  if (searchText && searchResults.transactions.length) {
    filteredRows = searchResults.transactions;
  }

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Hash</TableCell>
          <TableCell numeric>Value Out</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredRows.map(row => (
          <TableRow key={row.hash}>
            <TableCell component="th" scope="row">
              <Link to={`/transactions/${row.hash}`}>{row.hash}</Link>
            </TableCell>
            <TableCell numeric>{row.value} Wei</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

SimpleTable.propTypes = {
  classes: shape({}).isRequired,
  transactions: arrayOf(shape({})).isRequired,
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
