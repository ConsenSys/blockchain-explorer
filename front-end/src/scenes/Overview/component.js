import React, { Component, Fragment } from 'react';
import { shape, string, array, func } from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/ClearOutlined';
import BlocksTable from './components/BlocksTable';
import TransactionTable from './components/TransactionTable';

const styles = theme => ({
  pageWrapper: {
    maxWidth: '1448px',
    margin: '0 auto',
  },
  root: {
    flexGrow: 1,
  },
  tables: {
    paddingRight: '90px !important',
  },
  transactionTable: {
    marginTop: '36px',
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: '#f5f5f5',
  },
  aboutText: {
    fontSize: '12px',
    textAlign: 'left',
    wordSpacing: '3px',
    fontWeight: '300',
    fontFamily: 'Roboto',
    padding: '8px',
    color: '#5d5d5d',
  },
  resultsText: {
    display: 'inline-block',
  },
  clearWrapper: {
    display: 'inline-block',
    float: 'right',
  },
  hr: {
    margin: '24px 16px 8px',
    backgroundColor: 'lightgrey',
    height: '1px',
    border: '0',
  },
  poweredBy: {
    textAlign: 'center',
    fontsize: '13px',
  },
  powerLogos: {
    position: 'relative',
    minHeight: '36px',
    height: 'auto',
    padding: '8px 8px 0',
    textAlign: 'center',
  },
  logos: {
    width: 'auto',
    height: '36px',
  },
});
class Overview extends Component {
  static propTypes = {
    classes: shape({}).isRequired,
    fetchTransactions: func.isRequired,
    fetchBlocks: func.isRequired,
    searchText: string,
    searchResults: shape({
      blocks: array,
      transactions: array,
    }),
    onSearch: func.isRequired,
  };

  static defaultProps = {
    searchText: '',
    searchResults: {},
  };

  state = {};

  componentDidMount() {
    const params = {
      getNotified: false,
    };
    this.props.fetchTransactions(params);
    this.props.fetchBlocks(params);
  }

  renderSearchResults = () => {
    const { searchResults } = this.props;
    const { blocks = [], transactions = [] } = searchResults;
    if (!blocks.length && !transactions.length) {
      return (
        <div className="empty_search_results">
          <img
            className="warning__icon"
            src="/static/img/error_outline.png"
            alt="no-results"
          />
          <div className="empty__text">
            We could not find any matching <strong>Blocks</strong> or{' '}
            <strong>Transactions</strong>
          </div>
        </div>
      );
    }

    return (
      <div className="empty_search_results">
        {blocks.length ? (
          <Fragment>
            <Typography variant="h6">Blocks</Typography>
            <BlocksTable />
          </Fragment>
        ) : null}
        {transactions.length ? (
          <Fragment>
            <Typography variant="h6">Transactions</Typography>
            <TransactionTable />
          </Fragment>
        ) : null}
      </div>
    );
  };

  onSearchClear = () => this.props.onSearch({ searchText: '' });

  render() {
    const { classes, searchText } = this.props;
    const isSearching = !!searchText;

    return (
      <div
        className={classnames(
          'overview__contents__wrapper',
          classes.pageWrapper,
        )}
      >
        <p />
        <Grid container spacing={24}>
          <Grid item xs={12} sm={8} className={classes.tables}>
            <Fragment>
              <Typography variant="h6">Node info</Typography>
              <br />
              <Typography variant="body1">
                <strong>EnodeURL:</strong>
              </Typography>
              <Typography variant="body2">
                <span id="enodeurl" style={{ wordBreak: 'break-word' }}>
                  enode://a979fb575495b8d6db44f750317d0f4622bf4c2aa3365d6af7c284339968eef29b69ad0dce72a4d8db5ebb4968de0e3bec910127f134779fbcb0cb6d3331163c@52.16.188.185:30303
                </span>
              </Typography>
              <Typography variant="body1">
                <strong>JSON RPC Endpoint:</strong>
              </Typography>
              <Typography variant="body2">
                <span id="jsonrpc" />
              </Typography>
              <br />
              <br />
            </Fragment>
            {!isSearching && (
              <Fragment>
                <Typography variant="h6">Latest Blocks</Typography>
                <BlocksTable />
              </Fragment>
            )}

            {isSearching && (
              <Fragment>
                <div className={classes.resultsText}>
                  <Typography variant="h5">
                    Search Results for <strong>{searchText}</strong>
                  </Typography>
                </div>
                <div className={classes.clearWrapper}>
                  <Button
                    variant="outlined"
                    className={classes.clearButton}
                    onClick={this.onSearchClear}
                  >
                    Clear Search
                    <ClearIcon />
                  </Button>
                </div>
                {this.renderSearchResults()}
              </Fragment>
            )}
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Typography variant="h6">About</Typography>
              <Typography variant="body2" className={classes.aboutText}>
                This is an open-source blockchain explorer with complete REST
                and websocket APIs that can be used for writing web wallets and
                other apps that need more advanced blockchain queries. Check out
                the source code.
                <br />
                <br />
                It is still in development, so be sure to report any bugs and
                provide feedback for improvement at our github issue tracker.
              </Typography>
              <hr className={classes.hr} />
              <div className={classes.poweredBy}>Powered by</div>
              <div className={classes.powerLogos}>
                <img
                  className={classes.logos}
                  src="/static/img/consensys_logo_text.png"
                  alt="logo"
                />
              </div>
            </Paper>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            className={classnames(classes.tables, classes.transactionTable)}
          >
            {!isSearching && (
              <Fragment>
                <Typography variant="h6">Latest Transactions</Typography>
                <TransactionTable />
              </Fragment>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Overview);
