import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CustomAlert from '../ReusableComponents/CustomAlert';
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

  const [eyeglassesSphereOdInput, setEyeglassesSphereOdInput] = useState(
    form?.eyeglassesSphereOd
  );
  const [eyeglassesCylinderOdInput, setEyeglassesCylinderOdInput] = useState(
    form?.eyeglassesCylinderOd
  );
  const [eyeglassesAxisOdInput, setEyeglassesAxisOdInput] = useState(
    form?.eyeglassesAxisOd
  );
  const [eyeglassesAddOdInput, setEyeglassesAddOdInput] = useState(
    form?.eyeglassesAddOd
  );
  const [eyeglassesPrismOdInput, setEyeglassesPrismOdInput] = useState(
    form?.eyeglassesPrismOd
  );
  const [eyeglassesVaOdInput, setEyeglassesVaOdInput] = useState(
    form?.eyeglassesVaOd
  );

  const [eyeglassesSphereOsInput, setEyeglassesSphereOsInput] = useState(
    form?.eyeglassesSphereOs
  );
  const [eyeglassesCylinderOsInput, setEyeglassesCylinderOsInput] = useState(
    form?.eyeglassesCylinderOs
  );
  const [eyeglassesAxisOsInput, setEyeglassesAxisOsInput] = useState(
    form?.eyeglassesAxisOs
  );
  const [eyeglassesAddOsInput, setEyeglassesAddOsInput] = useState(
    form?.eyeglassesAddOs
  );
  const [eyeglassesPrismOsInput, setEyeglassesPrismOsInput] = useState(
    form?.eyeglassesPrismOs
  );
  const [eyeglassesVaOsInput, setEyeglassesVaOsInput] = useState(
    form?.eyeglassesVaOs
  );

  const [contactLensSphereOdInput, setContactLensSphereOdInput] = useState(
    form?.contactLensSphereOd
  );
  const [contactLensCylinderOdInput, setContactLensCylinderOdInput] = useState(
    form?.contactLensCylinderOd
  );
  const [contactLensAxisOdInput, setContactLensAxisOdInput] = useState(
    form?.contactLensAxisOd
  );
  const [contactLensAddOdInput, setContactLensAddOdInput] = useState(
    form?.contactLensAddOd
  );
  // const [contactLensDiaOdInput, setContactLensDiaOdInput] = useState(
  //   form?.contactLensDiaOd
  // );
  // const [contactLensBcOdInput, setContactLensBcOdInput] = useState(
  //   form?.contactLensBcOd
  // );

  const [contactLensSphereOsInput, setContactLensSphereOsInput] = useState(
    form?.contactLensSphereOs
  );
  const [contactLensCylinderOsInput, setContactLensCylinderOsInput] = useState(
    form?.contactLensCylinderOs
  );
  const [contactLensAxisOsInput, setContactLensAxisOsInput] = useState(
    form?.contactLensAxisOs
  );
  const [contactLensAddOsInput, setContactLensAddOsInput] = useState(
    form?.contactLensAddOs
  );
  // const [contactLensDiaOsInput, setContactLensDiaOsInput] = useState(
  //   form?.contactLensDiaOs
  // );
  // const [contactLensBcOsInput, setContactLensBcOsInput] = useState(
  //   form?.contactLensBcOs
  // );

  const [contactLensCompanyInput, setContactLensCompanyInput] = useState(
    form?.contactLensCompany
  );
  const [contactLensModelInput, setContactLensModelInput] = useState(
    form?.contactLensModel
  );
  const [contactLensModalityInput, setContactLensModalityInput] = useState(
    form?.contactLensModality
  );

  // function formatPhoneNumber(phoneNumberString) {
  //   var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  //   var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  //   if (match) {
  //     var intlCode = match[1] ? '+1 ' : '';
  //     return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  //   }
  //   return phoneNumberString;
  // }

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
          .collection('prescriptions')
          .get();

        let resultPrescription = [];
        queryPrescription.forEach((doc) => {
          resultPrescription.push(doc.data());
        });
        setFilteredPrescription(resultPrescription);
        let rX = resultPrescription.filter(
          (word) =>
            word.prescriptionType === resultPrescription.prescriptionType
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
          .collection('prescriptions')
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
  if (isLoading) return <FuseLoading />;

  const onSubmit = async () => {
    if (form.prescriptionId) {
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
            prescriptionDate: firestore.Timestamp.fromDate(new Date())
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

        props.history.push('/apps/e-commerce/customers');
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

  return !customer || !filteredPrescription || !prescription ? (
    <></>
  ) : (
    <div className="p-10">
      <div className="py-4 border-1 border-black border-solid rounded-6">
        <div className="flex flex-row justify-center border-b-1 border-black border-solid">
          <h1 className="font-700" style={{ color: '#f15a25' }}>
            {`${routeParams?.customerId ? 'NEW' : 'EDIT'} RX (${
              customer?.firstName
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
                  />
                  <FormControlLabel
                    onClick={() => {
                      setChangeOccured(true);
                    }}
                    value="medicationRx"
                    control={<Radio />}
                    label="Medication Rx"
                  />
                </RadioGroup>
              </FormControl>
              <br></br>
              <div className="flex flex-row w-full justify-center">
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
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesSphereOd
                                    ? item.eyeglassesSphereOd
                                    : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesSphereOd || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesSphereOd}
                            inputValue={eyeglassesSphereOdInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesSphereOdInput(value);
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesSphereOd'
                                }
                              });
                            }}
                            name="eyeglassesSphereOd"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesSphereOd'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesCylinderOd
                                    ? item.eyeglassesCylinderOd
                                    : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesCylinderOd || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesCylinderOd}
                            inputValue={eyeglassesCylinderOdInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesCylinderOdInput(value);
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesCylinderOd'
                                }
                              });
                            }}
                            name="eyeglassesCylinderOd"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesCylinderOd'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesAxisOd
                                    ? item.eyeglassesAxisOd
                                    : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesAxisOd || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesAxisOd}
                            inputValue={eyeglassesAxisOdInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesAxisOdInput(value);
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesAxisOd'
                                }
                              });
                            }}
                            name="eyeglassesAxisOd"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesAxisOd'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesAddOd
                                    ? item.eyeglassesAddOd
                                    : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesAddOd || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesAddOd}
                            inputValue={eyeglassesAddOdInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesAddOdInput(value);
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesAddOd'
                                }
                              });
                            }}
                            name="eyeglassesAddOd"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesAddOd'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesPrismOd
                                    ? item.eyeglassesPrismOd
                                    : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesPrismOd || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesPrismOd}
                            inputValue={eyeglassesPrismOdInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesPrismOdInput(value);
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesPrismOd'
                                }
                              });
                            }}
                            name="eyeglassesPrismOd"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesPrismOd'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesVaOd ? item.eyeglassesVaOd : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesVaOd || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesVaOd}
                            inputValue={eyeglassesVaOdInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesVaOdInput(value);
                              handleChange({
                                target: { value: value, name: 'eyeglassesVaOd' }
                              });
                            }}
                            name="eyeglassesVaOd"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesVaOd'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                      </div>

                      <div className="flex flex-row">
                        <div className=" w-44 h-auto border-black border-solid border-1 justify-between">
                          <h3 className="mt-20 text-center font-700">OS</h3>
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesSphereOs
                                    ? item.eyeglassesSphereOs
                                    : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesSphereOs || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesSphereOs}
                            inputValue={eyeglassesSphereOsInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesSphereOsInput(value);
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesSphereOs'
                                }
                              });
                            }}
                            name="eyeglassesSphereOs"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesSphereOs'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesCylinderOs
                                    ? item.eyeglassesCylinderOs
                                    : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesCylinderOs || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesCylinderOs}
                            inputValue={eyeglassesCylinderOsInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesCylinderOsInput(value);
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesCylinderOs'
                                }
                              });
                            }}
                            name="eyeglassesCylinderOs"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesCylinderOs'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesAxisOs
                                    ? item.eyeglassesAxisOs
                                    : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesAxisOs || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesAxisOs}
                            inputValue={eyeglassesAxisOsInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesAxisOsInput(value);
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesAxisOs'
                                }
                              });
                            }}
                            name="eyeglassesAxisOs"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesAxisOs'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesAddOs
                                    ? item.eyeglassesAddOs
                                    : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesAddOs || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesAddOs}
                            inputValue={eyeglassesAddOsInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesAddOsInput(value);
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesAddOs'
                                }
                              });
                            }}
                            name="eyeglassesAddOs"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesAddOs'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesPrismOs
                                    ? item.eyeglassesPrismOs
                                    : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesPrismOs || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesPrismOs}
                            inputValue={eyeglassesPrismOsInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesPrismOsInput(value);
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesPrismOs'
                                }
                              });
                            }}
                            name="eyeglassesPrismOs"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesPrismOs'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <Autocomplete
                            options={[
                              ...new Set(
                                prescription.map((item) =>
                                  item.eyeglassesVaOs ? item.eyeglassesVaOs : ''
                                )
                              )
                            ]}
                            getOptionLabel={(option) =>
                              option?.eyeglassesVaOs || option
                            }
                            id="prescriptionId"
                            value={form?.eyeglassesVaOs}
                            inputValue={eyeglassesVaOsInput}
                            freeSolo
                            onInputChange={(e, value) => {
                              setEyeglassesVaOsInput(value);
                              handleChange({
                                target: { value: value, name: 'eyeglassesVaOs' }
                              });
                            }}
                            name="eyeglassesVaOs"
                            onChange={(_, value) =>
                              handleChange({
                                target: {
                                  value: value,
                                  name: 'eyeglassesVaOs'
                                }
                              })
                            }
                            renderInput={(params) => (
                              <TextField {...params} margin="normal" />
                            )}
                          />
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
                            // disabled={disabledState}
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
                            // disabled={disabledState}
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
                            // disabled={disabledState}
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
                    {/* <div className=" h-auto flex-1">
                      <h3 className="text-center font-700">DIA</h3>
                    </div>
                    <div className=" h-auto flex-1">
                      <h3 className="text-center font-700">BC</h3>
                    </div> */}
                  </div>
                  <div className="flex flex-row">
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <h3 className="mt-20 text-center font-700">OD</h3>
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensSphereOd
                                ? item.contactLensSphereOd
                                : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensSphereOd || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensSphereOd}
                        inputValue={contactLensSphereOdInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensSphereOdInput(value);
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensSphereOd'
                            }
                          });
                        }}
                        name="contactLensSphereOd"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensSphereOd'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensCylinderOd
                                ? item.contactLensCylinderOd
                                : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensCylinderOd || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensCylinderOd}
                        inputValue={contactLensCylinderOdInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensCylinderOdInput(value);
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensCylinderOd'
                            }
                          });
                        }}
                        name="contactLensCylinderOd"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensCylinderOd'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensAxisOd
                                ? item.contactLensAxisOd
                                : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensAxisOd || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensAxisOd}
                        inputValue={contactLensAxisOdInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensAxisOdInput(value);
                          handleChange({
                            target: { value: value, name: 'contactLensAxisOd' }
                          });
                        }}
                        name="contactLensAxisOd"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensAxisOd'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensAddOd ? item.contactLensAddOd : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensAddOd || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensAddOd}
                        inputValue={contactLensAddOdInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensAddOdInput(value);
                          handleChange({
                            target: { value: value, name: 'contactLensAddOd' }
                          });
                        }}
                        name="contactLensAddOd"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensAddOd'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    {/* <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensDiaOd ? item.contactLensDiaOd : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensDiaOd || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensDiaOd}
                        inputValue={contactLensDiaOdInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensDiaOdInput(value);
                          handleChange({
                            target: { value: value, name: 'contactLensDiaOd' }
                          });
                        }}
                        name="contactLensDiaOd"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensDiaOd'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div> */}
                    {/* <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensBcOd ? item.contactLensBcOd : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensBcOd || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensBcOd}
                        inputValue={contactLensBcOdInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensBcOdInput(value);
                          handleChange({
                            target: { value: value, name: 'contactLensBcOd' }
                          });
                        }}
                        name="contactLensBcOd"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensBcOd'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div> */}
                  </div>

                  <div className="flex flex-row">
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <h3 className="mt-20 text-center font-700">OS</h3>
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensSphereOs
                                ? item.contactLensSphereOs
                                : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensSphereOs || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensSphereOs}
                        inputValue={contactLensSphereOsInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensSphereOsInput(value);
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensSphereOs'
                            }
                          });
                        }}
                        name="contactLensSphereOs"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensSphereOs'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensCylinderOs
                                ? item.contactLensCylinderOs
                                : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensCylinderOs || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensCylinderOs}
                        inputValue={contactLensCylinderOsInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensCylinderOsInput(value);
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensCylinderOs'
                            }
                          });
                        }}
                        name="contactLensCylinderOs"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensCylinderOs'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensAxisOs
                                ? item.contactLensAxisOs
                                : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensAxisOs || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensAxisOs}
                        inputValue={contactLensAxisOsInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensAxisOsInput(value);
                          handleChange({
                            target: { value: value, name: 'contactLensAxisOs' }
                          });
                        }}
                        name="contactLensAxisOs"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensAxisOs'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensAddOs ? item.contactLensAddOs : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensAddOs || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensAddOs}
                        inputValue={contactLensAddOsInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensAddOsInput(value);
                          handleChange({
                            target: { value: value, name: 'contactLensAddOs' }
                          });
                        }}
                        name="contactLensAddOs"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensAddOs'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    {/* <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensDiaOs ? item.contactLensDiaOs : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensDiaOs || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensDiaOs}
                        inputValue={contactLensDiaOsInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensDiaOsInput(value);
                          handleChange({
                            target: { value: value, name: 'contactLensDiaOs' }
                          });
                        }}
                        name="contactLensDiaOs"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensDiaOs'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div> */}
                    {/* <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensBcOs ? item.contactLensBcOs : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensBcOs || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensBcOs}
                        inputValue={contactLensBcOsInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensBcOsInput(value);
                          handleChange({
                            target: { value: value, name: 'contactLensBcOs' }
                          });
                        }}
                        name="contactLensBcOs"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensBcOs'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            type="number"
                            margin="normal"
                          />
                        )}
                      />
                    </div> */}
                  </div>
                  <div className="flex flex-row p-8 w-2/3 mt-10 justify-around">
                    <div className=" flex-1">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensCompany
                                ? item.contactLensCompany
                                : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensCompany || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensCompany}
                        inputValue={contactLensCompanyInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensCompanyInput(value);
                          handleChange({
                            target: { value: value, name: 'contactLensCompany' }
                          });
                        }}
                        name="contactLensCompany"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensCompany'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Company"
                            variant="outlined"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className="pl-8 flex-1">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensModel ? item.contactLensModel : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensModel || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensModel}
                        inputValue={contactLensModelInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensModelInput(value);
                          handleChange({
                            target: { value: value, name: 'contactLensModel' }
                          });
                        }}
                        name="contactLensModel"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensModel'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Model"
                            margin="normal"
                          />
                        )}
                      />
                    </div>
                    <div className="pl-8 flex-1">
                      <Autocomplete
                        options={[
                          ...new Set(
                            prescription.map((item) =>
                              item.contactLensModality
                                ? item.contactLensModality
                                : ''
                            )
                          )
                        ]}
                        getOptionLabel={(option) =>
                          option?.contactLensModality || option
                        }
                        id="prescriptionId"
                        value={form?.contactLensModality}
                        inputValue={contactLensModalityInput}
                        freeSolo
                        onInputChange={(e, value) => {
                          setContactLensModalityInput(value);
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensModality'
                            }
                          });
                        }}
                        name="contactLensModality"
                        onChange={(_, value) =>
                          handleChange({
                            target: {
                              value: value,
                              name: 'contactLensModality'
                            }
                          })
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Modality"
                            margin="normal"
                          />
                        )}
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
