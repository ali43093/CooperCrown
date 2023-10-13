import '../Customers/App.mobile.css';
import '../Customers/Search.css';
import '../Customers/Themes.css';
import { algoliaDefaultRanking } from '../ReusableComponents/HelperFunctions';
import { connectHits } from 'react-instantsearch-dom';
import { firestore } from 'firebase';
import { IconButton } from '@material-ui/core';
import { InstantSearch, SearchBox, Pagination, HitsPerPage, Configure, connectStateResults } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import algoliasearch from 'algoliasearch';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';
import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FuseAnimate from '@fuse/core/FuseAnimate';
import GetAppIcon from '@material-ui/icons/GetApp';
import LoadingDialog from '../ReusableComponents/LoadingDialog';
import moment from 'moment';
import MultipleOrderTickets from './MultipleOrderTickets';
import React, { useState } from 'react';
import reducer from '../store/reducers';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';


const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    padding: '10px',
    alignItems: 'center',
    gap: '1rem',
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
  },
  tabHeader: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark,
    padding: '10px 0'
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


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const statuses = [
  { value: 0, label: 'all' },
  { value: 1, label: 'draft' },
  { value: 2, label: 'lab ready' },
  { value: 3, label: 'in progress' },
  { value: 4, label: 'hold' },
  { value: 5, label: 'to showroom' },
  { value: 6, label: 'pick up ready' },
  { value: 7, label: 'completed' },
  { value: 8, label: 'cancelled' }
];

const CustomHits = connectHits(
  ({
    hits,
    props,
    value,
    selected,
    setSelected,
    setSelectAllData,
    userData,
    history,
    setSearchClient,
    setisLoading
  }) => {
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const [balances, setBalances] = useState({})
    const [currentSort, setCurrentSort] = useState(null)

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = hits.map((n) => n.orderId);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const changeSort = async (columnName, currentSort) => {

      let attributeToSet = currentSort === `asc(${columnName})` ? `desc(${columnName})` : `asc(${columnName})`

      try {
        setisLoading(true)
        const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_UPDATE_SETTINGS_KEY)
        const index = client.initIndex('orders')

        index.setSettings({ ranking: [attributeToSet, ...algoliaDefaultRanking] }).then(() => {
          setCurrentSort(attributeToSet);

          setTimeout(() => {
            setSearchClient(algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY))
            setisLoading(false)
          }, 1000);
        }).catch((err) => {
          console.error('Error updating index settings:', err);
          setisLoading(false);
        })

      } catch (error) {
        console.error('Error updating index settings:', error);
      }
    }

    const handleTotal = (row) => {
      const mainSum =
        row?.eyeglasses.reduce((a, b) => b?.lensRate ? +a + +b.lensRate : a, 0) +
        row?.eyeglasses.reduce((a, b) => b?.frameRate ? +a + +b.frameRate : a, 0) +
        row?.medication.reduce((a, b) => +a + +b.price, 0) +
        row?.contactLenses.reduce((a, b) => +a + +b.contactLensRate, 0) +
        row?.otherProductInfo.reduce((a, b) => +a + +b.otherProductPrice, 0);

      const frameVal = row?.eyeglasses.find(
        (item) => item?.frameAdditionalPrice || item?.frameAdditionalPrice <= 0
      );
      const lensVal = row?.eyeglasses.find(
        (item) => item?.lensAdditionalPrice || item?.lensAdditionalPrice <= 0
      );

      const otherProductVal = row?.otherProductInfo.find(
        (item) =>
          item?.otherProductAdditionalPrice ||
          item?.otherProductAdditionalPrice <= 0
      );

      if (frameVal || lensVal || otherProductVal) {
        return (
          mainSum +
          row?.eyeglasses.reduce((a, b) => b?.frameAdditionalPrice ? +a + +b.frameAdditionalPrice : a, 0) +
          row?.eyeglasses.reduce((a, b) => b?.lensAdditionalPrice ? +a + +b.lensAdditionalPrice : a, 0) +
          row?.otherProductInfo.reduce(
            (a, b) => b?.otherProductAdditionalPrice ? +a + +b.otherProductAdditionalPrice : a,
            0
          )
        );
      } else {
        return mainSum;
      }
    };

    const checkBalance = async (row) => {
      const total = handleTotal(row);

      const deductions =
        (row?.discount ? +row?.discount : 0) +
        (row?.insuranceCostOne ? +row?.insuranceCostOne : 0) +
        (row?.insuranceCostTwo ? +row?.insuranceCostTwo : 0);

      const queryPayments = await firestore()
        .collection('orderPayments')
        .where('orderId', '==', Number(row.orderId))
        .get();
      let resultPayments = [];
      queryPayments.forEach((doc) => {
        resultPayments.push(doc.data());
      });
      const payment = resultPayments.reduce((a, b) => +a + +b.amount, 0);

      const balance = total - deductions - payment;

      setBalances({ ...balances, [row?.objectID]: balance })
      return true
    };

    const handleClick = (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    };

    React.useEffect(() => {
      if (value !== 0) {
        setSelectAllData(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow className='truncate cursor-pointer'>
            <StyledTableCell> </StyledTableCell>
            {value !== 0 && (
              <StyledTableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < hits.length
                  }
                  checked={hits.length > 0 && selected.length === hits.length}
                  onChange={handleSelectAllClick}
                  style={{ color: '#fff' }}
                />
              </StyledTableCell>
            )}
            <StyledTableCell onClick={() => changeSort('orderId', currentSort)}>ORDER No. {currentSort === 'asc(orderId)' && <ExpandMoreIcon />}
              {currentSort === 'desc(orderId)' && <ExpandLessIcon />}</StyledTableCell>
            <StyledTableCell>DATE</StyledTableCell>
            <StyledTableCell onClick={() => changeSort('firstName', currentSort)}>FIRST NAME {currentSort === 'asc(firstName)' && <ExpandMoreIcon />}
              {currentSort === 'desc(firstName)' && <ExpandLessIcon />}</StyledTableCell>
            <StyledTableCell onClick={() => changeSort('lastName', currentSort)}>LAST NAME {currentSort === 'asc(lastName)' && <ExpandMoreIcon />}
              {currentSort === 'desc(lastName)' && <ExpandLessIcon />}</StyledTableCell>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell onClick={() => changeSort('locationName', currentSort)}>LOCATION {currentSort === 'asc(locationName)' && <ExpandMoreIcon />}
              {currentSort === 'desc(locationName)' && <ExpandLessIcon />}</StyledTableCell>
            <StyledTableCell>BALANCE</StyledTableCell>
            <StyledTableCell onClick={() => changeSort('orderStatus', currentSort)}>STATUS {currentSort === 'asc(orderStatus)' && <ExpandMoreIcon />}
              {currentSort === 'desc(orderStatus)' && <ExpandLessIcon />}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hits
            .map((hit) => {
              const isItemSelected = isSelected(hit.orderId);
              return (
                <StyledTableRow
                  key={hit.objectID}
                  hover
                  className="cursor-pointer truncate"
                  onClick={(event) => handleClick(event, hit.orderId)}>
                  <StyledTableCell
                    className='p-0 m-0'
                    scope="row"
                    style={{ maxWidth: 'max-content' }}>
                    <div className="flex flex-row justify-center">
                      {(hit?.shipFrameToCustomerLogic ||
                        hit?.shipContactLensToCustomerLogic ||
                        hit?.shipOtherProductToCustomerLogic) && (
                          <div style={{ width: '20px', height: '20px' }}>
                            <ArrowForwardIosIcon
                              color="secondary"
                              className="w-full h-full"
                              style={{ color: 'green' }}
                            />
                          </div>
                        )}
                      {(hit?.rushFrameOrder ||
                        hit?.rushContactLensOrder ||
                        hit?.rushOtherProductOrder) && (
                          <div style={{ width: '20px', height: '20px' }}>
                            <ArrowForwardIosIcon
                              color="secondary"
                              className="w-full h-full"
                              style={{ color: 'red' }}
                            />
                          </div>
                        )}
                      {hit?.eyeglasses.some((pair) => pair?.sendFrameToLab === true) && (
                        <div style={{ width: '20px', height: '20px' }}>
                          <ArrowForwardIosIcon
                            color="secondary"
                            className="w-full h-full"
                            style={{ color: 'blue' }}
                          />
                        </div>
                      )}
                    </div>
                  </StyledTableCell>
                  {value !== 0 && (
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                      // inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </StyledTableCell>
                  )}
                  <StyledTableCell
                    component="th"
                    scope="row"
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.ordersView) {
                        props.history.push(
                          `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                        );
                      } else {
                        toast.error('You are not authorized', {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          transition: Zoom
                        });
                      }
                    }}>
                    {hit?.redoOrder ? `${hit?.customOrderId} R${hit?.redo}` : hit?.customOrderId}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.ordersView) {
                        props.history.push(
                          `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                        );
                      } else {
                        toast.error('You are not authorized', {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          transition: Zoom
                        });
                      }
                    }}>
                    {moment(hit?.orderDate).format('MM/DD/YYYY')}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.ordersView) {
                        props.history.push(
                          `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                        );
                      } else {
                        toast.error('You are not authorized', {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          transition: Zoom
                        });
                      }
                    }}>
                    {hit?.firstName}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.ordersView) {
                        props.history.push(
                          `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                        );
                      } else {
                        toast.error('You are not authorized', {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          transition: Zoom
                        });
                      }
                    }}>
                    {hit?.lastName}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link
                      to={`/apps/e-commerce/customers/profile/${hit.customerId}`}>
                      <h3 className="text-black">{hit?.customCustomerId}</h3>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.ordersView) {
                        props.history.push(
                          `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                        );
                      } else {
                        toast.error('You are not authorized', {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          transition: Zoom
                        });
                      }
                    }}>
                    {hit?.locationName}
                  </StyledTableCell>
                  <StyledTableCell>
                    {balances[hit?.objectID]}
                    {balances[hit?.objectID] === undefined ? (
                      <IconButton onClick={async () => await checkBalance(hit)}>
                        <GetAppIcon />
                      </IconButton>) : ''}
                  </StyledTableCell>
                  <StyledTableCell
                    className="capitalize"
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.ordersView) {
                        props.history.push(
                          `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                        );
                      } else {
                        toast.error('You are not authorized', {
                          position: 'top-center',
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          transition: Zoom
                        });
                      }
                    }}>
                    {hit?.orderStatus}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    );
  }
);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
    maxWidth: 'min-content'
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

const StyledTab = withStyles((theme) => ({
  root: {
    color: 'white',
    fontWeight: 'bold',
    minWidth: '110px',
    '&$selected': {
      color: '#f15a25', // Custom color for the selected tab
    },
  },
  selected: {},
}))(Tab);

const StyledDatePicker = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'white'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'yellow'
      }
    }
  }
}))(TextField);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

function Orders(props) {
  const classes = useStyles(props);
  const dispatch = useDispatch();
  const { form, handleChange } = useForm(null);
  const [value, setValue] = React.useState(0);
  const [isDataEmpty, setIsDataEmpty] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [selectAllData, setSelectAllData] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);
  const [openOrderTickets, setOpenOrderTickets] = useState(false)
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);
  const [searchClient, setSearchClient] = useState(algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY))

  const updateStatus = async (order, status) => {
    const uuid = order[0]; // add loader then update the page with the new data
    try {
      setisLoading(true)
      const queryOrder = await firestore()
        .collection('orders')
        .where('orderId', '==', Number(uuid))
        .limit(1)
        .get();

      let orderUuid = queryOrder.docs[0].id;

      await firestore()
        .collection('orders')
        .doc(orderUuid)
        .update({ orderStatus: status });
      setSelected([])

      setTimeout(() => {
        searchClient.clearCache()
        dispatch(
          MessageActions.showMessage({
            message: 'Order status updated successfully'
          })
        );
        setisLoading(false)
      }, 3000);

    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (_, newValue) => {
    setValue(newValue);
  };

  const ResultStats = connectStateResults(
    ({ searching }) =>
      (searching || isLoading) ? (<LoadingDialog />) : (<div></div>)
  );

  return (
    <div className="flex w-full overflow-hidden">
      <div className='flex flex-col w-full'>
        <InstantSearch searchClient={searchClient} indexName="orders">
          <div className={clsx(classes.tabHeader)}>
            <div className="p-4 flex justify-center items-center">
              <Typography
                className="hidden sm:flex mx-0 sm:mx-12 text-center uppercase"
                variant="h6"
                style={{ fontSize: '3rem', fontWeight: 600 }}>
                ORDERS
              </Typography>
              <IconButton color='secondary' onClick={() => {
                setSearchClient(algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY))
              }}>
                <CachedIcon />
              </IconButton>
            </div>
          </div>
          <div className={clsx(classes.tabHeader)}>
            <Tabs
              value={value}
              onChange={handleTabChange}
              indicatorColor="rgb(241, 90, 37)"
              textColor="rgb(241, 90, 37)"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="simple tabs example">
              {statuses.map((status, index) => {
                return (
                  <StyledTab
                    key={index}
                    className="p-0"
                    label={status.label.toUpperCase()}
                    style={{
                      fontSize: '1.2rem'
                    }}
                    {...a11yProps(status.value)}
                  />
                );
              })}
            </Tabs>
          </div>
          <Configure
            filters={`${value > 0 ? `orderStatus:'${statuses[value]?.label}'` : ''}${userData?.userRole === 'staff' ? `${value > 0 ? ' AND ' : ''}locationName:'${userData?.locationName}'` : ''}${(value > 0 || userData?.userRole === 'staff') ? ' AND ' : ''}${`orderDate:${form?.start ? new Date(form?.start).setHours(0, 0, 0, 0) : -2208988800000} TO ${form?.end ? new Date(form?.end).setHours(23, 59, 59, 0) : new Date().getTime()}`}`}
          />
          <div className={classes.header}>
            <div className="flex flex-col w-1/3">
              <div className="date-picker w-full flex flex-row gap-10 date-input justify-around">
                <StyledDatePicker
                  id="date"
                  label="Start Date"
                  type="date"
                  variant="outlined"
                  style={{ border: 'none' }}
                  defaultValue={form?.start}
                  InputLabelProps={{
                    shrink: true,
                    style: { color: 'white' }
                  }}
                  InputProps={{
                    inputProps: {
                      style: { color: 'white', fontSize: '10px' }
                    }
                  }}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: 'start',
                        value: e.target.value
                      }
                    });
                  }}
                />
                <StyledDatePicker
                  id="date"
                  label="End Date"
                  type="date"
                  style={{ border: 'none' }}
                  defaultValue={form?.end}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: 'white' }
                  }}
                  InputProps={{
                    inputProps: {
                      style: { color: 'white', fontSize: '10px' }
                    }
                  }}
                  onChange={(e) => {
                    handleChange({
                      target: {
                        name: 'end',
                        value: e.target.value
                      }
                    });
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col w-1/3">
              <SearchBox
                translations={{
                  placeholder: 'Search for orders...'
                }}
                style={{ color: '#000' }}
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
            <div className="flex flex-row">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  onClick={() => {
                    if (userData.userRole === 'admin' || userData?.ordersCreate) {
                      props.history.push(
                        `/apps/e-commerce/orders/addorder/new`
                      );
                    } else {
                      toast.error('You are not authorized', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        transition: Zoom
                      });
                    }
                  }}
                  className={classes.button}
                  variant="contained"
                  color="secondary">
                  <span className="hidden sm:flex">Add New</span>
                  <span className="flex sm:hidden">New</span>
                </Button>
              </FuseAnimate>
            </div>
          </div>
          <ResultStats />
          <TableContainer className="flex flex-col w-full overflow-scroll">
            {statuses.map((status) => (
              <TabPanel
                key={status.value}
                value={value}
                index={status.value}>
                <CustomHits
                  props={props}
                  value={value}
                  setIsDataEmpty={setIsDataEmpty}
                  selected={selected}
                  setSelected={setSelected}
                  selectAllData={selectAllData}
                  setSelectAllData={setSelectAllData}
                  userData={userData}
                  history={props?.history}
                  setSearchClient={setSearchClient}
                  setisLoading={setisLoading}
                />
              </TabPanel>
            ))}
          </TableContainer>
          <div className="flex flex-row justify-between">
            <div className="flex-1"></div>
            <div className="flex-1 justify-center mt-8"><Pagination showLast={true} /></div>
            <div className="flex-1"></div>
          </div>
          <MultipleOrderTickets
            selectedOrders={selected}
            open={openOrderTickets}
            handleClose={() => setOpenOrderTickets(false)}
          />
          <div className='flex flex-row justify-end gap-10 px-10'>
            {value === 7 && (
              <Button
                className={`whitespace-no-wrap mt-42 uppercase ${(selected.length === 0 || selected.length > 1) && 'opacity-75'
                  }`}
                style={{
                  backgroundColor: '#222',
                  color: '#FFF'
                }}
                variant="contained"
                color="secondary"
                disabled={selected.length === 0 || selected.length > 1}
                onClick={() => {
                  props.history.push(
                    `/apps/e-commerce/orders/redoorder/${selected[0]}`
                  );
                }}>
                REDO
              </Button>
            )}
            {value === 3 && (
              <Button
                className={`whitespace-no-wrap mt-42 uppercase ${(selected.length === 0 || selected.length > 1) && 'opacity-75'
                  }`}
                style={{
                  backgroundColor: '#222',
                  color: '#FFF'
                }}
                variant="contained"
                color="secondary"
                disabled={selected.length === 0 || selected.length > 1}
                onClick={() => {
                  updateStatus(selected, statuses[5].label)
                }}>
                TO SHOWROOM
              </Button>
            )}
            {value === 2 && (
              <Button
                className={`whitespace-no-wrap mt-42 uppercase ${(selected.length === 0) && 'opacity-75'}`}
                style={{
                  backgroundColor: '#222',
                  color: '#FFF'
                }}
                variant="contained"
                color="secondary"
                disabled={selected.length === 0}
                onClick={() => {
                  setOpenOrderTickets(true)
                }}>
                Print Tickets
              </Button>
            )}
            {value === 4 && (
              <Button
                className={`whitespace-no-wrap mt-42 uppercase ${(selected.length === 0 || selected.length > 1) && 'opacity-75'
                  }`}
                style={{
                  backgroundColor: '#222',
                  color: '#FFF'
                }}
                variant="contained"
                color="secondary"
                disabled={selected.length === 0 || selected.length > 1}
                onClick={() => {
                  updateStatus(selected, statuses[3].label)
                }}>
                IN PROGRESS
              </Button>
            )}
            {(value !== 0 && value !== 4 && value !== 8) &&
              !isDataEmpty &&
              value === statuses[value].value && (
                <Button
                  className={`whitespace-no-wrap mt-42 uppercase ${(selected.length === 0 || selected.length > 1) && 'opacity-75'
                    }`}
                  style={{
                    backgroundColor: '#222',
                    color: '#FFF'
                  }}
                  // className={classes.button}
                  variant="contained"
                  disabled={selected.length === 0 || selected.length > 1}
                  color="secondary"
                  onClick={() => {
                    updateStatus(selected, statuses[value + 1].label)
                  }}>
                  <span className="hidden sm:flex">
                    {statuses[value].label !== 'cancelled'
                      ? statuses[value + 1].label
                      : null}
                  </span>
                </Button>
              )}
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

export default withReducer('eCommerceApp', reducer)(Orders);
