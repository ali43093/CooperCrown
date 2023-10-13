import { addTwoDecimalPlaces } from '../ReusableComponents/HelperFunctions';
import { firestore } from 'firebase';
import { toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import moment from 'moment';
import OrderHistory from './OrderHistory';
import Paper from '@material-ui/core/Paper';
import PrescriptionReceipt from './PrescriptionReceipt';
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
    padding: 10,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 10,
    minWidth: 'min-content',
    textAlign: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

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

const useStyles = makeStyles({
  table: {
    minWidth: 450
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});

const CustomerProfile = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const classes = useStyles();
  const [customer, setCustomer] = useState({});
  const [exam, setExam] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [prescriptionType, setPrescriptionType] = useState('eyeglassesRx');
  const [filteredPrescription, setFilteredPrescription] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const routeParams = useParams();
  const [openPrescriptionReceipt, setOpenPrescriptionReceipt] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState({});
  const [showRooms, setShowRooms] = useState();
  const [disabledState, setDisabledState] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  const handlePrescriptionReceiptClose = () => {
    setOpenPrescriptionReceipt(false);
  };

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  const checkLocationName = (no) => {
    for (var i = 0; i < showRooms.length; i++) {
      if (showRooms[i].showRoomId === no) {
        return showRooms[i].locationName;
      }
    }
  };

  const onMemosChange = async () => {
    await firestore()
      .collection('customers')
      .doc(customer?.id)
      .update({ memos: customer?.memos });

    dispatch(
      MessageActions.showMessage({
        message: 'Memos updated successfully!'
      })
    );
  };

  useEffect(() => {
    setisLoading(true);
    const id = routeParams.customerId;
    const fetchCustomer = async () => {
      const queryCustomer = await firestore()
        .collection('customers')
        .where('customerId', '==', Number(id))
        .limit(1)
        .get();

      let resultCustomer = queryCustomer.docs[0].data();
      resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
      resultCustomer.id = queryCustomer.docs[0].id;
      setCustomer(resultCustomer);
      const queryFamilyMembers = await firestore()
        .collection('customers')
        .where('family', '==', resultCustomer?.family)
        .get();
      let resultFamilyMembers = [];
      queryFamilyMembers.forEach((doc) => {
        resultFamilyMembers.push(doc.data());
      });
      setFamilyMembers(resultFamilyMembers);
    };

    const fetchExams = async () => {
      const queryExam = await firestore()
        .collection('exams')
        .where('customerId', '==', Number(id))
        .get();

      let resultExam = [];
      queryExam.forEach((doc) => {
        resultExam.push(doc.data());
      });
      setExam(resultExam);

      const queryPrescription = await firestore()
        .collection('prescriptions')
        .where('customerId', '==', Number(id))
        .get();

      let resultPrescription = [];
      queryPrescription.forEach((doc) => {
        resultPrescription.push(doc.data());
      });
      setPrescription(resultPrescription);

      let eyeglassesRx = resultPrescription.filter(
        (word) => word.prescriptionType === 'eyeglassesRx'
      );
      setFilteredPrescription(eyeglassesRx);
      setPrescriptionType('eyeglassesRx');

      const queryInsurance = await firestore()
        .collection('insurances')
        .where('customerId', '==', Number(id))
        .get();

      let resultInsurance = [];
      queryInsurance.forEach((doc) => {
        resultInsurance.push(doc.data());
      });
      setInsurances(resultInsurance);

      const queryShowroom = await firestore().collection('showRooms').get();
      let showroomdata = [];
      queryShowroom.forEach((doc) => {
        showroomdata.push(doc.data());
      });
      setShowRooms(showroomdata);

      setisLoading(false);
    };

    fetchCustomer();
    fetchExams();
  }, [routeParams.customerId]);
  if (isLoading) return <FuseLoading />;
  return !customer || !exam || !prescription || !insurances ? (
    <></>
  ) : (
    <FusePageCarded
      header={
        <div className=" flex flex-col w-full mt-4 relative">
          <Typography
            className="normal-case flex items-center sm:mb-12 absolute"
            component={Link}
            role="button"
            to="/apps/e-commerce/customers"
            color="inherit">
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4">Customers</span>
          </Typography>
          <div className="flex flex-row w-full px-10 justify-center">
            <div className="flex flex-row">
              <Typography className="text-16 pl-8 sm:text-20 truncate">
                CUSTOMER ID: {customer?.customCustomerId}
              </Typography>
            </div>
          </div>
          <div className="date-picker w-full flex flex-row gap-10 justify-start p-10">
            <StyledDatePicker
              id="date"
              label="Creation Date"
              type="date"
              variant="outlined"
              style={{ border: 'none' }}
              value={customer?.creationDate ? moment(customer?.creationDate.toDate()).format('YYYY-MM-DD') : ''}
              InputLabelProps={{
                shrink: true,
                style: { color: 'white' }
              }}
              InputProps={{
                inputProps: {
                  style: { color: 'white', fontSize: '10px' }
                }
              }}
              disabled={true}
            />
            <StyledDatePicker
              id="date"
              label="Last Edited"
              type="date"
              variant="outlined"
              style={{ border: 'none' }}
              value={customer?.editDate ? moment(customer?.editDate.toDate()).format('YYYY-MM-DD') : ''}
              InputLabelProps={{
                shrink: true,
                style: { color: 'white' }
              }}
              InputProps={{
                inputProps: {
                  style: { color: 'white', fontSize: '10px' }
                }
              }}
              disabled={true}
            />
          </div>
        </div>
      }
      content={
        <div className="flex flex-col w-full">
          <div className="flex p-16 flex-row w-full">
            <div className="customer-info w-1/2 h-auto">
              <div className="py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h2 className="font-700" style={{ color: '#f15a25' }}>
                    CUSTOMER INFO
                  </h2>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700 bg-grey-200">Customer ID:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6 bg-grey-200">{customer.customCustomerId}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700">Name:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6">{`${customer?.firstName} ${customer.lastName}`}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700 bg-grey-200">
                      Date of Birth:
                    </h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6 bg-grey-200">
                      {customer?.dob.toDateString()}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700">Sex:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6">{customer?.gender}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700 bg-grey-200">Ethnicity:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6 bg-grey-200">{customer?.ethnicity}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700">Address:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6">{customer?.address}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700 bg-grey-200">City:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6 bg-grey-200">{customer?.city}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700">State:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6">{customer?.state}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700 bg-grey-200">Zip-Code:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6 bg-grey-200">{customer?.zipCode}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700">Phone 1:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6">
                      {formatPhoneNumber(customer?.phone1)}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700 bg-grey-200">Phone 2:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6 bg-grey-200">
                      {formatPhoneNumber(customer?.phone2)}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700">Email:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6">{customer?.email}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700 bg-grey-200">Other:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6 bg-grey-200">{customer?.other}</h3>
                  </div>
                </div>
                <div className="flex flex-col p-6">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.customersEdit) {
                        props.history.push(`/apps/e-commerce/customers/${customer?.customerId}`)
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
                    }
                    }>
                    <EditIcon fontSize="small" />
                    EDIT
                  </Button>
                </div>
              </div>
            </div>
            <div className="note ml-10 w-1/2 h-auto">
              <div className="py-4 border-1 border-black border-solid rounded-6 h-full relative">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h2 className="font-700" style={{ color: '#f15a25' }}>
                    NOTE
                  </h2>
                </div>
                <div className="relative">
                  <div className="flex w-full">
                    <TextField
                      className="p-2"
                      disabled={disabledState}
                      inputProps={{ style: { fontSize: 20, lineHeight: 1 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      id="memos"
                      type="text"
                      name="memos"
                      value={customer?.memos}
                      onChange={(e) => {
                        setCustomer({ ...customer, memos: e.target.value });
                      }}
                      multiline
                      minRows={13}
                      variant="standard"
                      fullWidth
                    />
                  </div>
                </div>
                {disabledState && (
                  <div className="flex flex-col w-full p-2 absolute bottom-0 mb-6">
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setDisabledState(false);
                      }}>
                      <EditIcon fontSize="small" />
                      EDIT
                    </Button>
                  </div>
                )}
                {!disabledState && (
                  <div className="flex flex-col w-full p-2 absolute bottom-0 mb-6">
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        setDisabledState(true);
                        onMemosChange();
                      }}>
                      <Icon>save</Icon>
                      SAVE
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="family-tree flex flex-col px-16">
            <div className="py-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h2 className="font-700" style={{ color: '#f15a25' }}>
                  FAMILY TREE
                </h2>
              </div>
              <div className="flex flex-col w-full h-auto">
                <TableContainer
                  className="flex flex-col w-full max-h-400"
                  component={Paper}>
                  <Table stickyHeader aria-label="customized table">
                    <TableHead>
                      <TableRow style={{ height: 10 }} className='truncate'>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>FIRST NAME</StyledTableCell>
                        <StyledTableCell>LAST NAME</StyledTableCell>
                        <StyledTableCell>D.O.B</StyledTableCell>
                        <StyledTableCell>GENDER</StyledTableCell>
                        <StyledTableCell>STATE</StyledTableCell>
                        <StyledTableCell>ZIP CODE</StyledTableCell>
                        <StyledTableCell>PHONE</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {familyMembers
                        .sort((a, b) => (a.customerId > b.customerId ? -1 : 1))
                        .map((row) => (
                          <StyledTableRow
                            className='truncate cursor-pointer'
                            key={row.customerId}
                            style={{ height: 10 }}>
                            <StyledTableCell onClick={() => props.history.push(`/apps/e-commerce/customers/profile/${row?.customerId}`)}>
                              {row?.customCustomerId}
                            </StyledTableCell>
                            <StyledTableCell onClick={() => props.history.push(`/apps/e-commerce/customers/profile/${row?.customerId}`)}>
                              {row?.firstName}
                            </StyledTableCell>
                            <StyledTableCell onClick={() => props.history.push(`/apps/e-commerce/customers/profile/${row?.customerId}`)}>
                              {row?.lastName}
                            </StyledTableCell>
                            <StyledTableCell>
                              {moment(row.dob.toDate()).format('MM/DD/YYYY')}
                            </StyledTableCell>
                            <StyledTableCell>{row?.gender}</StyledTableCell>
                            <StyledTableCell>{row?.state}</StyledTableCell>
                            <StyledTableCell>{row?.zipCode}</StyledTableCell>
                            <StyledTableCell>
                              {formatPhoneNumber(row?.phone1)}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-16 w-full gap-10">
            <div className="insurance flex flex-col w-full">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h2 className="font-700" style={{ color: '#f15a25' }}>
                    INSURANCE
                  </h2>
                </div>
                <div className="flex flex-row p-12 justify-end">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.insuranceCreate) {
                        props.history.push(
                          `/apps/e-commerce/customers/addinsurance/${customer?.customerId}`
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
                    ADD NEW
                  </Button>
                </div>
                <div className="flex flex-1 overflow-scroll">
                  <div className="flex flex-col w-full">
                    <TableContainer component={Paper} className="max-h-400">
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="customized table">
                        <TableHead>
                          <TableRow style={{ height: 10 }}>
                            <StyledTableCell>DATE</StyledTableCell>
                            <StyledTableCell>COMPANY</StyledTableCell>
                            <StyledTableCell>PRIMARY HOLDER</StyledTableCell>
                            <StyledTableCell>POLICY No.</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {insurances
                            .sort((a, b) =>
                              a.insuranceId > b.insuranceId ? -1 : 1
                            )
                            .map((row) => (
                              <StyledTableRow
                                key={row.insuranceId}
                                style={{ height: 10 }}
                                onClick={() => {
                                  if (userData.userRole === 'admin' || userData?.insuranceView) {
                                    props.history.push(
                                      `/apps/e-commerce/customers/profile/editinsurance/${row?.insuranceId}`
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
                                <StyledTableCell>
                                  {row?.dateCreated && moment(row?.dateCreated.toDate()).format('MM/DD/YYYY')}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.insuranceCompany}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.primaryHolder}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.policyNo}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="RX flex flex-col mt-6 w-full">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h2 className="font-700" style={{ color: '#f15a25' }}>
                    RX
                  </h2>
                </div>
                <div className="flex flex-row p-12 justify-end">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/customers/addRx/${customer?.customerId}`
                      );
                    }}>
                    ADD NEW
                  </Button>
                </div>
                <PrescriptionReceipt
                  mainForm={selectedPrescription}
                  open={openPrescriptionReceipt}
                  handleClose={handlePrescriptionReceiptClose}
                  customer={customer}
                />

                <div className="flex justify-center">
                  <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="text primary button group gap-10">
                    <Button
                      style={{
                        border: 'none',
                        color: prescriptionType === 'eyeglassesRx' && '#f15a25'
                      }}
                      onClick={() => {
                        let eyeglassesRx = prescription.filter(
                          (word) => word.prescriptionType === 'eyeglassesRx'
                        );
                        setFilteredPrescription(eyeglassesRx);
                        setPrescriptionType('eyeglassesRx');
                      }}>
                      EYEGLASSES
                    </Button>
                    <Button
                      style={{
                        border: 'none',
                        color: prescriptionType === 'contactLensRx' && '#f15a25'
                      }}
                      onClick={() => {
                        let contactLensRx = prescription.filter(
                          (word) => word.prescriptionType === 'contactLensRx'
                        );

                        setFilteredPrescription(contactLensRx);
                        setPrescriptionType('contactLensRx');
                      }}>
                      CONTACT LENS
                    </Button>
                    <Button
                      style={{
                        border: 'none',
                        color: prescriptionType === 'medicationRx' && '#f15a25'
                      }}
                      onClick={() => {
                        let medicationRx = prescription.filter(
                          (word) => word.prescriptionType === 'medicationRx'
                        );

                        setFilteredPrescription(medicationRx);
                        setPrescriptionType('medicationRx');
                      }}>
                      MEDICAL
                    </Button>
                  </ButtonGroup>
                </div>
                {prescriptionType === 'eyeglassesRx' && (
                  <div className="flex flex-1 overflow-scroll">
                    <div className="flex flex-col w-full">
                      <TableContainer component={Paper} className="max-h-400">
                        <Table
                          className={classes.table}
                          stickyHeader
                          aria-label="customized table">
                          <TableHead>
                            <TableRow style={{ height: 10 }}>
                              <StyledTableCell>DATE</StyledTableCell>
                              <StyledTableCell>SPHERE</StyledTableCell>
                              <StyledTableCell>CYLINDER</StyledTableCell>
                              <StyledTableCell>AXIS</StyledTableCell>
                              <StyledTableCell>ADD</StyledTableCell>
                              <StyledTableCell>PRISM / BASE</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredPrescription
                              .sort((a, b) =>
                                a.prescriptionId > b.prescriptionId ? -1 : 1
                              )
                              .map((row) => (
                                <StyledTableRow
                                  onClick={() => {
                                    setSelectedPrescription(row);
                                    setOpenPrescriptionReceipt(true);
                                  }}
                                  key={row.prescriptionId}
                                  style={{ height: 10 }}>
                                  <StyledTableCell
                                    onClick={() => { props.history.push(`/apps/e-commerce/customers/editRx/${row?.prescriptionId}`) }}
                                    style={row?.onRx ? { color: 'red' } : { color: 'black' }}>
                                    {row?.onRx ? (<LabelImportantIcon color="secondary" />) : ('\xa0\xa0\xa0\xa0\xa0\xa0\xa0')}{' '}
                                    {moment(row?.prescriptionDate.toDate()).format('MM/DD/YYYY')}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{addTwoDecimalPlaces(row?.eyeglassesSphereOd)}</div>
                                      <div>{addTwoDecimalPlaces(row?.eyeglassesSphereOs)}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{addTwoDecimalPlaces(row?.eyeglassesCylinderOd)}</div>
                                      <div>{addTwoDecimalPlaces(row?.eyeglassesCylinderOs)}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row?.eyeglassesAxisOd}</div>
                                      <div>{row?.eyeglassesAxisOs}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{addTwoDecimalPlaces(row?.eyeglassesAddOd)}</div>
                                      <div>{addTwoDecimalPlaces(row?.eyeglassesAddOs)}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{addTwoDecimalPlaces(row?.eyeglassesPrismOd)}</div>
                                      <div>{addTwoDecimalPlaces(row?.eyeglassesPrismOs)}</div>
                                    </div>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                )}

                {prescriptionType === 'contactLensRx' && (
                  <div className="flex flex-1 overflow-scroll">
                    <div className="flex flex-col w-full">
                      <TableContainer component={Paper} className="max-h-400">
                        <Table
                          className={classes.table}
                          stickyHeader
                          aria-label="customized table">
                          <TableHead>
                            <TableRow style={{ height: 10 }} className='truncate'>
                              <StyledTableCell>DATE</StyledTableCell>
                              <StyledTableCell>SPHERE</StyledTableCell>
                              <StyledTableCell>CYLINDER</StyledTableCell>
                              <StyledTableCell>AXIS</StyledTableCell>
                              <StyledTableCell>ADD</StyledTableCell>
                              <StyledTableCell>BC</StyledTableCell>
                              <StyledTableCell>BRAND</StyledTableCell>
                              <StyledTableCell>MODEL</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredPrescription
                              .sort((a, b) =>
                                a.prescriptionId > b.prescriptionId ? -1 : 1
                              )
                              .map((row) => (
                                <StyledTableRow
                                  className='truncate'
                                  onClick={() => {
                                    setSelectedPrescription(row);
                                    setOpenPrescriptionReceipt(true);
                                  }}
                                  key={row.prescriptionId}
                                  style={{ height: 10 }}>
                                  <StyledTableCell
                                    className='cursor-pointer'
                                    style={row?.onRx ? { color: 'red' } : { color: 'black' }}
                                    onClick={() => { props.history.push(`/apps/e-commerce/customers/editRx/${row?.prescriptionId}`) }}>
                                    {row?.onRx ? (
                                      <LabelImportantIcon color="secondary" />
                                    ) : (
                                      '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
                                    )}{' '}
                                    {moment(
                                      row?.prescriptionDate.toDate()
                                    ).format('MM/DD/YYYY')}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{addTwoDecimalPlaces(row.contactLensSphereOd)}</div>
                                      <div>{addTwoDecimalPlaces(row.contactLensSphereOs)}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{addTwoDecimalPlaces(row.contactLensCylinderOd)}</div>
                                      <div>{addTwoDecimalPlaces(row.contactLensCylinderOs)}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row?.contactLensAxisOd}</div>
                                      <div>{row?.contactLensAxisOs}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{addTwoDecimalPlaces(row.contactLensAddOd)}</div>
                                      <div>{addTwoDecimalPlaces(row.contactLensAddOs)}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{addTwoDecimalPlaces(row.contactLensBcOd)}</div>
                                      <div>{addTwoDecimalPlaces(row.contactLensBcOs)}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{addTwoDecimalPlaces(row.contactLensBrandOd)}</div>
                                      <div>{addTwoDecimalPlaces(row.contactLensBrandOs)}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{addTwoDecimalPlaces(row.contactLensModelOd)}</div>
                                      <div>{addTwoDecimalPlaces(row.contactLensModelOs)}</div>
                                    </div>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                )}

                {prescriptionType === 'medicationRx' && (
                  <div className="flex flex-1 overflow-scroll">
                    <div className="flex flex-col w-full">
                      <TableContainer component={Paper} className="max-h-400">
                        <Table
                          className={classes.table}
                          stickyHeader
                          aria-label="customized table">
                          <TableHead>
                            <TableRow style={{ height: 10 }}>
                              <StyledTableCell>DATE</StyledTableCell>
                              <StyledTableCell>MEDICATION</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredPrescription
                              .sort((a, b) =>
                                a.prescriptionId > b.prescriptionId ? -1 : 1
                              )
                              .map((row) => (
                                <StyledTableRow
                                  key={row.prescriptionId}
                                  onClick={() => { props.history.push(`/apps/e-commerce/customers/editRx/${row?.prescriptionId}`) }}
                                  style={{ height: 10 }}>
                                  <StyledTableCell>
                                    {moment(
                                      row?.prescriptionDate.toDate()
                                    ).format('MM/DD/YYYY')}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <div>{row?.medicationComments}</div>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="exam-history flex flex-col mt-6 w-full">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h2 className="font-700" style={{ color: '#f15a25' }}>
                    EXAM HISTORY
                  </h2>
                </div>
                <div className="flex flex-row p-12 justify-end">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.examsCreate) {
                        props.history.push(
                          `/apps/e-commerce/customers/addExam/${customer?.customerId}`
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
                    ADD NEW
                  </Button>
                </div>
                <div className="flex flex-1 overflow-scroll">
                  <div className="flex flex-col w-full">
                    <TableContainer component={Paper} className="max-h-400">
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="customized table">
                        <TableHead>
                          <TableRow style={{ height: 10 }}>
                            <StyledTableCell>DATE</StyledTableCell>
                            <StyledTableCell>LOCATION</StyledTableCell>
                            <StyledTableCell>DOCTOR</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {exam
                            .sort((a, b) => (a.examId > b.examId ? -1 : 1))
                            .map((row) => (
                              <StyledTableRow
                                onClick={() => {
                                  if (userData.userRole === 'admin' || userData?.examsView) {
                                    props.history.push(
                                      `/apps/e-commerce/customers/profile/viewexam/${row?.examId}`
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
                                key={row.examId}
                                style={{ height: 10 }}>
                                <StyledTableCell>
                                  {moment(row?.examTime.toDate()).format(
                                    'MM/DD/YYYY'
                                  )}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {checkLocationName(row?.showRoomId)}
                                </StyledTableCell>
                                <StyledTableCell>{row?.fullName}</StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order history flex flex-col max-h-400 px-16 py-6">
            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h2 className="font-700" style={{ color: '#f15a25' }}>
                  ORDER HISTORY
                </h2>
              </div>
              <div className="flex flex-row p-12 justify-end">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/orders/addorder/${customer.customerId}`
                    );
                  }}>
                  ADD NEW
                </Button>
              </div>
              <OrderHistory customer={customer} />
            </div>
          </div>
        </div>
      }
      innerScroll
    />
  );
};

export default withRouter(CustomerProfile);
