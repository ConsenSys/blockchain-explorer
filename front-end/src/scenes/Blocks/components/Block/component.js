import React, { Component, Fragment } from 'react';
import { shape, bool, string, func } from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

// import TransactionTable from '@Scenes/Overview/components/TransactionTable';

const styles = theme => ({
  paper: { marginTop: '1.5em', minHeight: '200px', position: 'relative' },
  blockContents: {
    padding: '36px',
  },
  field: {
    marginTop: '8px',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

class Block extends Component {
  static propTypes = {
    block: shape({}),
    match: shape({
      isExact: bool.isRequired,
      params: shape({
        blockId: string.isRequired,
      }).isRequired,
    }).isRequired,
    fetchBlock: func.isRequired,
    loading: bool,
    classes: shape({}).isRequired,
  };

  static defaultProps = {
    block: null,
    loading: false,
  };

  componentDidMount() {
    this.props.fetchBlock({ id: this.props.match.params.blockId });
  }

  render() {
    const { block, match, classes, loading } = this.props;
    return (
      <Fragment>
        {match.isExact && (
          <div className="block__contents__wrapper">
            <Typography variant="h6">Block</Typography>
            <div>
              <Paper className={classes.paper}>
                {loading &&
                  !block && (
                    <div className="loading__wrapper">
                      <CircularProgress />
                    </div>
                  )}
                {block && (
                  <div className={classes.blockContents}>
                    <Typography component="h3" className={classes.field}>
                      Block Hash: <strong>{block.hash}</strong>
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Gas:
                      <strong>{` ${block.gasUsed / 1e18} Ether`}</strong>
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Time:{' '}
                      <strong>
                        {moment.unix(block.timestamp).format('LLLL')}
                      </strong>
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Height: {block.number}
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Mined By: {block.miner}
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Gas Limit: <strong>{block.gasLimit}</strong>
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Difficulty: <strong>{block.difficulty}</strong>
                    </Typography>
                    <Typography variant="h6" className="transactions__title">
                      Transactions
                    </Typography>
                    <div className="transactions__table">
                      <Table className={classes.table}>
                        <TableHead>
                          <TableRow>
                            <TableCell>Hash</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {block.transactions.map(transaction => (
                            <TableRow key={transaction}>
                              <TableCell component="th" scope="row">
                                <Link to={`/transactions/${transaction}`}>
                                  {transaction}
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {!loading &&
                  !block && (
                    <div className={classes.blockContents}>
                      <Typography
                        variant="body2"
                        component="h6"
                        className={classes.field}
                      >
                        <strong>No Block details found</strong>
                      </Typography>
                    </div>
                  )}
              </Paper>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(Block);
