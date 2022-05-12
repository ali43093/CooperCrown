import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Pagination,
  HitsPerPage
} from 'react-instantsearch-dom';
import { connectHits } from 'react-instantsearch-dom';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import SearchDialouge from './SearchDialouge';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { withRouter } from 'react-router';
import '../Customers/Search.css';
import '../Customers/Themes.css';
import '../Customers/App.mobile.css';
import CustomRangeSlider from './RangeSlider';

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);

const Hits = ({ hits }) => (
  <Table aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Order ID</StyledTableCell>
        <StyledTableCell>Date</StyledTableCell>
        <StyledTableCell>First Name</StyledTableCell>
        <StyledTableCell>Last Name</StyledTableCell>
        <StyledTableCell>Customer ID</StyledTableCell>
        <StyledTableCell>Type</StyledTableCell>
        <StyledTableCell>Location</StyledTableCell>
        <StyledTableCell>Status</StyledTableCell>
        <StyledTableCell>Options</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {hits
        .sort((a, b) => (a.orderId > b.orderId ? -1 : 1))
        .map((hit) => (
          <StyledTableRow key={hit.objectID} hover>
            <StyledTableCell component="th" scope="row">
              {hit?.rushOrder ? (
                <LabelImportantIcon color="secondary" />
              ) : (
                '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
              )}{' '}
              {`${moment(hit?.orderDate).format('YYMMDD')}${hit?.orderId}`}
            </StyledTableCell>
            <StyledTableCell>
              {moment(hit?.orderDate).format('MM/DD/YYYY')}
            </StyledTableCell>
            <StyledTableCell>{hit?.firstName}</StyledTableCell>
            <StyledTableCell>{hit?.lastName}</StyledTableCell>
            <StyledTableCell>
              <Link to={`/apps/e-commerce/customers/profile/${hit.customerId}`}>
                <h3 className="text-black">{hit?.customerId}</h3>
              </Link>
            </StyledTableCell>
            <StyledTableCell>
              {hit?.prescriptionType === 'eyeglassesRx' && 'Eyeglasses'}
              {hit?.prescriptionType === 'contactLensRx' && 'Contact Lens'}
              {hit?.prescriptionType === 'medicationRx' && 'Medication'}
            </StyledTableCell>
            <StyledTableCell>{hit?.locationName}</StyledTableCell>
            <StyledTableCell>{hit?.orderStatus}</StyledTableCell>

            <StyledTableCell>
              <Link
                to={`/apps/e-commerce/orders/vieworder/${hit.orderId}`}
                className="btn btn-primary">
                <IconButton aria-label="view">
                  <PageviewOutlinedIcon fontSize="small" />
                </IconButton>
              </Link>
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </TableBody>
  </Table>
);
const CustomHits = connectHits(Hits);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'left'
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

const OrdersContent = (props) => {
  return (
    <div className="flex w-full ">
      <TableContainer className="flex flex-col w-full py-20">
        <InstantSearch searchClient={searchClient} indexName="orders">
          <div className="flex flex-row">
            <div className="flex flex-col flex-1  px-12">
              <h4 className="pl-16">Date Range Filter</h4>
              <CustomRangeSlider attribute="orderDate" />
            </div>

            <div className="flex flex-col flex-1 mb-10 border-1 rounded-12">
              <SearchBox
                translations={{
                  placeholder: 'Search for orders...'
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
              />
            </div>
            <div className="flex flex-row flex-1 justify-center">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <SearchDialouge />
              </FuseAnimate>
            </div>
          </div>
          <CustomHits />
          <div className="flex flex-row justify-center">
            <div className="flex flex-1"></div>
            <div className="flex flex-1 justify-center mt-8">
              <Pagination />
            </div>
            <div className="flex flex-1 justify-center mt-8">
              <HitsPerPage
                defaultRefinement={25}
                items={[
                  { value: 25, label: 'Show 25 Hits' },
                  { value: 50, label: 'Show 50 Hits' },
                  { value: 75, label: 'Show 75 Hits' },
                  { value: 100, label: 'Show 100 Hits' }
                ]}
              />
            </div>
          </div>
        </InstantSearch>
      </TableContainer>
    </div>
  );
};

export default withRouter(OrdersContent);
