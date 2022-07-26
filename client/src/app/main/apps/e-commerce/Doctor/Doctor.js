import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import ConfirmDoctorDelete from './ConfirmDoctorDelete';
import Icon from '@material-ui/core/Icon';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { firestore } from 'firebase';

import * as Actions from '../store/actions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import reducer from '../store/reducers';

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
function Doctor(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.doctor);
  const theme = useTheme();
  const [showRooms, setShowRooms] = useState([]);

  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const routeParams = useParams();

  useDeepCompareEffect(() => {
    const updateProductState = async () => {
      setisLoading(false);
      const { doctorId } = routeParams;
      if (doctorId === 'new') {
        dispatch(Actions.newDoctor());
        setisLoading(true);
      } else {
        await dispatch(await Actions.getDoctor(doctorId));
        setisLoading(true);
      }
    };

    updateProductState();
  }, [dispatch, routeParams]);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (
      (product.data && !form) ||
      (product.data && form && product.data.id !== form.id)
    ) {
      setForm(product.data);
    }

    // const fetchCustomer = async () => {
    //   const query = await firestore()
    //     .collection('doctors')
    //     .where('doctorId', '==', Number(id))
    //     .limit(1)
    //     .get(); }

    const fetchlocation = async () => {
      let showroomdata = [];
      const queryShowrooms = await firestore()
        .collection('showRooms')
        .get();

      queryShowrooms.forEach((doc) => {
        showroomdata.push(doc.data());
      });
      setShowRooms(showroomdata);

      if (history?.location?.state?.start !== undefined) {
        setForm({
          start: history.location.state.start,
          showRoomId: history.location.state.showRoomId,
        });
      }

      setisLoading(false);
    };
    fetchlocation();
  }, [form, product.data, setForm]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  function canBeSubmitted() {
    return (
      form.docname.length > 0 &&
      form.locationAddress.length > 0 &&
      form.State.length > 0 &&
      form.City.length > 0 &&
      form.zipCode.length > 0
    );
  }

  const isFormValid = () => {
    const errs = {};

    if (!form.fname) {
      errs.fname = 'Please enter first name'
    }

    if (!form.lname) {
      errs.lname = 'Please enter last name'
    }

    if (!form.address) {
      errs.address = 'Please enter address'
    }

    if (!form.dob) {
      errs.dob = 'Please enter date of birth'
    }

    if (!form.Gender) {
      errs.gender = 'Please enter gender'
    }

    if (!form.phone1) {
      errs.phone1 = 'Please enter phone number'
    }

    if (!form.city) {
      errs.city = 'Please enter city'
    }

    if (!form.State) {
      errs.State = 'Please enter state'
    }

    if (!form.zipcode) {
      errs.zipcode = 'Please enter zipcode'
    }

    if (!form.doctoremail) {
      errs.doctoremail = 'Please enter email address'
    }

    return errs;
  }

  const submitForm = async () => {
    if (routeParams.doctorId === 'new') {
      setisLoading(false);
      await dispatch(await Actions.saveDoctor(form));
      props.history.push('/apps/e-commerce/doctors');
      setisLoading(true);
    } else {
      setisLoading(false);
      await dispatch(await Actions.updateDoctor(form));
      props.history.push('/apps/e-commerce/doctors');
      setisLoading(true);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = isFormValid();
    setErrors(errs);

    if (Object.entries(errs).some((err) => err !== '')) {
      return
    }

    submitForm();
  }



  if (
    (!product.data ||
      (product.data && routeParams.doctorId !== product.data.id)) &&
    routeParams.doctorId !== 'new' &&
    !isLoading
  ) {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      header={
        form && (

          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/apps/e-commerce/doctors"
                  color="inherit">
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4">Doctor</span>
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <img
                    className="w-32 sm:w-48 rounded"
                    src="assets/images/ecommerce/product-image-placeholder.png"
                    alt={`${form.fname} ${form.lname}`}
                  />
                </FuseAnimate>
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {(form.fname || form.lname) ? `${form.fname} ${form.lname}` : 'New Doctor'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">Doctor Detail</Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>

            {/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap normal-case"
                variant="contained"
                color="secondary"
                disabled={!canBeSubmitted()}
                onClick={async () => {
                  if (routeParams.doctorId === 'new') {
                    setisLoading(false);
                    await dispatch(await Actions.saveShowRoom(form));
                    setisLoading(true);
                    props.history.push(`/apps/e-commerce/showRooms`);
                  } else {
                    setisLoading(false);
                    await dispatch(await Actions.updateShowRoom(form));
                    setisLoading(true);
                    props.history.push(`/apps/e-commerce/showRooms`);
                  }
                }}>
                Save
              </Button>
            </FuseAnimate> */}
          </div>
        )
      }
      contentToolbar={

        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: 'w-full h-64' }}>
          <Tab className="h-64 normal-case" label={routeParams.doctorId !== 'new' ? 'Edit Doctor Details' : "New Doctor"} />
        </Tabs>

      }
      content={
        form && (
          <div className="p-16 sm:p-24">
            <div className="flex flex-col h-260  px-16 py-6 gap-20">
              {tabValue === 0 && (
                <>
                  <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                    <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                      <h1 className="font-700" style={{ color: '#f15a25' }}>
                        DOCTOR INFO
                      </h1>
                    </div>


                    <div>
                      <div className="flex flex-col justify-center p-16 sm:p-24 ">
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            required
                            label="First Name"
                            autoFocus
                            id="doctor-fname"
                            name="fname"
                            type="text"
                            value={form.fname}
                            onChange={handleChange}
                            variant="outlined"
                            error={errors.fname}
                            helperText={errors.fname}
                            fullwidth
                          />
                          <TextField
                            className="w-1/2"
                            required
                            id="doctor-address"
                            name="address"
                            onChange={handleChange}
                            label="Address"
                            type="address"
                            value={form.address}
                            variant="outlined"
                            error={errors.address}
                            helperText={errors.address}
                            fullwidth
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            required
                            label="Last Name"
                            autoFocus
                            id="doctor-lname"
                            name="lname"
                            type="text"
                            value={form.lname}
                            onChange={handleChange}
                            variant="outlined"
                            error={errors.lname}
                            helperText={errors.lname}
                            fullwidth
                          />
                          <TextField
                            className="w-1/2"
                            required
                            label="City"
                            autoFocus
                            id="doctor-city"
                            name="city"
                            type="text"
                            value={form.city}
                            onChange={handleChange}
                            variant="outlined"
                            error={errors.city}
                            helperText={errors.city}
                            fullwidth
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <div className="flex flex-row flex-wrap gap-4 w-1/2">
                            <TextField
                              id="date"
                              required
                              label="Date Of Birth"
                              type="date"
                              InputLabelProps={{ shrink: true }}
                              defaultValue={form?.dob}
                              variant='outlined'
                              fullWidth
                              error={errors.dob}
                              helperText={errors.dob}
                              onChange={(e) => {
                                handleChange({
                                  target: { 
                                    name: 'dob', 
                                    value: firestore.Timestamp.fromDate(new Date(e.target.value)) 
                                  }
                                });
                              }}
                            />

                            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                className="ml-0 0 mt-0 w-full"
                                margin="normal"
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                label="Date of Birth"
                                fullwidth
                                value={form?.dob}
                                onChange={(date) => {
                                  handleChange({
                                    target: { name: 'dob', value: date }
                                  });
                                }}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date'
                                }}
                              />
                            </MuiPickersUtilsProvider> */}
                          </div>
                          <TextField
                            className="w-1/2"
                            required
                            label="State"
                            autoFocus
                            id="doctor-State"
                            name="State"
                            type="text"
                            value={form.State}
                            error={errors.State}
                            helperText={errors.State}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            required
                            label="Gender"
                            autoFocus
                            id="user-Gender"
                            name="Gender"
                            type="text"
                            value={form.Gender}
                            onChange={handleChange}
                            variant="outlined"
                            error={errors.gender}
                            helperText={errors.gender}
                          />
                          <TextField
                            className="w-1/2"
                            required
                            label="Zip Code"
                            autoFocus
                            id="doctor-zipcode"
                            name="zipcode"
                            type="Number"
                            value={form.zipcode}
                            onChange={handleChange}
                            error={errors.zipcode}
                            helperText={errors.zipcode}
                            variant="outlined"
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            required
                            label="Phone 1"
                            autoFocus
                            id="user-phone1"
                            name="phone1"
                            type="phone"
                            value={form.phone1}
                            onChange={handleChange}
                            variant="outlined"
                            error={errors.phone1}
                            helperText={errors.phone1}
                          />
                          <TextField
                            className="w-1/2"
                            required
                            label="Email"
                            autoFocus
                            id="doctor-doctoremail"
                            name="doctoremail"
                            type="email"
                            value={form.doctoremail}
                            onChange={handleChange}
                            error={errors.doctoremail}
                            helperText={errors.doctoremail}
                            variant="outlined"
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            label="Phone 2"
                            autoFocus
                            id="user-phone2"
                            name="phone2"
                            type="phone"
                            value={form.phone2}
                            onChange={handleChange}
                            variant="outlined"
                          />
                          <TextField
                            className="w-1/2"
                            label="Other"
                            autoFocus
                            id="doctor-other"
                            name="other"
                            type="text"
                            value={form.other}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                    <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                      <h1 className="font-700" style={{ color: '#f15a25' }}>
                        SERVICE LOCATION
                      </h1>
                    </div>
                    <div className="flex flex-col justify-center p-16 sm:p-24 ">
                      <FormControl>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="showRoomId1"
                          defaultValue={form?.showRoomId}
                          value={form?.showRoomId1}
                          name="showRoomId1"
                          onChange={handleChange}
                          autoWidth>
                          {showRooms.map((row) => (
                            <MenuItem value={row?.showRoomId}>
                              {row?.locationName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Location 1</FormHelperText>
                      </FormControl>
                      <FormControl>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="showRoomId2"
                          defaultValue={form?.showRoomId}
                          value={form?.showRoomId2}
                          name="showRoomId2"
                          onChange={handleChange}
                          autoWidth>
                          {showRooms.map((row) => (
                            <MenuItem value={row?.showRoomId}>
                              {row?.locationName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Location 2</FormHelperText>
                      </FormControl>
                      <FormControl>
                        <Select
                          labelId="demo-simple-select-autowidth-label"

                          id="showRoomId3"
                          defaultValue={form?.showRoomId}
                          value={form?.showRoomId3}
                          name="showRoomId3"
                          onChange={handleChange}
                          autoWidth>
                          {showRooms.map((row) => (
                            <MenuItem value={row?.showRoomId}>
                              {row?.locationName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Location 3</FormHelperText>
                      </FormControl>
                    </div>
                  </div>
                </>
              )}
              <div className="flex flex-col" >
                <Button
                  style={{
                    padding: '10px 32px'
                  }}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}>
                  Save
                </Button>
              </div>
              {
                routeParams.doctorId !== 'new' && (
                  <div className="flex flex-col">
                    <ConfirmDoctorDelete open={open} handleClose={handleClose} form={form} propssent={props} />

                    <Button
                      style={{
                        color: 'red',
                        padding: '10px 32px'
                      }}
                      variant="outlined"
                      // onClick={() => setShowModal(true)}
                      onClick={() => {
                        if (routeParams.doctorId === 'new') {
                          alert('No Data to delete')
                        }
                        else {
                          setOpen(true);
                        }

                      }}
                    >
                      <Icon>delete</Icon>
                      DELETE
                    </Button>

                  </div>
                )
              }
            </div>
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Doctor);
