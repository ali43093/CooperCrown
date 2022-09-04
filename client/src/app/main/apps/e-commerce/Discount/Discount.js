import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore, storage } from 'firebase';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import {makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

// const useStyles = makeStyles((theme) => ({
//   productImageFeaturedStar: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     color: orange[400],
//     opacity: 0
//   },
//   productImageUpload: {
//     transitionProperty: 'box-shadow',
//     transitionDuration: theme.transitions.duration.short,
//     transitionTimingFunction: theme.transitions.easing.easeInOut
//   },
//   productImageItem: {
//     transitionProperty: 'box-shadow',
//     transitionDuration: theme.transitions.duration.short,
//     transitionTimingFunction: theme.transitions.easing.easeInOut,
//     '&:hover': {
//       '& $productImageFeaturedStar': {
//         opacity: 0.8
//       }
//     },
//     '&.featured': {
//       pointerEvents: 'none',
//       boxShadow: theme.shadows[3],
//       '& $productImageFeaturedStar': {
//         opacity: 1
//       },
//       '&:hover $productImageFeaturedStar': {
//         opacity: 1
//       }
//     }
//   }
// }));
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
function Discount(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.discount);
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);

  const routeParams = useParams();

  useDeepCompareEffect(() => {
    const updateProductState = async () => {
      setisLoading(false);
      const { discountId } = routeParams;

      if (discountId === 'new') {
        dispatch(Actions.newDiscount());
        setisLoading(true);
      } else {
        console.log(discountId)
        await dispatch(await Actions.getDiscount(discountId));
        setisLoading(true);
      }
    };

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (
      (product.data && !form) ||
      (product.data && form && product.data.id !== form.id)
    ) {
      setForm(product.data);
    }
  }, [form, product.data, setForm]);

  function handleChangeTab(event, value) {
    setTabValue(value);
   
  }
  const handleDelete = async () => {
    try {
      const queryDiscount = await firestore()
        .collection('discounts')
        .where('discountId', '==', routeParams.discountId)
        .get();
      let result = queryDiscount.docs[0].data();
      result.id = queryDiscount.docs[0].id;
      await firestore().collection('discounts').doc(result.id).delete();
      dispatch(
        MessageActions.showMessage({
          message: 'Discount deleted successfully'
        })
      );
   
        props.history.push('/apps/e-commerce/discounts');
      
    } catch (error) {
      console.log(error);
    }
  };
  function canBeSubmitted() {
    return form.code.length > 0 && form.description.length > 0 && form.amount.length > 0;
  }

  if (
    (!product.data ||
      (product.data && routeParams.discountId !== product.data.id)) &&
    routeParams.discountId !== 'new' &&
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
                  to="/apps/e-commerce/discounts"
                  color="inherit">
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4">Discount</span>
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <img
                    className="w-32 sm:w-48 rounded"
                    src="assets/images/ecommerce/product-image-placeholder.png"
                    alt={form.code}
                  />
                </FuseAnimate>
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.code ? form.code : 'New Discount'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">Discount Detail</Typography>
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
                  if (routeParams.discountId === 'new') {
                    setisLoading(false);
                    await dispatch(await Actions.saveDiscount(form));
                    setisLoading(true);
                  } else {
                    setisLoading(false);
                    await dispatch(await Actions.updateDiscount(form));
                    setisLoading(true);
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
          <Tab className="h-64 normal-case" label="New Discount" />
        </Tabs>
      }
      content={
        form && (
          <div className="flex flex-col h-260  px-16 py-6">
            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h1 className="font-700" style={{ color: '#f15a25' }}>
                  Detail  
                </h1>
              </div>
              <div className="p-16 sm:p-24 max-w-2xl">
                {tabValue === 0 && (
                  <div>
                    <TextField
                      className="mt-8 mb-16"
                      error={form.code === ''}
                      required
                      label="Name"
                      autoFocus
                      id="discount-code"
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      className="mt-8 mb-16"
                      label="Description"
                      id="discount-description"
                      name="description"
                      type="text"
                      value={form.description}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      className="mt-8 mb-16"
                      id="discount-amount"
                      name="amount"
                      onChange={handleChange}
                      label="Price"
                      type="Number"
                      value={form.amount}
                      variant="outlined"
                      fullWidth
                    />
                  </div>
                )}
              </div>
              <br></br>
              
            </div>
            <div className="flex flex-col p-12" >              
              <Button 
              className={classes.button}
              variant="contained"
              color="secondary"
               style={{
                        maxHeight: '60px',
                        minHeight: '60px'
                      }}
                              onClick={async () => {
                  
                  if (routeParams.discountId === 'new') {
                    setisLoading(false);
                    await dispatch(await Actions.saveDiscount(form));
                    props.history.push('/apps/e-commerce/discounts');
                    setisLoading(true);
                  } else {
                    setisLoading(false);
                    await dispatch(await Actions.updateDiscount(form));
                    props.history.push('/apps/e-commerce/discounts');
                    setisLoading(true);
                  }
                }}>
                 
                Save
              </Button>
          
                </div>
                <div className="flex flex-col p-12">
                    <Button
                      style={{
                        // maxHeight: '70px',
                        // minHeight: '70px',
                        color: 'red'
                      }}
                      variant="outlined"
                      onClick={() => setShowModal(true)}>
                      <Icon>delete</Icon>
                      DELETE 
                    </Button>
                    {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">               
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                 
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
               
                <div className="relative p-6 flex-auto">
                <h3 className="text-3xl font-semibold">
                   Are you sure you want to delete?
                  </h3>
                </div>
               
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
               
                  <Button
                   className={classes.button}
                   variant="contained"
                   color="secondary"
                    onClick={handleDelete}
                  >
                    Confirm
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
                  </div>
          </div>
          
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Discount);
