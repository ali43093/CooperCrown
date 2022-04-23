import { Fab } from '@material-ui/core';
import { firestore, storage } from 'firebase';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import reducer from '../store/reducers';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import CustomAlert from '../ReusableComponents/CustomAlert';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {}
}));

function AddInsurance(props) {
  const classes = useStyles();
  const { form, handleChange, setForm } = useForm(null);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [insurances, setInsurances] = useState([]);
  const [insuranceCompanyInput, setInsuranceCompanyInput] = useState(
    form?.insuranceCompany
  );
  const [openAlertOnBack, setOpenAlertOnBack] = useState(false);

  useEffect(() => {
    if (routeParams.insuranceId) {
      setisLoading(true);
      const insuranceId = routeParams.insuranceId;
      const fetchInsurance = async () => {
        const queryEditInsurance = await firestore()
          .collection('insurances')
          .where('insuranceId', '==', Number(insuranceId))
          .limit(1)
          .get();
        let resultEditInsurance = queryEditInsurance.docs[0].data();
        resultEditInsurance.id = queryEditInsurance.docs[0].id;
        setForm(resultEditInsurance);
        setImages(resultEditInsurance.images.urls);
        setisLoading(false);
      };
      fetchInsurance();
    } else {
      setisLoading(true);

      const fetchInsurance = async () => {
        const queryInsurances = await firestore()
          .collection('insurances')
          .get();

        let resultInsurances = [];
        queryInsurances.forEach((doc) => {
          resultInsurances.push(doc.data());
        });

        let resArr = [];
        resultInsurances.filter(function (item) {
          var i = resArr.findIndex(
            (x) => x.insuranceCompany === item.insuranceCompany
          );
          if (i <= -1) {
            resArr.push(item);
          }
          return null;
        });

        setInsurances(resArr);
        setForm({});
        setisLoading(false);
      };
      fetchInsurance();
    }
  }, [routeParams.customerId]);
  if (isLoading) return <FuseLoading />;

  const onSubmit = async () => {
    if (form.insuranceId) {
      setisLoading(true);

      try {
        const ref = firestore().collection('insurances').doc(form?.id);
        let urls = [];
        for (let img of images) {
          if (img.file) {
            await storage().ref(`images/${img.id}`).put(img.file);

            const url = await storage()
              .ref('images')
              .child(img.id)
              .getDownloadURL();
            urls.push({ url, name: img.name });

            continue;
          }
          urls.push({ url: img.url, name: img.name });
        }
        let data = {
          ...form,
          images: { urls }
        };
        delete data.id;
        await ref.set(data);
        dispatch(
          MessageActions.showMessage({
            message: 'Insurance updated successfully'
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
        const insuranceId = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();
        let urls = [];
        for (let img of images) {
          await storage().ref(`images/${img.id}`).put(img.file);

          const url = await storage()
            .ref('images')
            .child(img.id)
            .getDownloadURL();
          urls.push({ url, name: img.name });
        }
        await firestore()
          .collection('insurances')
          .add({
            ...form,
            insuranceId: insuranceId?.insuranceId + 1,
            customerId: routeParams.customerId.Number(),
            images: { urls }
          });
        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({ insuranceId: insuranceId?.insuranceId + 1 });
        dispatch(
          MessageActions.showMessage({
            message: 'Insurance Saved Successfully'
          })
        );
        props.history.push(
          `/apps/e-commerce/customers/profile/${routeParams.customerId}`
        );
      } catch (error) {
        console.log(error);
      }
      setisLoading(false);
    }
  };

  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        <div className="mt-24">
          <IconButton
            onClick={() => {
              if (
                Object.keys(form).length === 0 &&
                form.constructor === Object
              ) {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${routeParams.customerId}`
                );
              } else {
                setOpenAlertOnBack(true);
              }
            }}>
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4 text-12">Customer's Profile</span>
          </IconButton>

          <div className="flex flex-row">
            <Icon className="text-20 mt-4">listalt</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Adding Insurance Info
            </Typography>
          </div>
          <CustomAlert
            open={openAlertOnBack}
            setOpen={setOpenAlertOnBack}
            text1="Discard Changes?"
            text2="All the changes will be lost. Are you sure?"
            customFunction={() => {
              if (routeParams?.customerId) {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${routeParams.customerId}`
                );
              } else {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${form?.customerId}`
                );
              }
            }}
          />
        </div>
      }
      content={
        !form ? (
          <></>
        ) : (
          <FuseAnimate animation="transition.slideRightIn" delay={500}>
            <div className="p-16 sm:p-24 w-full">
              <h1 className="underline p-10">Insurance Details</h1>

              <div className="flex flex-row px-60">
                <div className="w-1/4">
                  <div className="p-8 h-auto rounded-20 shadow-5 justify-between">
                    <Autocomplete
                      options={insurances}
                      getOptionLabel={(option) =>
                        option?.insuranceCompany || option
                      }
                      id="insuranceId"
                      value={form?.insuranceCompany}
                      inputValue={insuranceCompanyInput}
                      freeSolo
                      onInputChange={(e, value) => {
                        setInsuranceCompanyInput(value);
                        handleChange({
                          target: { value: value, name: 'insuranceCompany' }
                        });
                      }}
                      name="insuranceCompany"
                      onChange={(_, value) =>
                        handleChange({
                          target: {
                            value: value?.insuranceCompany,
                            name: 'insuranceCompany'
                          }
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Insurance Company"
                          variant="outlined"
                          margin="normal"
                        />
                      )}
                    />
                    <TextField
                      className="mt-12 "
                      fullWidth
                      // disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Primary Holder"
                      value={form?.primaryHolder}
                      onChange={handleChange}
                      name={'primaryHolder'}
                      variant="outlined"
                    />
                    <TextField
                      className="mt-12 "
                      fullWidth
                      // disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Policy #"
                      value={form?.policyNo}
                      onChange={handleChange}
                      name={'policyNo'}
                      variant="outlined"
                    />
                    <TextField
                      className="mt-12 "
                      fullWidth
                      // disabled={disabledState}
                      id="outlined-multiline-static"
                      label="SSN"
                      value={form?.ssn}
                      onChange={handleChange}
                      name={'ssn'}
                      variant="outlined"
                    />
                    <div className="flex justify-center">
                      <Button
                        className="whitespace-no-wrap mt-20 normal-case"
                        variant="contained"
                        color="secondary"
                        onClick={!form ? undefined : onSubmit}>
                        Save Insurance
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="p-8 flex-1 ml-10 h-auto rounded-20 shadow-5 justify-between">
                  <div className="flex flex-col overflow-scroll">
                    <div className="flex flex-row overflow-scroll">
                      {images.map((img, index) => (
                        <div className="mb-8 w-224 mr-6 ">
                          <img
                            className="w-full shadow-1 rounded-4"
                            src={img.url}
                            key={img.name}
                            alt={''}
                          />
                          <div className="flex flex-row justify-between items-center">
                            <div className="truncate">
                              {img.name.split('.', 1)}
                            </div>
                            <IconButton
                              onClick={() => {
                                let newImages = images;
                                newImages.splice(index, 1);
                                setImages([...newImages]);
                              }}
                              aria-label="delete"
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
                    <div className="flex flex-col flex-1"></div>
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

                      <Fab
                        color="secondary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended">
                        <AddIcon /> Upload photo
                      </Fab>
                      <br />
                      <br />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </FuseAnimate>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(AddInsurance);
