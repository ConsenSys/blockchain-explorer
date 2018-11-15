import React, { Component, Fragment } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { bool, shape, arrayOf, func, string } from 'prop-types';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Transaction from './components/Transaction';

export default class Transactions extends Component {
  static propTypes = {
    transactions: arrayOf(shape({})),
    loading: bool,
    fetchTransactions: func.isRequired,
    match: shape({
      isExact: bool.isRequired,
      params: shape({
        networkId: string,
      }).isRequired,
    }).isRequired,
  };

  static defaultProps = {
    transactions: [],
    loading: false,
  };

  componentDidMount() {
    const params = {
      getNotified: true,
    };
    this.props.fetchTransactions(params);
  }

  render() {
    const { transactions, loading, match } = this.props;

    return (
      <Fragment>
        <Switch>
          <Route
            path={`${match.path}/:transactionId`}
            component={Transaction}
          />
        </Switch>

        {match.isExact && (
          <div className="transactions__page__wrapper">
            <Typography variant="h5">Transactions</Typography>
            <p />
            <div>
              <Paper
                style={{ marginTop: '1.5em' }}
                className="transactions__contents__wrapper"
              >
                {loading && (
                  <div className="loading__wrapper">
                    <CircularProgress />
                  </div>
                )}
                <Table
                  className={`table table--transactions ${
                    loading ? 'loading' : ''
                  }`}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Transaction Hash</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {loading &&
                      !transactions.length && (
                        <TableRow className="table__row--loading">
                          <TableCell className="cell" />
                          <TableCell />
                        </TableRow>
                      )}
                    {transactions.map(transaction => (
                      <TableRow key={transaction.hash}>
                        <TableCell>
                          <Link to={`/transactions/${transaction.hash}`}>
                            {transaction.hash}
                          </Link>
                        </TableCell>
                        <TableCell>{transaction.value} Wei</TableCell>
                      </TableRow>
                    ))}
                    {!transactions.length &&
                      !loading && (
                        <TableRow>
                          <TableCell>No transaction details found</TableCell>
                        </TableRow>
                      )}
                  </TableBody>
                </Table>
              </Paper>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
