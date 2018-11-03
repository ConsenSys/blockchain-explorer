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
import Block from './components/Block';

export default class Blocks extends Component {
  static propTypes = {
    blocks: arrayOf(shape({})),
    loading: bool,
    fetchBlocks: func.isRequired,
    match: shape({
      isExact: bool.isRequired,
      params: shape({
        networkId: string,
      }).isRequired,
    }).isRequired,
  };

  static defaultProps = {
    blocks: [],
    loading: false,
  };

  componentDidMount() {
    const params = {
      getNotified: false,
    };
    this.props.fetchBlocks(params);
  }

  render() {
    const { blocks, loading, match } = this.props;

    return (
      <Fragment>
        <Switch>
          <Route path={`${match.path}/:blockId`} component={Block} />
        </Switch>

        {match.isExact && (
          <div className="blocks__page__wrapper">
            <Typography variant="h5">Blocks</Typography>
            <p />
            <div>
              <Paper
                style={{ marginTop: '1.5em' }}
                className="blocks__contents__wrapper"
              >
                {loading && (
                  <div className="loading__wrapper">
                    <CircularProgress />
                  </div>
                )}
                <Table
                  className={`table table--blocks ${loading ? 'loading' : ''}`}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Block Number</TableCell>
                      <TableCell className="hash__cell">Hash</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Number of Transactions</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {loading &&
                      !blocks.length && (
                        <TableRow className="table__row--loading">
                          <TableCell className="cell" />
                          <TableCell />
                        </TableRow>
                      )}
                    {blocks.map((block, index) => (
                      <TableRow key={block.hash}>
                        <TableCell>{block.number}</TableCell>
                        <TableCell className="hash__cell">
                          <Link to={`/blocks/${block.hash}`}>{block.hash}</Link>
                        </TableCell>
                        <TableCell>
                          {moment
                            .unix(block.timestamp)
                            .format('MMM DD hh:mm:ss')}
                        </TableCell>
                        <TableCell>{block.transactions.length}</TableCell>
                      </TableRow>
                    ))}
                    {!blocks.length &&
                      !loading && (
                        <TableRow>
                          <TableCell>No block details found</TableCell>
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
