import {
  connectHits,
  Pagination,
  InstantSearch,
  SearchBox,
  SortBy,
  HitsPerPage,
  Configure
} from 'react-instantsearch-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import './App.mobile.css';
import './Search.css';
import './Themes.css';
import { Link } from 'react-router-dom';
import { useForm } from '@fuse/hooks';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import DateFnsUtils from '@date-io/date-fns';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import Paper from '@material-ui/core/Paper';
import React from 'react';
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

const Hits = ({ hits }) => {
  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  return (
    <Table stickyHeader aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell>FIRST NAME</StyledTableCell>
          <StyledTableCell>LAST NAME</StyledTableCell>
          <StyledTableCell>D.O.B</StyledTableCell>
          <StyledTableCell>LAST EXAM</StyledTableCell>
          <StyledTableCell>GENDER</StyledTableCell>
          <StyledTableCell>STATE</StyledTableCell>
          <StyledTableCell>ZIP CODE</StyledTableCell>
          <StyledTableCell>PHONE</StyledTableCell>
          <StyledTableCell>EMAIL</StyledTableCell>
          <StyledTableCell>OPTIONS</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits.map((hit) => (
          <StyledTableRow key={hit.objectID} hover>
            <StyledTableCell component="th" scope="row">
              {'\xa0\xa0\xa0'} {hit.customerId}
            </StyledTableCell>
            <StyledTableCell>{hit.firstName}</StyledTableCell>
            <StyledTableCell>{hit.lastName}</StyledTableCell>
            <StyledTableCell>
              {moment(hit.dob).format('MM/DD/YYYY')}
            </StyledTableCell>
            <StyledTableCell>
              {hit.lastExam
                ? moment(hit?.lastExam).format('MM/DD/YYYY')
                : 'No Exam'}
            </StyledTableCell>
            <StyledTableCell>{hit.gender}</StyledTableCell>
            <StyledTableCell>{hit.state}</StyledTableCell>
            <StyledTableCell>{hit.zipCode}</StyledTableCell>
            <StyledTableCell>{formatPhoneNumber(hit.phone1)}</StyledTableCell>
            <StyledTableCell>{hit.email}</StyledTableCell>
            <StyledTableCell>
              <Link
                to={`/apps/e-commerce/customers/profile/${hit.customerId}`}
                className="btn btn-primary">
                <IconButton aria-label="view">
                  <PageviewOutlinedIcon fontSize="small" />
                </IconButton>
              </Link>
              <Link
                to={`/apps/e-commerce/customers/${hit.customerId}`}
                className="btn btn-primary">
                <IconButton aria-label="edit">
                  <EditIcon fontSize="small" />
                </IconButton>
              </Link>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
};
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
    },
    '&:hover': {
      backgroundColor: 'lightyellow !important'
    }
  }
}))(TableRow);

const CustomersContent = () => {
  const { form, handleChange, setForm } = useForm(null);

  return (
    <div className="flex w-full ">
      <TableContainer
        stickyHeader
        component={Paper}
        className="flex flex-col w-full py-20">
        <InstantSearch
          searchClient={searchClient}
          indexName="customers"
          refresh>
          <div className="flex flex-row">
            <div className="flex flex-col flex-1  px-12">
              <Configure
                filters={`dob: ${
                  form?.start ? form?.start.getTime() : -2208988800000
                } TO ${form?.end ? form?.end.getTime() : new Date().getTime()}`}
              />
              <div className="flex flex-row justify-around">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justifyContent="start">
                    <KeyboardDatePicker
                      label="Start Date"
                      className="ml-24"
                      margin="normal"
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      value={form?.start}
                      onChange={(date) => {
                        handleChange({
                          target: { name: 'start', value: date }
                        });
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justifyContent="start">
                    <KeyboardDatePicker
                      label="End Date"
                      className="ml-24"
                      margin="normal"
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      value={form?.end}
                      onChange={(date) => {
                        handleChange({ target: { name: 'end', value: date } });
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="flex flex-col flex-1 mt-5 mb-10 border-1">
              <SearchBox
                translations={{
                  placeholder: 'Searh for customers...'
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
            <div className="flex flex-col flex-1 pl-24">
              <h5>Sort By:</h5>
              <SortBy
                className="w-full"
                defaultRefinement="customers"
                items={[
                  { value: 'customers', label: 'Recently Updated' },
                  { value: 'customersFirstName', label: 'First Name (Asc)' },
                  {
                    value: 'customersFirstNameDesc',
                    label: 'First Name (Desc)'
                  },
                  { value: 'customersLastName', label: 'Last Name (Asc)' },
                  { value: 'customersLastNameDesc', label: 'Last Name (Desc)' },
                  { value: 'customersDOB', label: 'Date of Birth (Asc)' },
                  { value: 'customersDOBDesc', label: 'Date of Birth (Desc)' },
                  { value: 'customersLastExam', label: 'Last Exam (Asc)' },
                  { value: 'customersLastExamDesc', label: 'Last Exam (Desc)' }
                ]}
              />
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

export default withRouter(CustomersContent);
