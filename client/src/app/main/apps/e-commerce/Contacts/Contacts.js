import { IconButton } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';
import clsx from 'clsx';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LoadingDialog from '../ReusableComponents/LoadingDialog';
import React, { useState } from 'react';
import reducer from '../store/reducers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import {
  connectHits,
  Pagination,
  InstantSearch,
  SearchBox,
  HitsPerPage,
  connectStateResults
} from 'react-instantsearch-dom';

const useStyles = makeStyles((theme) => ({
  header: {
    minHeight: 160,
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
}));

const CustomHits = connectHits(({ hits, props, setSortCriteria, sortCriteria }) => {

  const setSortOrder = (columnName, currentSort) => {
    const ascendingSortKey = `contacts${columnName}Asc`;
    const descendingSortKey = `contacts${columnName}Desc`;

    // If the current sort is ascending, switch to descending
    if (currentSort === ascendingSortKey) {
      setSortCriteria(descendingSortKey)
      return true;
    }

    // If the current sort is descending or not set, switch to ascending
    setSortCriteria(ascendingSortKey)
    return true;
  }

  return (
    <Table stickyHeader aria-label="customized table">
      <TableHead>
        <TableRow className='truncate cursor-pointer'>
          <StyledTableCell onClick={() => setSortOrder('Style', sortCriteria)}>STYLE {sortCriteria === 'contactsStyleAsc' && <ExpandMoreIcon />}
            {sortCriteria === 'contactsStyleDesc' && <ExpandLessIcon />}</StyledTableCell>
          <StyledTableCell onClick={() => setSortOrder('Brand', sortCriteria)}>BRAND {sortCriteria === 'contactsBrandAsc' && <ExpandMoreIcon />}
            {sortCriteria === 'contactsBrandDesc' && <ExpandLessIcon />}</StyledTableCell>
          <StyledTableCell onClick={() => setSortOrder('Model', sortCriteria)}>MODEL {sortCriteria === 'contactsModelAsc' && <ExpandMoreIcon />}
            {sortCriteria === 'contactsModelDesc' && <ExpandLessIcon />}</StyledTableCell>
          <StyledTableCell>BASE CURVE</StyledTableCell>
          <StyledTableCell>PACK Qty</StyledTableCell>
          <StyledTableCell>PRICE</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits.map((hit) => (
          <StyledTableRow
            key={hit.objectID}
            hover
            className="cursor-pointer"
            onClick={() => { props.history.push(`/apps/e-commerce/contact/${hit.contactId}`); }}>
            <StyledTableCell>{hit.style}</StyledTableCell>
            <StyledTableCell>{hit.brand}</StyledTableCell>
            <StyledTableCell>{hit.model}</StyledTableCell>
            <StyledTableCell>{hit.basecurve}</StyledTableCell>
            <StyledTableCell>{hit.packquantity}</StyledTableCell>
            <StyledTableCell>{hit.price}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 10,
    textAlign: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:hover': {
      backgroundColor: 'lightyellow !important'
    }
  }
}))(TableRow);

function Contacts(props) {
  const classes = useStyles(props);
  const [sortCriteria, setSortCriteria] = useState('contactsStyleAsc')
  const [searchClient, setsearchClient] = useState(algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY))

  const ResultStats = connectStateResults(
    ({ searching }) =>
      searching ? (<LoadingDialog />) : (<div></div>)
  );

  return (
    <div className="flex w-full overflow-hidden">
      <InstantSearch
        searchClient={searchClient}
        indexName={sortCriteria}
        refresh>
        <div className="flex flex-col w-full">
          <div className={clsx(classes.header)}>
            <div className="flex flex-row p-4 w-full justify-center items-center">
              <Typography
                className="hidden sm:flex mx-0 sm:mx-12 uppercase"
                style={{ fontSize: '3rem', fontWeight: 600 }}
                variant="h6">
                CONTACT LENS
              </Typography>
              <IconButton color='secondary' onClick={() => {
                setsearchClient(algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY))
              }}>
                <CachedIcon />
              </IconButton>
            </div>
            <div className="flex pt-32 pb-16 pl-8 items-center">
              <div className="flex flex-col w-1/3 mt-0 px-12"></div>
              <div className="flex flex-col w-1/3 border-1 headerSearch">
                <SearchBox
                  translations={{
                    placeholder: 'Search for contacts...'
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
              <div className="flex flex-row w-1/3 justify-around items-center">
                <div className="flex flex-col w-1/3 ">
                  <div className="flex flex-1 justify-center">
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
                <div>
                  <Button
                    className={classes.button}
                    onClick={() => { props.history.push('/apps/e-commerce/contact/new') }}
                    variant="contained"
                    color="secondary">
                    <span className="hidden sm:flex">ADD NEW</span>
                    <span className="flex sm:hidden">ADD</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ResultStats />
          <TableContainer
            stickyHeader
            className="flex flex-col w-full overflow-scroll">
            <CustomHits props={props} setSortCriteria={setSortCriteria} sortCriteria={sortCriteria} />
          </TableContainer>
          <div className="flex flex-row justify-center">
            <div className="flex flex-1"></div>
            <div className="flex flex-1 justify-center mt-8"><Pagination showLast={true} /></div>
            <div className="flex flex-1"></div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default withReducer('eCommerceApp', reducer)(Contacts);
