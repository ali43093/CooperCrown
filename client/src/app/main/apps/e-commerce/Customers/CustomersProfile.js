import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore } from 'firebase';
import Icon from '@material-ui/core/Icon';
import { withRouter } from 'react-router';
import { useParams, Link } from 'react-router-dom';
import FusePageCarded from '@fuse/core/FusePageCarded';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 12,
    padding: 5,
    textAlign: 'center'
  },
  body: {
    fontSize: 12,
    padding: 0,
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

const useStyles = makeStyles({
  table: {
    minWidth: 450
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
  const routeParams = useParams();

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

      const queryInsurance = await firestore()
        .collection('insurances')
        .where('customerId', '==', Number(id))
        .get();

      let resultInsurance = [];
      queryInsurance.forEach((doc) => {
        resultInsurance.push(doc.data());
      });
      setInsurances(resultInsurance);
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
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        <div className="mt-24">
          <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/e-commerce/customers"
            color="inherit">
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4">Customers</span>
          </Typography>
          <div className="flex flex-row">
            <Icon className="text-20 mt-4">people</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Customer's Details
            </Typography>
          </div>
        </div>
      }
      content={
        <div className="flex flex-col w-full">
          <div className="flex flex-row p-16 sm:p-24 w-full">
            <div className="p-12 w-1/2 h-auto  rounded-20 shadow-10">
              <h1>Customer Info</h1>
              <h2>{`Name: ${customer?.firstName} ${customer.lastName}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Customer Id: ${customer.customerId}`}</h2>
              <h2>{`DOB: ${customer?.dob.toDateString()}`}</h2>
              <h2>{`Sex: ${customer?.gender}`}</h2>
              <h2>{`Ethnicity: ${customer?.ethnicity}`}</h2>
              <h2>{`Address: ${customer?.address}`}</h2>
              <h2>{`City: ${customer?.city}`}</h2>
              <h2>{`State: ${customer?.state}`}</h2>
              <h2>{`Zip-Code: ${customer?.zipCode}`}</h2>
              <h2>{`Phone 1: ${customer?.phone1}`}</h2>
              <h2>{`Phone 2: ${customer?.phone2}`}</h2>
              <h2>{`Email: ${customer?.email}`}</h2>
              <h2>{`Other: ${customer?.other}`}</h2>
            </div>
            <div className="p-12 ml-10 w-1/2 h-auto  rounded-20 shadow-10">
              <h1>Family Tree to be implemented Soon</h1>
            </div>
          </div>

          <div className="flex flex-row p-16 sm:p-24 w-full">
            <div className="flex flex-col p-12 w-1/3 h-320  rounded-20 shadow-10">
              <h2 className="font-700 text-center">INSURANCE</h2>

              <div className="flex flex-1 overflow-scroll">
                <div className="flex flex-col ">
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      stickyHeader
                      aria-label="customized table">
                      <TableHead>
                        <TableRow style={{ height: 10 }}>
                          <StyledTableCell>Insurance</StyledTableCell>
                          <StyledTableCell>Holder</StyledTableCell>
                          <StyledTableCell>Policy #</StyledTableCell>
                          <StyledTableCell>Options</StyledTableCell>
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
                              style={{ height: 10 }}>
                              <StyledTableCell>
                                {row.insuranceCompany}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.primaryHolder}
                              </StyledTableCell>
                              <StyledTableCell>{row.policyNo}</StyledTableCell>
                              <StyledTableCell>
                                <IconButton
                                  onClick={() => {
                                    props.history.push(
                                      `/apps/e-commerce/customers/profile/editinsurance/${row.insuranceId}`
                                    );
                                  }}
                                  aria-label="edit">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="justify-center ml-160"
                  variant="contained"
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/customers/addinsurance/${customer?.customerId}`
                    );
                  }}
                  color="secondary"
                  size="large"
                  startIcon={<AddCircleOutlineOutlinedIcon />}>
                  Add Insurance
                </Button>
              </div>
            </div>
            <div className="flex flex-col p-12 ml-6 w-1/3 h-320  rounded-20 shadow-10">
              <h2 className="font-700 text-center">Rx</h2>
              <div className="flex justify-center">
                <ButtonGroup
                  variant="text"
                  color="secondary"
                  aria-label="text primary button group">
                  <Button
                    onClick={() => {
                      let eyeglassesRx = prescription.filter(
                        (word) => word.prescriptionType === 'eyeglassesRx'
                      );
                      setFilteredPrescription(eyeglassesRx);
                      setPrescriptionType('eyeglassesRx');
                    }}>
                    Glasses
                  </Button>
                  <Button
                    onClick={() => {
                      let contactLensRx = prescription.filter(
                        (word) => word.prescriptionType === 'contactLensRx'
                      );

                      setFilteredPrescription(contactLensRx);
                      setPrescriptionType('contactLensRx');
                    }}>
                    Contacts
                  </Button>
                  <Button
                    onClick={() => {
                      let medicationRx = prescription.filter(
                        (word) => word.prescriptionType === 'medicationRx'
                      );

                      setFilteredPrescription(medicationRx);
                      setPrescriptionType('medicationRx');
                    }}>
                    Medical
                  </Button>
                </ButtonGroup>
              </div>
              {prescriptionType === 'eyeglassesRx' && (
                <div className="flex flex-1 overflow-scroll">
                  <div className="flex flex-col ">
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="customized table">
                        <TableHead>
                          <TableRow style={{ height: 10 }}>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>SPH</StyledTableCell>
                            <StyledTableCell>CYL</StyledTableCell>
                            <StyledTableCell>AXIS</StyledTableCell>
                            <StyledTableCell>ADD</StyledTableCell>
                            <StyledTableCell>Options</StyledTableCell>
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
                                style={{ height: 10 }}>
                                <StyledTableCell>
                                  {`${row?.prescriptionDate
                                    ?.toDate()
                                    .getDate()}-${
                                    row?.prescriptionDate?.toDate().getMonth() +
                                    1
                                  }-${row?.prescriptionDate
                                    ?.toDate()
                                    .getFullYear()}`}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.eyeglassesSphereOd}</div>
                                    <div>{row.eyeglassesSphereOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.eyeglassesCylinderOd}</div>
                                    <div>{row.eyeglassesCylinderOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.eyeglassesAxisOd}</div>
                                    <div>{row.eyeglassesAxisOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.eyeglassesAddOd}</div>
                                    <div>{row.eyeglassesAddOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <IconButton
                                    disabled={true}
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/${row.customerId}`
                                      );
                                    }}
                                    aria-label="view">
                                    <PageviewOutlinedIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/editprescription/${row.prescriptionId}`
                                      );
                                    }}
                                    aria-label="edit">
                                    <EditIcon fontSize="small" />
                                  </IconButton>
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
                  <div className="flex flex-col ">
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="customized table">
                        <TableHead>
                          <TableRow style={{ height: 10 }}>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>SPH</StyledTableCell>
                            <StyledTableCell>CYL</StyledTableCell>
                            <StyledTableCell>AXIS</StyledTableCell>
                            <StyledTableCell>ADD</StyledTableCell>
                            <StyledTableCell>Options</StyledTableCell>
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
                                style={{ height: 10 }}>
                                <StyledTableCell>
                                  {`${row?.prescriptionDate
                                    ?.toDate()
                                    .getDate()}-${
                                    row?.prescriptionDate?.toDate().getMonth() +
                                    1
                                  }-${row?.prescriptionDate
                                    ?.toDate()
                                    .getFullYear()}`}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.contactLensSphereOd}</div>
                                    <div>{row.contactLensSphereOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.contactLensCylinderOd}</div>
                                    <div>{row.contactLensCylinderOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.contactLensAxisOd}</div>
                                    <div>{row.contactLensAxisOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.contactLensAddOd}</div>
                                    <div>{row.contactLensAddOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <IconButton
                                    disabled={true}
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/${row.customerId}`
                                      );
                                    }}
                                    aria-label="view">
                                    <PageviewOutlinedIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/editprescription/${row.prescriptionId}`
                                      );
                                    }}
                                    aria-label="edit">
                                    <EditIcon fontSize="small" />
                                  </IconButton>
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
                  <div className="flex flex-col ">
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="customized table">
                        <TableHead>
                          <TableRow style={{ height: 10 }}>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Medication</StyledTableCell>

                            <StyledTableCell>Options</StyledTableCell>
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
                                style={{ height: 10 }}>
                                <StyledTableCell>
                                  {`${row?.prescriptionDate
                                    ?.toDate()
                                    .getDate()}-${
                                    row?.prescriptionDate?.toDate().getMonth() +
                                    1
                                  }-${row?.prescriptionDate
                                    ?.toDate()
                                    .getFullYear()}`}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="w-136 truncate">
                                    {row?.medicationComments}
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <IconButton
                                    disabled={true}
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/${row.customerId}`
                                      );
                                    }}
                                    aria-label="view">
                                    <PageviewOutlinedIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/editprescription/${row.prescriptionId}`
                                      );
                                    }}
                                    aria-label="edit">
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  variant="contained"
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/customers/addRx/${customer?.customerId}`
                    );
                  }}
                  color="secondary"
                  size="large"
                  startIcon={<AddCircleOutlineOutlinedIcon />}>
                  Add Rx
                </Button>
              </div>
            </div>
            <div className="flex flex-col ml-6 p-12 w-1/3 h-320  rounded-20 shadow-10 ">
              <h2 className="font-700 text-center">EXAM HISTORY</h2>

              <div className="flex flex-1 overflow-scroll">
                <div className="flex flex-col ">
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      stickyHeader
                      aria-label="customized table">
                      <TableHead>
                        <TableRow style={{ height: 10 }}>
                          <StyledTableCell>Date</StyledTableCell>
                          <StyledTableCell>Exam Type</StyledTableCell>

                          <StyledTableCell>Options</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {exam
                          .sort((a, b) => (a.examId > b.examId ? -1 : 1))
                          .map((row) => (
                            <StyledTableRow
                              key={row.examId}
                              style={{ height: 10 }}>
                              <StyledTableCell>
                                {`${row?.examTime?.toDate().getDate()}-${
                                  row?.examTime?.toDate().getMonth() + 1
                                }-${row?.examTime?.toDate().getFullYear()}`}
                              </StyledTableCell>
                              <StyledTableCell>
                                Comprehensive Exam
                              </StyledTableCell>
                              <StyledTableCell>
                                <IconButton
                                  onClick={() => {
                                    props.history.push(
                                      `/apps/e-commerce/customers/profile/viewexam/${row.examId}`
                                    );
                                  }}
                                  aria-label="view">
                                  <PageviewOutlinedIcon fontSize="small" />
                                </IconButton>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="justify-center ml-160"
                  variant="contained"
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/customers/addExam/${customer?.customerId}`
                    );
                  }}
                  color="secondary"
                  size="large"
                  startIcon={<AddCircleOutlineOutlinedIcon />}>
                  New Exam
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
      innerScroll
    />
  );
};

export default withRouter(CustomerProfile);