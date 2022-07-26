import {
  InstantSearch,
  Panel,
  SearchBox,
  HitsPerPage,
  Pagination,
  connectRefinementList,
  ClearRefinements
} from 'react-instantsearch-dom';
import { connectHits } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { RefinementList } from 'react-instantsearch-dom';
import { withRouter } from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);
const VirtualRefinementList = connectRefinementList(() => null);

const CustomHits = connectHits(({ hits }) => {
  const classes = useStyles();

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full">
        <Table
          className={classes.table}
          stickyHeader
          aria-label="customized table">
          <TableHead>
            <TableRow style={{ height: 10 }}>
              <StyledTableCell>SKU</StyledTableCell>
              <StyledTableCell>BRAND</StyledTableCell>
              <StyledTableCell>LENS TYPE</StyledTableCell>
              <StyledTableCell>LENS COLOR</StyledTableCell>
              <StyledTableCell>SPHERE</StyledTableCell>
              <StyledTableCell>CYLINDER</StyledTableCell>
              <StyledTableCell>QTY</StyledTableCell>
              <StyledTableCell>OPTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hits
              .sort((a, b) => (a.lensId < b.lensId ? -1 : 1))
              .map((hit) => (
                <StyledTableRow
                  style={{ height: 10 }}
                  key={hit.lensId}
                  className="cursor-pointer">
                  <StyledTableCell style={{ color: 'red' }}>
                    {`\xa0\xa0\xa0 ${hit.sku}`}
                  </StyledTableCell>
                  <StyledTableCell>{hit.brand}</StyledTableCell>
                  <StyledTableCell>{hit.lensType}</StyledTableCell>
                  <StyledTableCell>{hit.colour}</StyledTableCell>
                  <StyledTableCell>{hit.sphere}</StyledTableCell>
                  <StyledTableCell>{hit.cylinder}</StyledTableCell>
                  <StyledTableCell>{hit.quantity}</StyledTableCell>
                  <StyledTableCell>
                    <Link to={`/apps/inventory/viewlens/${hit.lensId}`}>
                      <IconButton aria-label="edit">
                        <PageviewOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Link>
                    <Link to={`/apps/inventory/addlens/${hit.lensId}`}>
                      <IconButton aria-label="edit">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    padding: 0
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 900
  },
  orangeButton: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  transparentButton: {
    backgroundColor: '#fff',
    color: '#000000',
    boxShadow: 'none',
    fontSize: '20px',
    '&:hover': {
      backgroundColor: '#F5F5F5',
      color: '#000000'
    }
  }
});

const Lens = (props) => {
  const classes = useStyles();
  const [openFiltersDialog, setOpenFiltersDialog] = useState(false);
  const [searchState, setSearchState] = useState({});
  const handleCloseFiltersDialog = () => {
    setOpenFiltersDialog(false);
  };

  return (
    <div className="flex flex-col w-full ">
      <InstantSearch
        searchClient={searchClient}
        indexName="lens"
        onSearchStateChange={(state) => {
          if (
            openFiltersDialog &&
            (state.refinementList?.brand ||
              state.refinementList?.colour ||
              state.refinementList?.lensType)
          ) {
            setSearchState(state.refinementList);
          }
        }}>
        <TableContainer className="flex flex-col w-full ">
          <div className="flex flex-row">
            <div className="flex flex-row flex-1 justify-around mt-10">
              <Button
                className={classes.transparentButton}
                style={{ minHeight: '50px', maxHeight: '50px' }}
                variant="contained"
                onClick={() => {
                  setOpenFiltersDialog(true);
                }}>
                <div className="h-16 w-16 mr-4">
                  <img
                    src="https://img.icons8.com/ios/50/000000/empty-filter.png"
                    alt=""
                  />
                </div>
                FILTERS
              </Button>
              <Button
                className={classes.transparentButton}
                style={{ minHeight: '50px', maxHeight: '50px' }}
                variant="contained"
                onClick={() => {
                  setSearchState({});
                }}>
                <div className="h-16 w-16 mr-4">
                  <img
                    src="https://img.icons8.com/ios/50/000000/clear-filters.png"
                    alt=""
                  />
                </div>
                CLEAR
              </Button>
              <VirtualRefinementList
                defaultRefinement={searchState?.brand}
                attribute="brand"
              />
              <VirtualRefinementList
                defaultRefinement={searchState?.colour}
                attribute="colour"
              />
              <VirtualRefinementList
                defaultRefinement={searchState?.lensType}
                attribute="lensType"
              />
            </div>
            <div className="flex flex-col flex-1 my-10 inventorySearch">
              <SearchBox
                translations={{
                  placeholder: 'Searh for lens...'
                }}
                submit={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 18 18">
                    <g
                      fill="none"
                      fillRule="evenodd"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.67"
                      transform="translate(1 1)">
                      <circle cx="7.11" cy="7.11" r="7.11" />
                      <path d="M16 16l-3.87-3.87" />
                    </g>
                  </svg>
                }
                reset={false}
              />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex w-full justify-center mt-16">
                <Button
                  className={classes.orangeButton}
                  variant="contained"
                  onClick={() => {
                    props.history.push('/apps/inventory/addlens');
                  }}>
                  <Icon>add</Icon>
                  ADD NEW
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <Dialog
                fullWidth
                maxWidth="lg"
                open={openFiltersDialog}
                onClose={handleCloseFiltersDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  <h2>Select Filters!</h2>
                </DialogTitle>
                <DialogContent>
                  <div className="flex flex-row justify-between refinementList">
                    <div className="p-6">
                      <Panel header="Brands">
                        <RefinementList
                          attribute="brand"
                          limit={10}
                          showMore={true}
                          searchable={true}
                          translations={{
                            placeholder: 'Search for brands…'
                          }}
                        />
                      </Panel>
                    </div>
                    <div className="p-6">
                      <Panel header="Color">
                        <RefinementList
                          attribute="colour"
                          limit={10}
                          showMore={true}
                          searchable={true}
                          translations={{
                            placeholder: 'Search for colours…'
                          }}
                        />
                      </Panel>
                    </div>
                    <div className="p-6">
                      <Panel header="Lens Type">
                        <RefinementList
                          attribute="lensType"
                          limit={10}
                          showMore={true}
                          searchable={true}
                          translations={{
                            placeholder: 'Search for lens type…'
                          }}
                        />
                      </Panel>
                    </div>
                  </div>
                  <div className="flex flex-row p-12 justify-center">
                    <ClearRefinements
                      translations={{
                        reset: 'CLEAR ALL'
                      }}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <CustomHits props={props} />
          <div className="flex flex-row justify-center">
            <div className="flex flex-1"></div>
            <div className="flex flex-1 justify-center pt-8">
              <Pagination showLast={true} />
            </div>
            <div className="flex flex-1 justify-center pt-8">
              <HitsPerPage
                defaultRefinement={50}
                items={[
                  { value: 50, label: 'Show 50' },
                  { value: 100, label: 'Show 100' },
                  { value: 200, label: 'Show 200' }
                ]}
              />
            </div>
          </div>
        </TableContainer>
      </InstantSearch>
    </div>
  );
};

export default withRouter(Lens);
