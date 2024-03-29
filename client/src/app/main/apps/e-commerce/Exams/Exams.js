import { firestore, storage } from 'firebase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { toast, Zoom } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import Assessment from './Assessment';
import Button from '@material-ui/core/Button';
import ChiefComplaints from './ChiefComplaints';
import CustomAutocomplete from '../ReusableComponents/Autocomplete';
import CustomerInfo from './CustomerInfo';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DilationDetails from './DilationDetails';
import DoctorSignature from './DoctorSignature';
import FundusExam from './FundusExam';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import GlassesDetails from './GlassesDetails';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LensDetails from './LensDetails';
import MedicalOcularHistory from './MedicalOcularHistory';
import moment from 'moment';
import PeripheralRetina from './PeripheralRetina';
import PupilsDetails from './PupilsDetails';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import SlitLampExam from './SlitLampExam';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import VisualAcuity from './VisualAcuity';
import withReducer from 'app/store/withReducer';
import ImageSlider from '../ReusableComponents/ImageSlider';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  buttonBlack: {
    backgroundColor: '#000000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#000000',
      color: '#fff'
    }
  }
}));

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

function Exams(props) {
  const routeParams = useParams();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [disabledState, setDisabledState] = useState(false);
  const { form, handleChange, setForm } = useForm(null);
  const [showRooms, setShowRooms] = useState();
  const [doctors, setDoctors] = useState();
  const [images, setImages] = useState([])
  const [imageIndex, setImageIndex] = useState(0)
  const [openImageSlider, setOpenImageSlider] = useState(false)
  const dispatch = useDispatch();
  const classes = useStyles();
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    if (userData?.userRole === 'staff' && showRooms?.length > 0 && !form?.locationName) {
      const userShowroom = showRooms.filter((location) => location?.showRoomId === userData?.showRoomId)
      if (userShowroom?.length > 0) setForm({ ...form, locationName: userShowroom?.[0]?.locationName })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, showRooms])

  useEffect(() => {
    setisLoading(true);
    if (routeParams.customerId) {
      const id = routeParams.customerId;
      const fetchCustomer = async () => {
        const query = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(id))
          .limit(1)
          .get();

        let result = query.docs[0].data();
        result.dob = result.dob && result.dob.toDate();
        result.id = query.docs[0].id;
        setCustomer(result);

        const queryShowroom = await firestore().collection('showRooms').get();
        let showroomdata = [];
        queryShowroom.forEach((doc) => {
          showroomdata.push(doc.data());
        });
        setShowRooms(showroomdata);

        const queryDoctors = await firestore().collection('doctors').get();
        let doctorsData = [];
        queryDoctors.forEach((doc) => {
          doctorsData.push(doc.data());
        });
        if (userData?.userRole === 'staff' && doctorsData?.length > 0) {
          setDoctors(doctorsData.filter((obj) => {
            return obj.showrooms?.some((showroom) => showroom.showRoomId === userData?.showRoomId);
          }))
        } else {
          setDoctors(doctorsData);
        }

        setisLoading(false);
      };
      fetchCustomer();
    } else {
      const examId = routeParams.examId;
      setDisabledState(true);
      const fetchExam = async () => {
        const query1 = await firestore()
          .collection('exams')
          .where('examId', '==', Number(examId))
          .limit(1)
          .get();

        let result1 = query1.docs[0].data();
        result1.examTime = result1.examTime && result1.examTime.toDate();
        result1.bpTime = result1.bpTime && result1.bpTime.toDate();
        result1.id = query1.docs[0].id;

        setForm(result1);
        setImages(result1?.images)
        const query = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(result1.customerId))
          .limit(1)
          .get();

        let result = query.docs[0].data();
        result.dob = result.dob && result.dob.toDate();
        result.id = query.docs[0].id;
        setCustomer(result);

        let showroomdata = [];
        const queryShowroom = await firestore().collection('showRooms').get();

        queryShowroom.forEach((doc) => {
          showroomdata.push(doc.data());
        });
        setShowRooms(showroomdata);

        const queryDoctors = await firestore().collection('doctors').get();
        let doctorsData = [];
        queryDoctors.forEach((doc) => {
          doctorsData.push(doc.data());
        });
        if (userData?.userRole === 'staff' && doctorsData?.length > 0) {
          setDoctors(doctorsData.filter((obj) => {
            return obj.showrooms?.some((showroom) => showroom.showRoomId === userData?.showRoomId);
          }))
        } else {
          setDoctors(doctorsData);
        }

        setisLoading(false);
      };

      fetchExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <FuseLoading />;

  const onSubmit = async () => {
    if (!form?.locationName || !form?.fullName) {
      toast.error('Showroom and Doctor is mandatory', {
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
    if (!form?.docSign) {
      toast.error('Doctor sign is mandatory', {
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
      if (form?.id) {

        let uploadedImageUrls = [];
        for (let img of images) {
          if (img.file) {
            await storage().ref(`images/${img.id}`).put(img.file);

            const url = await storage()
              .ref('images')
              .child(img.id)
              .getDownloadURL();
            uploadedImageUrls.push({ url, name: img.name });

            continue;
          }
          uploadedImageUrls.push({ url: img.url, name: img.name });
        }
        await firestore()
          .collection('exams').doc(form?.id)
          .set({
            ...form,
            examTime: form?.examTime ? firestore.Timestamp.fromDate(form?.examTime) : firestore.Timestamp.fromDate(new Date()),
            bpTime: form?.bpTime ? firestore.Timestamp.fromDate(form?.bpTime) : firestore.Timestamp.fromDate(new Date()),
            customerId: customer.customerId,
            email: customer?.email ? customer?.email : '',
            lastName: customer?.lastName ? customer?.lastName : '',
            showRoomId: checkShowroomId(form?.locationName),
            doctorId: checkDoctorId(form?.fullName),
            editDate: firestore.Timestamp.fromDate(new Date()),
            images: uploadedImageUrls
          });
        await checkAndUpdatePrescriptions(uploadedImageUrls)

        dispatch(
          MessageActions.showMessage({
            message: 'Exam Details updated successfully'
          })
        );
      } else {
        const dbConfig = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();

        let uploadedImageUrls = [];
        for (let img of images) {
          await storage().ref(`images/${img.id}`).put(img.file);

          const url = await storage()
            .ref('images')
            .child(img.id)
            .getDownloadURL();
          uploadedImageUrls.push({ url, name: img.name });
        }
        await firestore()
          .collection('exams')
          .add({
            ...form,
            examTime: form?.examTime ? firestore.Timestamp.fromDate(form?.examTime) : firestore.Timestamp.fromDate(new Date()),
            bpTime: form?.bpTime ? firestore.Timestamp.fromDate(form?.bpTime) : firestore.Timestamp.fromDate(new Date()),
            examId: dbConfig?.examId + 1,
            customerId: customer.customerId,
            email: customer?.email ? customer?.email : '',
            lastName: customer?.lastName ? customer?.lastName : '',
            showRoomId: checkShowroomId(form?.locationName),
            doctorId: checkDoctorId(form?.fullName),
            creationDate: firestore.Timestamp.fromDate(new Date()),
            editDate: firestore.Timestamp.fromDate(new Date()),
            images: uploadedImageUrls
          });

        await firestore()
          .collection('customers')
          .doc(customer.id)
          .update({
            lastExam: firestore.Timestamp.fromDate(form?.examTime || new Date()),
            medicalHistory: customer?.medicalHistory
              ? customer?.medicalHistory
              : '',
            recentUpdated: dbConfig?.recentUpdated + 1
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({
            examId: dbConfig?.examId + 1,
            recentUpdated: dbConfig?.recentUpdated + 1
          });

        await firestore()
          .collection('prescriptions')
          .add({
            prescriptionType: 'eyeglassesRx',
            eyeglassesSphereOd: form?.egRxOdSphere ? form?.egRxOdSphere : '',
            eyeglassesCylinderOd: form?.egRxOdCylinder ? form?.egRxOdCylinder : '',
            eyeglassesAxisOd: form?.egRxOdAxis ? form?.egRxOdAxis : '',
            eyeglassesAddOd: form?.egRxOdAdd ? form?.egRxOdAdd : '',
            eyeglassesPrismOd: form?.egRxOdPrismBase ? form?.egRxOdPrismBase : '',
            eyeglassesVaOd: form?.egRxOdVa1 ? form?.egRxOdVa1 : '',
            eyeglassesVaOd2: form?.egRxOdVa2 ? form?.egRxOdVa2 : '',
            eyeglassesSphereOs: form?.egRxOsSphere ? form?.egRxOsSphere : '',
            eyeglassesCylinderOs: form?.egRxOsCylinder ? form?.egRxOsCylinder : '',
            eyeglassesAxisOs: form?.egRxOsAxis ? form?.egRxOsAxis : '',
            eyeglassesAddOs: form?.egRxOsAdd ? form?.egRxOsAdd : '',
            eyeglassesPrismOs: form?.egRxOsPrismBase ? form?.egRxOsPrismBase : '',
            eyeglassesVaOs: form?.egRxOsVa1 ? form?.egRxOsVa1 : '',
            eyeglassesVaOs2: form?.egRxOsVa2 ? form?.egRxOsVa2 : '',
            eyeglassesmemo: form?.egrxMemo ? form?.egrxMemo : '',
            prescriptionId: dbConfig?.prescriptionId + 1,
            customerId: customer.customerId,
            prescriptionDate: firestore.Timestamp.fromDate(new Date()),
            fromExamId: dbConfig?.examId + 1,
            showRoomId: checkShowroomId(form?.locationName),
            doctorId: checkDoctorId(form?.fullName),
            docSign: form?.docSign,
            images: uploadedImageUrls
          });

        await firestore()
          .collection('prescriptions')
          .add({
            prescriptionType: 'contactLensRx',
            contactLensSphereOd: form?.clrxOdSphere ? form?.clrxOdSphere : '',
            contactLensCylinderOd: form?.clrxOdCylinder ? form?.clrxOdCylinder : '',
            contactLensAxisOd: form?.clrxOdAxis ? form?.clrxOdAxis : '',
            contactLensDiaOd: form?.clrxOdDia ? form?.clrxOdDia : '',
            contactLensBcOd: form?.clrxOdBc ? form?.clrxOdBc : '',
            contactLensAddOd: form?.clrxOdAdd ? form?.clrxOdAdd : '',
            contactLensSphereOs: form?.clrxOsSphere ? form?.clrxOsSphere : '',
            contactLensCylinderOs: form?.clrxOsCylinder ? form?.clrxOsCylinder : '',
            contactLensAxisOs: form?.clrxOsAxis ? form?.clrxOsAxis : '',
            contactLensDiaOs: form?.clrxOsDia ? form?.clrxOsDia : '',
            contactLensBcOs: form?.clrxOsBc ? form?.clrxOsBc : '',
            contactLensAddOs: form?.clrxOsAdd ? form?.clrxOsAdd : '',
            contactLensModelOd: form?.clrxOdModel ? form?.clrxOdModel : '',
            contactLensModelOs: form?.clrxOsModel ? form?.clrxOsModel : '',
            contactLensBrandOd: form?.clrxOdBrand ? form?.clrxOdBrand : '',
            contactLensBrandOs: form?.clrxOsBrand ? form?.clrxOsBrand : '',
            contactLensMemo: form?.clrxMemo ? form?.clrxMemo : '',
            prescriptionId: dbConfig?.prescriptionId + 2,
            customerId: customer.customerId,
            prescriptionDate: firestore.Timestamp.fromDate(new Date()),
            fromExamId: dbConfig?.examId + 1,
            showRoomId: checkShowroomId(form?.locationName),
            doctorId: checkDoctorId(form?.fullName),
            docSign: form?.docSign,
            images: uploadedImageUrls
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({ prescriptionId: dbConfig?.prescriptionId + 2 });

        dispatch(
          MessageActions.showMessage({
            message: 'Exam Details saved successfully'
          })
        );

      }
      props.history.push(`/apps/e-commerce/customers/profile/${customer?.customerId}`);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const checkAndUpdatePrescriptions = async (uploadedImageUrls) => {
    const queryEgPrescription = await firestore()
      .collection('prescriptions').where('fromExamId', '==', Number(routeParams?.examId))
      .where('prescriptionType', '==', 'eyeglassesRx').limit(1).get();

    if (!queryEgPrescription.empty) {
      const egPrescriptionId = queryEgPrescription.docs[0].id
      await firestore().collection('prescriptions').doc(egPrescriptionId).update({
        eyeglassesSphereOd: form?.egRxOdSphere ? form?.egRxOdSphere : '',
        eyeglassesCylinderOd: form?.egRxOdCylinder ? form?.egRxOdCylinder : '',
        eyeglassesAxisOd: form?.egRxOdAxis ? form?.egRxOdAxis : '',
        eyeglassesAddOd: form?.egRxOdAdd ? form?.egRxOdAdd : '',
        eyeglassesPrismOd: form?.egRxOdPrismBase ? form?.egRxOdPrismBase : '',
        eyeglassesVaOd: form?.egRxOdVa1 ? form?.egRxOdVa1 : '',
        eyeglassesVaOd2: form?.egRxOdVa2 ? form?.egRxOdVa2 : '',
        eyeglassesSphereOs: form?.egRxOsSphere ? form?.egRxOsSphere : '',
        eyeglassesCylinderOs: form?.egRxOsCylinder ? form?.egRxOsCylinder : '',
        eyeglassesAxisOs: form?.egRxOsAxis ? form?.egRxOsAxis : '',
        eyeglassesAddOs: form?.egRxOsAdd ? form?.egRxOsAdd : '',
        eyeglassesPrismOs: form?.egRxOsPrismBase ? form?.egRxOsPrismBase : '',
        eyeglassesVaOs: form?.egRxOsVa1 ? form?.egRxOsVa1 : '',
        eyeglassesVaOs2: form?.egRxOsVa2 ? form?.egRxOsVa2 : '',
        eyeglassesmemo: form?.egrxMemo ? form?.egrxMemo : '',
        prescriptionDate: firestore.Timestamp.fromDate(new Date()),
        showRoomId: checkShowroomId(form?.locationName),
        doctorId: checkDoctorId(form?.fullName),
        docSign: form?.docSign,
        images: uploadedImageUrls
      })
    }

    const queryClPrescription = await firestore()
      .collection('prescriptions').where('fromExamId', '==', Number(routeParams?.examId))
      .where('prescriptionType', '==', 'contactLensRx').limit(1).get();

    if (!queryClPrescription.empty) {
      const clPrescriptionId = queryClPrescription.docs[0].id
      await firestore().collection('prescriptions').doc(clPrescriptionId).update({
        contactLensSphereOd: form?.clrxOdSphere ? form?.clrxOdSphere : '',
        contactLensCylinderOd: form?.clrxOdCylinder ? form?.clrxOdCylinder : '',
        contactLensAxisOd: form?.clrxOdAxis ? form?.clrxOdAxis : '',
        contactLensDiaOd: form?.clrxOdDia ? form?.clrxOdDia : '',
        contactLensBcOd: form?.clrxOdBc ? form?.clrxOdBc : '',
        contactLensAddOd: form?.clrxOdAdd ? form?.clrxOdAdd : '',
        contactLensSphereOs: form?.clrxOsSphere ? form?.clrxOsSphere : '',
        contactLensCylinderOs: form?.clrxOsCylinder ? form?.clrxOsCylinder : '',
        contactLensAxisOs: form?.clrxOsAxis ? form?.clrxOsAxis : '',
        contactLensDiaOs: form?.clrxOsDia ? form?.clrxOsDia : '',
        contactLensBcOs: form?.clrxOsBc ? form?.clrxOsBc : '',
        contactLensAddOs: form?.clrxOsAdd ? form?.clrxOsAdd : '',
        contactLensModelOd: form?.clrxOdModel ? form?.clrxOdModel : '',
        contactLensModelOs: form?.clrxOsModel ? form?.clrxOsModel : '',
        contactLensBrandOd: form?.clrxOdBrand ? form?.clrxOdBrand : '',
        contactLensBrandOs: form?.clrxOsBrand ? form?.clrxOsBrand : '',
        contactLensMemo: form?.clrxMemo ? form?.clrxMemo : '',
        prescriptionDate: firestore.Timestamp.fromDate(new Date()),
        showRoomId: checkShowroomId(form?.locationName),
        doctorId: checkDoctorId(form?.fullName),
        docSign: form?.docSign,
        images: uploadedImageUrls
      })
    }
    return true

  }

  const handleDelete = async () => {
    setisLoading(true)
    await firestore().collection('exams').doc(form?.id).delete()
    const queryPrescriptions = await firestore().collection('prescriptions').where('fromExamId', '==', Number(routeParams?.examId)).get()
    if (!queryPrescriptions.empty) {
      queryPrescriptions.forEach(async (pres) => {
        let id = pres.id
        await firestore().collection('prescriptions').doc(id).delete()
      })
    }

    dispatch(
      MessageActions.showMessage({
        message: 'Exam deleted successfully'
      })
    );

    props.history.push(`/apps/e-commerce/customers/profile/${customer?.customerId}`);

    setisLoading(false)
  }

  const checkShowroomId = (value) => {
    const room = showRooms?.find((room) => room?.locationName === value);
    if (room) {
      return room?.showRoomId
    }
  };

  const checkDoctorId = (value) => {
    const doctor = doctors?.find((doc) => doc?.fullName === value);
    if (doctor) {
      return doctor?.doctorId
    }
  };


  return (
    <FusePageCarded
      header={
        <div className='flex flex-row w-full h-128'>
          <div className='w-1/3'>
            <IconButton
              onClick={() => {
                if ((!form && !disabledState) || (disabledState)) {
                  props.history.push(`/apps/e-commerce/customers/profile/${customer?.customerId}`);
                } else {
                  setOpenAlert(true);
                }
              }}>
              <Icon className="text-20">arrow_back</Icon>
              <span className="mx-4 text-12">Customer's Profile</span>
            </IconButton>
            <div className="date-picker w-full flex flex-row gap-10 justify-start p-10">
              <StyledDatePicker
                id="date"
                label="Creation Date"
                type="date"
                variant="outlined"
                style={{ border: 'none' }}
                value={form?.creationDate ? moment(form?.creationDate.toDate()).format('YYYY-MM-DD') : ''}
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
                value={form?.editDate ? moment(form?.editDate.toDate()).format('YYYY-MM-DD') : ''}
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
            <div>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={openAlert}
                onClose={handleCloseAlert}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  <h2>Discard Changes?</h2>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    All the Changes will be lost. Are you sure?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAlert} color="secondary">
                    Disagree
                  </Button>
                  <Button
                    onClick={() => {
                      handleCloseAlert();
                      props.history.push(`/apps/e-commerce/customers/profile/${customer?.customerId}`);
                    }}
                    color="secondary"
                    autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <div className='flex flex-row justify-center w-1/3'>
            <Typography
              className="flex mx-0 sm:mx-12 uppercase"
              style={{ fontSize: '3rem', fontWeight: 600 }}
              variant="h6">
              {form?.examId ? 'VIEW EXAM' : 'NEW EXAM'}
            </Typography>
          </div>
          <div className='flex flex-row w-1/3 justify-end pr-8 gap-10 items-end mb-36'>
            <div className='flex flex-col items-end'>
              {!disabledState &&
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={onSubmit}
                  color="secondary"
                  size="small"
                >
                  Save
                </Button>}
              {disabledState &&
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => {
                    if (userData.userRole === 'admin' || userData?.examsEdit) {
                      setDisabledState(false)
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
                  color="secondary"
                  size="small"
                >
                  Edit
                </Button>}
            </div>
            {disabledState &&
              <div className='flex flex-col items-end'>
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => {
                    if (userData.userRole === 'admin' || userData?.examsDelete) {
                      handleDelete()
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
                  color="secondary"
                  size="small"
                >
                  Delete
                </Button>
              </div>
            }
          </div>
        </div>
      }
      content={
        <div className="flex flex-col w-full">
          <div className='flex flex-row px-16 py-6 w-full'>
            <div className='flex flex-col w-1/2'>
              <CustomAutocomplete
                list={showRooms}
                form={form}
                setForm={setForm}
                handleChange={handleChange}
                id="locationName"
                freeSolo={false}
                label="Select Showroom"
                disabled={disabledState || userData?.userRole === 'staff'}
              />
            </div>
            <div className='flex flex-col w-1/2 ml-10'>
              <CustomAutocomplete
                list={doctors}
                form={form}
                setForm={setForm}
                handleChange={handleChange}
                id="fullName"
                freeSolo={false}
                label="Select Doctor"
                disabled={disabledState}
              />
            </div>

          </div>
          <CustomerInfo form={form} handleChange={handleChange} customer={customer} formatPhoneNumber={formatPhoneNumber}
            disabledState={disabledState} setCustomer={setCustomer} />
          <MedicalOcularHistory form={form} handleChange={handleChange} disabledState={disabledState} />
          <ChiefComplaints form={form} handleChange={handleChange} disabledState={disabledState} />
          <GlassesDetails form={form} handleChange={handleChange} disabledState={disabledState} />
          <LensDetails form={form} handleChange={handleChange} disabledState={disabledState} />
          <VisualAcuity form={form} setForm={setForm} handleChange={handleChange} disabledState={disabledState} />
          <PupilsDetails form={form} handleChange={handleChange} disabledState={disabledState} />
          <SlitLampExam form={form} handleChange={handleChange} disabledState={disabledState} setForm={setForm} />
          <FundusExam form={form} handleChange={handleChange} disabledState={disabledState} setForm={setForm} />
          <DilationDetails form={form} handleChange={handleChange} disabledState={disabledState} />
          <PeripheralRetina form={form} handleChange={handleChange} disabledState={disabledState} setForm={setForm} />
          <Assessment form={form} handleChange={handleChange} disabledState={disabledState} />


          <div className="flex flex-col h-260 px-16 py-6">
            <div className="flex flex-col h-260 py-6">
              <div className="flex flex-col h-full py-4 border border-black rounded-6">
                <div className="flex justify-center border-b border-black">
                  <h1 className="font-bold" style={{ color: '#f15a25' }}>
                    PROGNOSIS
                  </h1>
                </div>
                <div className="flex flex-row p-10">
                  <TextField
                    fullWidth
                    InputProps={{ style: { fontSize: 14 } }}
                    id="outlined-multiline-static"
                    multiline
                    disabled={disabledState}
                    minRows={4}
                    value={form?.examPrognosis}
                    onChange={handleChange}
                    name={'examPrognosis'}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full py-5 border border-black rounded-6">
              <div className="flex justify-center border-b border-black">
                <h1 className="font-bold" style={{ color: '#f15a25' }}>
                  DOCTOR SIGNATURE
                </h1>
              </div>
              <div className="flex justify-center p-16 sm:p-24 w-full min-w-800">
                <DoctorSignature form={form} setForm={setForm} handleChange={handleChange} disabledState={disabledState} />
              </div>
            </div>
          </div>


          <div className="flex flex-col px-16 py-6">
            <div className="flex flex-col h-full border border-black rounded-6 py-6">
              <div className="flex justify-center border-b border-black">
                <h1 className="font-bold" style={{ color: '#f15a25' }}>
                  ADDITIONAL PICTURES
                </h1>
              </div>
              <div className="flex flex-col w-full">
              <ImageSlider open={openImageSlider} handleClose={() => setOpenImageSlider(false)} images={images?.length > 0 ? images.map((img) => img.url) : []} imageIndex={imageIndex} />
                <div className="flex flex-row w-full overflow-scroll flex-wrap p-16">
                  {images?.length > 0 && images.map((img, index) => (
                    <div className="mb-8 w-224 mr-6 object-contain">
                      <img
                        className="w-224 h-128 shadow-1 rounded-4"
                        onClick={() => {
                          setImageIndex(index)
                          setOpenImageSlider(true)
                        }}
                        src={img.url}
                        key={img.name}
                        alt={''}
                      />
                      <div className="flex flex-row justify-between items-center">
                        <div className="truncate">
                          <TextField
                            className="mt-12 "
                            fullWidth
                            disabled={disabledState}
                            id="outlined-multiline-static"
                            value={images[index].name.split('.', 1)}
                            onChange={(e) => {
                              let newImages = images;
                              newImages[index].name = e.target.value;
                              setImages([...newImages]);
                            }}
                            variant="outlined"
                          />
                        </div>

                        <IconButton
                          onClick={() => {
                            let newImages = images;
                            newImages.splice(index, 1);
                            setImages([...newImages]);
                          }}
                          aria-label="delete"
                          disabled={disabledState}
                          className={classes.margin}>
                          <DeleteIcon
                            style={{ color: red[500] }}
                            fontSize="small"
                          />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
                <label htmlFor="upload-photo1">
                  <input
                    style={{ display: 'none' }}
                    id="upload-photo1"
                    type="file"
                    accept="image/*"
                    onClick={(event) => {
                      event.target.value = '';
                    }}
                    onChange={(e) =>
                      setImages([
                        ...images,
                        {
                          name: e.target.files[0].name,
                          id: uuidv4(),
                          url: URL.createObjectURL(e.target.files[0]),
                          file: e.target.files[0]
                        }
                      ])
                    }
                  />
                  <div className="flex flex-col p-12 w-full">
                    <Button
                      className={classes.buttonBlack}
                      style={{
                        maxHeight: '50px',
                        minHeight: '50px',
                      }}
                      variant="contained"
                      component="span"
                      disabled={disabledState}
                      color="secondary">
                      <AddIcon /> UPLOAD PHOTO
                    </Button>
                  </div>
                </label>
              </div>
            </div>
          </div>

        </div >
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Exams);
