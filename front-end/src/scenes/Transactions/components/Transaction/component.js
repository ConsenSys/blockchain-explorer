import React, { Component, Fragment } from 'react';
import { shape, bool, string, func } from 'prop-types';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  paper: { marginTop: '1.5em', minHeight: '200px', position: 'relative' },
  transactionContents: {
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

class Transaction extends Component {
  static propTypes = {
    transaction: shape({}),
    match: shape({
      isExact: bool.isRequired,
      params: shape({
        transactionId: string.isRequired,
      }).isRequired,
    }).isRequired,
    fetchTransaction: func.isRequired,
    loading: bool,
    classes: shape({}).isRequired,
  };

  static defaultProps = {
    transaction: null,
    loading: false,
  };

  componentDidMount() {
    this.props.fetchTransaction({ id: this.props.match.params.transactionId });
  }

  render() {
    const { transaction, match, classes, loading } = this.props;
    return (
      <Fragment>
        {match.isExact && (
          <div className="transaction__contents__wrapper">
            <Typography variant="h6">Transaction</Typography>
            <div>
              <Paper className={classes.paper}>
                {loading &&
                  !transaction && (
                    <div className="loading__wrapper">
                      <CircularProgress />
                    </div>
                  )}
                {transaction && (
                  <div className={classes.transactionContents}>
                    <Typography component="h3" className={classes.field}>
                      Transaction Hash: <strong>{transaction.hash}</strong>
                    </Typography>
                    <div className={classes.field}>
                      <Chip
                        label={`Value: ${transaction.value} Wei`}
                        className={classes.chip}
                        color="primary"
                        variant="outlined"
                      />
                    </div>
                    <Typography component="h3" className={classes.field}>
                      Value:
                      <strong>{` ${transaction.value} Wei`}</strong>
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      From: {transaction.sender}
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      To: {transaction.to}
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Gas: {transaction.gas}
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Gas Price: {transaction.gasPrice} Wei
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Nonce: <strong>{transaction.nonce}</strong>
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Included in Block:
                      <strong>{transaction.blockNumber}</strong>
                    </Typography>
                    <Typography component="h3" className={classes.field}>
                      Data: <strong>{transaction.input}</strong>
                    </Typography>
                  </div>
                )}

                {!loading &&
                  !transaction && (
                    <div className={classes.transactionContents}>
                      <Typography
                        variant="body2"
                        component="h6"
                        className={classes.field}
                      >
                        <strong>No Transaction details found</strong>
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

export default withStyles(styles)(Transaction);
