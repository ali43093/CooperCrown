import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CustomAlert from '../ReusableComponents/CustomAlert';
import CustomAutocomplete from '../ReusableComponents/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import Icon from '@material-ui/core/Icon';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});

const AddPrescription = (props) => {
  const classes = useStyles();
  const { setChangeOccured } = props;
  const [isLoading, setisLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const { form, handleChange, setForm } = useForm(null);
  const [filteredPrescription, setFilteredPrescription] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [openAlertOnSave, setOpenAlertOnSave] = useState(false);
  const routeParams = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (routeParams.prescriptionId) {
      setisLoading(true);
      setChangeOccured(true);
      const prescriptionId = routeParams.prescriptionId;
      const fetchDetails = async () => {
        const queryEditPrescription = await firestore()
          .collection('prescriptions')
          .where('prescriptionId', '==', Number(prescriptionId))
          .limit(1)
          .get();

        let resultEditPrescription = queryEditPrescription.docs[0].data();
        resultEditPrescription.prescriptionDate =
          resultEditPrescription.prescriptionDate &&
          resultEditPrescription.prescriptionDate.toDate();
        resultEditPrescription.id = queryEditPrescription.docs[0].id;
        setForm(resultEditPrescription);

        const queryCustomer = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(resultEditPrescription.customerId))
          .limit(1)
          .get();

        let resultCustomer = queryCustomer.docs[0].data();
        resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
        resultCustomer.id = queryCustomer.docs[0].id;
        setCustomer(resultCustomer);

        const queryPrescription = await firestore()
          .collection('prescriptions').limit(100)
          .get();

        let resultPrescription = [];
        queryPrescription.forEach((doc) => {
          resultPrescription.push(doc.data());
        });
        setFilteredPrescription(resultPrescription);
        let rX = resultPrescription.filter(
          (word) =>
            word.prescriptionType === resultEditPrescription.prescriptionType
        );

        setPrescription(rX);
        setisLoading(false);
      };
      fetchDetails();
    } else {
      setisLoading(true);

      const id = routeParams.customerId;
      const fetchDetails = async () => {
        const queryCustomer = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(id))
          .limit(1)
          .get();

        let resultCustomer = queryCustomer.docs[0].data();
        resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
        resultCustomer.id = queryCustomer.docs[0].id;
        setCustomer(resultCustomer);

        const queryPrescription = await firestore()
          .collection('prescriptions').limit(100)
          .get();

        let resultPrescription = [];
        queryPrescription.forEach((doc) => {
          resultPrescription.push(doc.data());
        });
        setFilteredPrescription(resultPrescription);

        setisLoading(false);
      };
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParams.customerId]);

  const onSubmit = async () => {
    if (form.prescriptionId) {
      if (form?.fromExamId) {
        toast.error('This Rx is linked to exam. Please update from Exam.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom
        });
        return true
      }
      setisLoading(true);

      try {
        const ref = firestore().collection('prescriptions').doc(form?.id);

        let data = {
          ...form,
          prescriptionDate: firestore.Timestamp.fromDate(form?.prescriptionDate)
        };
        delete data.id;
        await ref.set(data);

        dispatch(
          MessageActions.showMessage({
            message: 'Prescription updated successfully'
          })
        );
        props.history.push(
          `/apps/e-commerce/customers/profile/${form?.customerId}`
        );
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    } else {
      setisLoading(true);

      try {
        const dbConfig = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();

        await firestore()
          .collection('prescriptions')
          .add({
            ...form,
            prescriptionId: dbConfig?.prescriptionId + 1,
            customerId: customer.customerId,
            prescriptionDate: form?.prescriptionDate ? firestore.Timestamp.fromDate(form?.prescriptionDate) : firestore.Timestamp.fromDate(new Date())
          });

        await firestore()
          .collection('customers')
          .doc(customer?.id)
          .update({ recentUpdated: dbConfig?.recentUpdated + 1 });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({
            prescriptionId: dbConfig?.prescriptionId + 1,
            recentUpdated: dbConfig?.recentUpdated + 1
          });
        dispatch(
          MessageActions.showMessage({
            message: 'Prescription Saved Successfully'
          })
        );

        props.history.push(`/apps/e-commerce/customers/profile/${routeParams?.customerId}`);
      } catch (error) {
        console.log(error);
      }
      setisLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const queryPrescription = await firestore()
        .collection('prescriptions')
        .where('prescriptionId', '==', Number(form.prescriptionId))
        .limit(1)
        .get();

      let result = queryPrescription.docs[0].data();
      result.id = queryPrescription.docs[0].id;
      await firestore().collection('prescriptions').doc(result.id).delete();
      dispatch(
        MessageActions.showMessage({
          message: 'Prescription deleted successfully'
        })
      );
      props.history.push(
        `/apps/e-commerce/customers/profile/${form?.customerId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <FuseLoading />;

  return !customer || !filteredPrescription || !prescription ? (
    <></>
  ) : (
    <div className="p-10">
      <div className="py-4 border-1 border-black border-solid rounded-6">
        <div className="flex flex-row justify-center border-b-1 border-black border-solid">
          <h1 className="font-700" style={{ color: '#f15a25' }}>
            {`${routeParams?.customerId ? 'NEW' : 'EDIT'} RX (${customer?.firstName
              } ${customer.lastName})`}
          </h1>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row p-16 sm:p-24 w-full">
            <div className="flex flex-col md:p-8 px-72 w-full md:w-2/5 h-auto justify-around">
              <FormControl component="fieldset">
                <RadioGroup
                  className="ml-6 justify-around"
                  row
                  aria-label="prescriptionType"
                  name="prescriptionType"
                  value={form?.prescriptionType}
                  onChange={handleChange}>
                  <FormControlLabel
                    value="eyeglassesRx"
                    onClick={() => {
                      let eyeglassesRx = filteredPrescription.filter(
                        (word) => word.prescriptionType === 'eyeglassesRx'
                      );

                      setPrescription(eyeglassesRx);
                      setChangeOccured(true);
                    }}
                    control={<Radio />}
                    label="Eyeglasses Rx"
                    disabled={routeParams?.prescriptionId}
                  />
                  <FormControlLabel
                    onClick={() => {
                      let contactLensRx = filteredPrescription.filter(
                        (word) => word.prescriptionType === 'contactLensRx'
                      );

                      setPrescription(contactLensRx);
                      setChangeOccured(true);
                    }}
                    value="contactLensRx"
                    control={<Radio />}
                    label="Contact Lens Rx"
                    disabled={routeParams?.prescriptionId}
                  />
                  <FormControlLabel
                    onClick={() => {
                      setChangeOccured(true);
                    }}
                    value="medicationRx"
                    control={<Radio />}
                    label="Medication Rx"
                    disabled={routeParams?.prescriptionId}
                  />
                </RadioGroup>
              </FormControl>
              <br></br>
              <div className="flex flex-row w-full justify-between">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    // className="ml-24"
                    margin="normal"
                    id="date-picker-dialog"
                    format="MM/dd/yyyy"
                    label="Prescription Date"
                    value={form?.prescriptionDate}
                    onChange={(date) => {
                      handleChange({
                        target: { name: 'prescriptionDate', value: date }
                      });
                    }}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </MuiPickersUtilsProvider>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.onRx}
                      onChange={handleChange}
                      name="onRx"
                    />
                  }
                  label="Outside Rx"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row p-16 sm:p-2">
            {form?.prescriptionType === 'eyeglassesRx' && (
              <FuseAnimate animation="transition.slideRightIn" delay={500}>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row">
                        <div className=" h-auto w-44"></div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">Sphere</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">Cylinder</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">Axis</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">Add</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">Prism</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">VA</h3>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className=" w-44 h-auto border-black border-solid border-1 justify-between">
                          <h3 className="mt-20 text-center font-700">OD</h3>
                        </div>
                        <div className="flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesSphereOd" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesCylinderOd" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesAxisOd" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesAddOd" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesPrismOd" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesVaOd" freeSolo={true} variant='standard' />
                        </div>
                      </div>

                      <div className="flex flex-row">
                        <div className=" w-44 h-auto border-black border-solid border-1 justify-between">
                          <h3 className="mt-20 text-center font-700">OS</h3>
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesSphereOs" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesCylinderOs" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesAxisOs" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesAddOs" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesPrismOs" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesVaOs" freeSolo={true} variant='standard' />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col pl-8 mt-0 w-2/5">
                      <div className="flex flex-row ">
                        <div className=" h-auto w-72">
                          <h3 className="text-center font-700">PD</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">OU</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">OD</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">OS</h3>
                        </div>
                      </div>
                      <div className="flex flex-row ">
                        <div className="py-16 w-72 h-auto border-black border-solid border-1 justify-between">
                          <h3 className="text-center font-700">Distance</h3>
                        </div>
                        <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                          <TextField
                            fullWidth
                            id="standard-basic"
                            value={form?.pdOuDistance}
                            onChange={handleChange}
                            // disabled={disabledState}
                            name={'pdOuDistance'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                          <TextField
                            fullWidth
                            id="standard-basic"
                            value={form?.pdOdDistance}
                            onChange={handleChange}
                            // disabled={disabledState}
                            name={'pdOdDistance'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                          <TextField
                            fullWidth
                            id="standard-basic"
                            value={form?.pdOsDistance}
                            // disabled={disabledState}
                            onChange={handleChange}
                            name={'pdOsDistance'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row ">
                        <div className="py-16 w-72 h-auto border-black border-solid border-1 justify-between">
                          <h3 className="text-center font-700">Near</h3>
                        </div>
                        <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                          <TextField
                            fullWidth
                            id="standard-basic"
                            value={form?.pdOuNear}
                            onChange={handleChange}
                            name={'pdOuNear'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                          <TextField
                            fullWidth
                            id="standard-basic"
                            value={form?.pdOdNear}
                            onChange={handleChange}
                            name={'pdOdNear'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                          <TextField
                            fullWidth
                            id="standard-basic"
                            value={form?.pdOsNear}
                            onChange={handleChange}
                            name={'pdOsNear'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col p-6">
                    <Button
                      className={classes.button}
                      style={{
                        maxHeight: '70px',
                        minHeight: '70px'
                      }}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        if (form) {
                          setOpenAlertOnSave(true);
                        }
                      }}>
                      Save Eyeglasses Rx
                    </Button>

                    <CustomAlert
                      open={openAlertOnSave}
                      setOpen={setOpenAlertOnSave}
                      text1="Save Changes?"
                      text2="Are you sure?"
                      customFunction={onSubmit}
                    />
                  </div>
                  {routeParams?.prescriptionId && (
                    <div className="flex flex-row p-6 md:w-1/3">
                      <Button
                        style={{
                          maxHeight: '70px',
                          minHeight: '70px',
                          color: 'red'
                        }}
                        variant="outlined"
                        onClick={handleDelete}>
                        <Icon>delete</Icon>
                        DELETE RX
                      </Button>
                    </div>
                  )}
                </div>
              </FuseAnimate>
            )}

            {form?.prescriptionType === 'contactLensRx' && (
              <FuseAnimate animation="transition.slideLeftIn" delay={500}>
                <div className="p-16 sm:p-2 w-full">
                  <div className="flex flex-row">
                    <div className=" h-auto flex-1">
                      <h3 className="hidden text-center font-700">Hi</h3>
                    </div>
                    <div className=" h-auto flex-1">
                      <h3 className="text-center font-700">Sphere</h3>
                    </div>
                    <div className=" h-auto flex-1">
                      <h3 className="text-center font-700">Cylinder</h3>
                    </div>
                    <div className=" h-auto flex-1">
                      <h3 className="text-center font-700">Axis</h3>
                    </div>
                    <div className=" h-auto flex-1">
                      <h3 className="text-center font-700">ADD</h3>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <h3 className="mt-20 text-center font-700">OD</h3>
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensSphereOd" freeSolo={true} variant='standard' />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensCylinderOd" freeSolo={true} variant='standard' />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensAxisOd" freeSolo={true} variant='standard' />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensAddOd" freeSolo={true} variant='standard' />
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <h3 className="mt-20 text-center font-700">OS</h3>
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensSphereOs" freeSolo={true} variant='standard' />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensCylinderOs" freeSolo={true} variant='standard' />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensAxisOs" freeSolo={true} variant='standard' />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensAddOs" freeSolo={true} variant='standard' />
                    </div>
                  </div>
                  <div className="flex flex-row p-8 w-2/3 mt-10 justify-around">
                    <div className=" flex-1">
                      <CustomAutocomplete
                        list={prescription}
                        form={form}
                        setForm={setForm}
                        handleChange={handleChange}
                        id="contactLensCompany"
                        freeSolo={true}
                        label="Company"
                      />
                    </div>
                    <div className="pl-8 flex-1">
                      <CustomAutocomplete
                        list={prescription}
                        form={form}
                        setForm={setForm}
                        handleChange={handleChange}
                        id="contactLensModel"
                        freeSolo={true}
                        label="Model"
                      />
                    </div>
                    <div className="pl-8 flex-1">
                      <CustomAutocomplete
                        list={prescription}
                        form={form}
                        setForm={setForm}
                        handleChange={handleChange}
                        id="contactLensModality"
                        freeSolo={true}
                        label="Modality"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col p-6">
                    <Button
                      className={classes.button}
                      style={{
                        maxHeight: '70px',
                        minHeight: '70px'
                      }}
                      variant="contained"
                      onClick={() => {
                        if (form) {
                          setOpenAlertOnSave(true);
                        }
                      }}>
                      Save Contact Lens Rx
                    </Button>
                    <CustomAlert
                      open={openAlertOnSave}
                      setOpen={setOpenAlertOnSave}
                      text1="Save Changes?"
                      text2="Are you sure?"
                      customFunction={onSubmit}
                    />
                  </div>
                  {routeParams?.prescriptionId && (
                    <div className="flex flex-row p-6 md:w-1/3">
                      <Button
                        style={{
                          maxHeight: '70px',
                          minHeight: '70px',
                          color: 'red'
                        }}
                        variant="outlined"
                        onClick={handleDelete}>
                        <Icon>delete</Icon>
                        DELETE RX
                      </Button>
                    </div>
                  )}
                </div>
              </FuseAnimate>
            )}

            {form?.prescriptionType === 'medicationRx' && (
              <FuseAnimate animation="transition.slideLeftIn" delay={500}>
                <div className="p-2 w-full ">
                  <TextField
                    className="mt-10 "
                    fullWidth
                    InputProps={{ style: { fontSize: 20 } }}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    id="outlined-multiline-static"
                    label="Comments"
                    multiline
                    rows={4}
                    value={form?.medicationComments}
                    onChange={handleChange}
                    name={'medicationComments'}
                    variant="outlined"
                  />
                  <div className="flex flex-col p-6">
                    <Button
                      className={classes.button}
                      style={{
                        maxHeight: '70px',
                        minHeight: '70px'
                      }}
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        if (form) {
                          setOpenAlertOnSave(true);
                        }
                      }}>
                      Save Medication Rx
                    </Button>
                    <CustomAlert
                      open={openAlertOnSave}
                      setOpen={setOpenAlertOnSave}
                      text1="Save Changes?"
                      text2="Are you sure?"
                      customFunction={onSubmit}
                    />
                  </div>
                  {routeParams?.prescriptionId && (
                    <div className="flex flex-row p-6 md:w-1/3">
                      <Button
                        style={{
                          maxHeight: '70px',
                          minHeight: '70px',
                          color: 'red'
                        }}
                        variant="outlined"
                        onClick={handleDelete}>
                        <Icon>delete</Icon>
                        DELETE RX
                      </Button>
                    </div>
                  )}
                </div>
              </FuseAnimate>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(AddPrescription);
