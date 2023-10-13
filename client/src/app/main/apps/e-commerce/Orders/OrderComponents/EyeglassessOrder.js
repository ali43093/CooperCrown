import _ from '@lodash';
import 'react-toastify/dist/ReactToastify.css';
import { firestore } from 'firebase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CustomAutocomplete from '../../ReusableComponents/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment'
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useCallback, useEffect, useState } from 'react';
import SearchFrameDialouge from '../SearchFrameDialouge';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { toastAttributes } from '../../ReusableComponents/HelperFunctions';
import CustomAlert from '../../ReusableComponents/CustomAlert';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    width: '100%',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  noBorder: {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  body: {
    fontSize: 14,
    padding: '10px',
    textAlign: 'center'
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

const EyeglassessOrder = (props) => {
  const classes = useStyles();
  const [selectedFrame, setSelectedFrame] = useState({});
  const [lensPrices, setLensPrices] = useState([])
  const [openOutOfRangeAlert, setOpenOutOfRangeAlert] = useState(false)
  const { form, handleChange, disabledState, prescription, lensTypeNames, eyeglasses, setEyeglasses } = props;

  useEffect(() => {
    const fetchDetails = async () => {
      const lensPrices = (await firestore().collection('lensPrice').doc('lensPrice').get()).data();
      setLensPrices(lensPrices)
    }
    fetchDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSelectedFrameChange = useCallback((event) => {
    event?.persist && event.persist();
    setSelectedFrame((_selectedFrame) =>
      _.setIn(
        { ..._selectedFrame },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
    );
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddFrameToOrder = async (lensRate) => {

    if (selectedFrame?.lensTypeName) {
      if (selectedFrame?.eyeglassesPrismOd || selectedFrame?.eyeglassesPrismOs) {
        lensRate = +lensPrices[selectedFrame?.lensTypeName]?.prismPrice
      }
      if (!lensRate) {
        toast.error('Out of range price is not specified.', toastAttributes);
        return
      }
    }

    let count = 1;
    eyeglasses.map((row) => {
      if (row?.frameId === selectedFrame?.frameId) {
        count++;
      }
      return null
    });
    if (selectedFrame?.frameQuantity < count) {
      toast.error('Required quantity is not available!', toastAttributes);
      return
    }

    if (
      selectedFrame
    ) {
      setEyeglasses([...eyeglasses, { ...selectedFrame, lensRate: lensRate ? lensRate : 0 }]);
    } else {
      toast.error('Please Fill Required Fields!', toastAttributes);
    }
  };

  return (
    <div>
      <div className="eyeglasses-prescription flex flex-col p-16 sm:px-24">
        <FuseAnimate
          animation="transition.slideRightIn"
          delay={500}>
          <div className="py-8  border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                EYEGLASSES PRESCRIPTION
              </h1>
            </div>
            <div className="w-full flex flex-row ">
              <div>
                <div className="flex flex-col p-8 flex-1 h-auto justify-between">
                  <div className="flex flex-row w-full pb-10">
                    <div className="flex flex-col px-10 w-1/2 ">
                      <FormControl>
                        <InputLabel id="demo-simple-select-autowidth-label">
                          Select Prescription
                        </InputLabel>
                        <Select
                          disabled={disabledState}
                          labelId="demo-simple-select-autowidth-label"
                          value={selectedFrame?.prescriptionId ?? ''}
                          name="prescriptionId"
                          onChange={(e) => {
                            handleSelectedFrameChange(e)
                            setSelectedFrame(
                              prescription.filter(
                                (word) =>
                                  word.prescriptionId === e.target.value
                              )?.[0]
                            )
                          }}
                        >
                          {[...prescription.filter((word) => word.prescriptionType === 'eyeglassesRx')].sort((a, b) => (a.prescriptionId > b.prescriptionId ? -1 : 1)).map((row) => (
                            <MenuItem value={row?.prescriptionId}>
                              {row?.prescriptionDate ? moment(row?.prescriptionDate.toDate()).format('MM/DD/YYYY') : ''}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div className="w-2/3">
                      <div className="flex flex-row ">
                        <div className="p-8 h-auto w-40">
                          <h3 className="text-center font-700">
                            RX
                          </h3>
                        </div>
                        <div className="p-8 h-auto w-1/6">
                          <h3 className="text-center font-700">
                            Sphere
                          </h3>
                        </div>
                        <div className="p-8 h-auto w-1/6">
                          <h3 className="text-center font-700">
                            Cylinder
                          </h3>
                        </div>
                        <div className="p-8 h-auto w-1/6">
                          <h3 className="text-center font-700">
                            Axis
                          </h3>
                        </div>
                        <div className="p-8 h-auto w-1/6">
                          <h3 className="text-center font-700">
                            Add
                          </h3>
                        </div>
                        <div className="p-8 h-auto w-2/6">
                          <h3 className="text-center font-700">
                            Prism/Base
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-row ">
                        <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center font-700">
                            OD
                          </h3>
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            value={
                              selectedFrame?.eyeglassesSphereOd
                                ? selectedFrame?.eyeglassesSphereOd
                                : ''
                            }
                            onChange={handleSelectedFrameChange}
                            disabled
                            name={'eyeglassesSphereOd'}
                            type='number'
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            value={selectedFrame?.eyeglassesCylinderOd ?? ''}
                            onChange={handleSelectedFrameChange}
                            disabled
                            name={'eyeglassesCylinderOd'}
                            type='number'
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            value={selectedFrame?.eyeglassesAxisOd ?? ''}
                            disabled
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesAxisOd'}
                            type='number'
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled
                            value={selectedFrame?.eyeglassesAddOd ?? ''}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesAddOd'}
                            type='number'
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-2/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled
                            value={selectedFrame?.eyeglassesPrismOd ?? ''}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesPrismOd'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row ">
                        <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center font-700">
                            OS
                          </h3>
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled
                            value={selectedFrame?.eyeglassesSphereOs ?? ''}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesSphereOs'}
                            type='number'
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled
                            value={selectedFrame?.eyeglassesCylinderOs ?? ''}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesCylinderOs'}
                            type='number'
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled
                            value={selectedFrame?.eyeglassesAxisOs ?? ''}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesAxisOs'}
                            type='number'
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled
                            value={selectedFrame?.eyeglassesAddOs ?? ''}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesAddOs'}
                            type='number'
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>

                        <div className="p-8 w-2/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            disabled
                            id="standard-basic"
                            value={selectedFrame?.eyeglassesPrismOs ?? ''}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesPrismOs'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-col mt-0 flex-1 h-auto justify-between">
                        <div className="flex flex-row ">
                          <div className="p-8 h-auto w-1/4">
                            <h3 className="text-center font-700">
                              PD
                            </h3>
                          </div>
                          <div className="p-8 h-auto w-1/4">
                            <h3 className="text-center font-700">
                              OU
                            </h3>
                          </div>
                          <div className="p-8 h-auto w-1/4">
                            <h3 className="text-center font-700">
                              OD
                            </h3>
                          </div>
                          <div className="p-8 h-auto w-1/4">
                            <h3 className="text-center font-700">
                              OS
                            </h3>
                          </div>
                        </div>
                        <div className="flex flex-row ">
                          <div className="p-3 flex w-1/3 h-auto border-grey-400 border-solid border-1 justify-center items-center">
                            <h3 className="text-center font-700">
                              Distance
                            </h3>
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOuDistance ?? ''}
                              onChange={handleSelectedFrameChange}
                              disabled={disabledState}
                              name={'pdOuDistance'}
                              type='number'
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOdDistance ?? ''}
                              onChange={handleSelectedFrameChange}
                              disabled={disabledState}
                              name={'pdOdDistance'}
                              type='number'
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOsDistance ?? ''}
                              disabled={disabledState}
                              onChange={handleSelectedFrameChange}
                              name={'pdOsDistance'}
                              type='number'
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row ">
                          <div className="p-3 flex w-1/3 h-auto border-grey-400 border-solid border-1 justify-center items-center">
                            <h3 className="text-center font-700">
                              Near
                            </h3>
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOuNear ?? ''}
                              onChange={handleSelectedFrameChange}
                              disabled={disabledState}
                              name={'pdOuNear'}
                              type='number'
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOdNear ?? ''}
                              onChange={handleSelectedFrameChange}
                              disabled={disabledState}
                              name={'pdOdNear'}
                              type='number'
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOsNear ?? ''}
                              disabled={disabledState}
                              onChange={handleSelectedFrameChange}
                              name={'pdOsNear'}
                              type='number'
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
                  </div>
                </div>
              </div>
            </div>
            <br></br>
          </div>
        </FuseAnimate>
      </div>

      <div className="eyeglasses-info flex flex-col p-16 sm:px-24">
        <FuseAnimate
          animation="transition.slideRightIn"
          delay={500}>
          <div className="py-8 border-1 border-black border-solid rounded-6">
            <div className="flex px-20 flex-row justify-between border-b-1 border-black border-solid">
              <FormControlLabel
                className="m-0"
                style={{ color: '#f15a25' }}
                control={
                  <Checkbox
                    checked={form?.shipFrameToCustomerLogic}
                    onChange={handleChange}
                    name="shipFrameToCustomerLogic"
                    disabled={disabledState}
                  />
                }
                label="Ship To Customer"
              />
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                EYEGLASSES INFO
              </h1>
              <FormControlLabel
                className="m-0"
                style={{ color: '#f15a25' }}
                control={
                  <Checkbox
                    checked={form?.rushFrameOrder}
                    onChange={handleChange}
                    name="rushFrameOrder"
                    disabled={disabledState}
                  />
                }
                label="Rush Order"
              />
            </div>
            <div className="flex flex-row w-full p-8 gap-10">
              <div className="border-1 border-black border-solid w-1/2">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col px-8">
                    <div className="flex flex-col my-10 relative">
                      <h2 className="text-center">Frame</h2>
                      <div className="flex flex-row absolute right-0">
                        <SearchFrameDialouge
                          disabledState={disabledState}
                          form={selectedFrame}
                          setForm={setSelectedFrame}
                          variant="frame"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <TextField
                        fullWidth
                        style={{ borderRadius: '0px' }}
                        variant="outlined"
                        disabled={true}
                        id="standard-basic"
                        value={selectedFrame?.frameBrand ?? ''}
                        onChange={handleSelectedFrameChange}
                        name={'frameBrand'}
                        label="Brand"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                      <TextField
                        className="mt-4"
                        fullWidth
                        variant="outlined"
                        disabled={true}
                        id="standard-basic"
                        value={selectedFrame?.frameModel ?? ''}
                        onChange={handleSelectedFrameChange}
                        name={'frameModel'}
                        label="Model"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                      <TextField
                        className="mt-4"
                        fullWidth
                        variant="outlined"
                        disabled={true}
                        id="standard-basic"
                        value={selectedFrame?.frameColour ?? ''}
                        onChange={handleSelectedFrameChange}
                        name={'frameColour'}
                        label="Color"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                      <div className="flex flex-row">
                        <TextField
                          className="mt-4"
                          fullWidth
                          variant="outlined"
                          disabled={disabledState}
                          id="standard-basic"
                          value={selectedFrame?.segHtOd ?? ''}
                          onChange={handleSelectedFrameChange}
                          name={'segHtOd'}
                          label="Seg Ht OD"
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                        <TextField
                          className="mt-4 ml-2"
                          fullWidth
                          variant="outlined"
                          disabled={disabledState}
                          id="standard-basic"
                          value={selectedFrame?.segHtOs ?? ''}
                          onChange={handleSelectedFrameChange}
                          name={'segHtOs'}
                          label="Seg Ht OS"
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-10">
                      <FormControlLabel
                        className="m-0"
                        style={{ color: '#f15a25' }}
                        control={
                          <Checkbox
                            checked={selectedFrame?.sendFrameToLab ?? ''}
                            onChange={handleSelectedFrameChange}
                            name="sendFrameToLab"
                            disabled={disabledState}
                          />
                        }
                        label="Sending Frame to Lab"
                      />
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.frameLater ?? ''}
                            onChange={handleSelectedFrameChange}
                            name="frameLater"
                            disabled={disabledState}
                          />
                        }
                        label="Frame to come later"
                      />
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.orderFrameInsurance ?? ''}
                            onChange={handleSelectedFrameChange}
                            name="orderFrameInsurance"
                            disabled={disabledState}
                          />
                        }
                        label="Order Frame from Insurance"
                      />
                      <div>
                        <FormControlLabel
                          className="m-0"
                          control={
                            <Checkbox
                              checked={selectedFrame?.customerFrame ?? ''}
                              onChange={handleSelectedFrameChange}
                              name="customerFrame"
                              disabled={disabledState}
                            />
                          }
                          label="Customer’s Frame"
                        />
                        {selectedFrame?.customerFrame && (
                          <TextField
                            id="outlined-multiline-static"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            name="customerFrameDetail"
                            value={selectedFrame?.customerFrameDetail ?? ''}
                            onChange={handleSelectedFrameChange}
                          />
                        )}
                      </div>
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.otherFrame ?? ''}
                            onChange={handleSelectedFrameChange}
                            name="otherFrame"
                            disabled={disabledState}
                          />
                        }
                        label="Other Frame"
                      />
                      {selectedFrame?.otherFrame && (
                        <TextField
                          id="outlined-multiline-static"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="otherFrameDetail"
                          value={selectedFrame?.otherFrameDetail ?? ''}
                          onChange={handleSelectedFrameChange}
                        />
                      )}
                    </div>
                    <div className="flex gap-10 py-10">
                      <TextField
                        id="outlined-multiline-static"
                        label="Memo"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        name="frameMemo"
                        value={selectedFrame?.frameMemo ?? ''}
                        onChange={(e) => handleSelectedFrameChange({
                          target: {
                            name: 'frameMemo',
                            value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                          }
                        })}
                        disabled={disabledState}
                      />
                      <TextField
                        id="outlined-multiline-static"
                        label="Additional Price"
                        variant="outlined"
                        size="small"
                        className="w-1"
                        name="frameAdditionalPrice"
                        error={
                          selectedFrame?.frameAdditionalPrice &&
                          !Number(
                            selectedFrame?.frameAdditionalPrice
                          )
                        }
                        value={selectedFrame?.frameAdditionalPrice ?? ''}
                        onChange={handleSelectedFrameChange}
                        disabled={disabledState}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-1 border-black border-solid w-1/2">
                <div className="flex flex-col w-full px-8">
                  <div className="flex flex-col my-10">
                    <h2 className="text-center">Lens</h2>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="w-full">
                        <FormControl
                          component="fieldset"
                          className="w-full">
                          <RadioGroup
                            className="flex px-20"
                            row
                            aria-label="lensType"
                            name="lensType"
                            value={selectedFrame?.lensType ?? ''}
                            onChange={handleSelectedFrameChange}>
                            <div className="w-1/2 flex flex-col">
                              <FormControlLabel
                                disabled={disabledState}
                                value="distance"
                                control={<Radio />}
                                label="Distance"
                              />
                              <FormControlLabel
                                value="fTop"
                                disabled={disabledState}
                                control={<Radio />}
                                label="Flat Top"
                              />
                            </div>
                            <div className="w-1/2 flex flex-col">
                              <FormControlLabel
                                value="read"
                                disabled={disabledState}
                                control={<Radio />}
                                label="Reading"
                              />
                              <FormControlLabel
                                value="progressive"
                                disabled={disabledState}
                                control={<Radio />}
                                label="Progressive"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col px-10 w-full">
                        <CustomAutocomplete
                          list={lensTypeNames}
                          form={selectedFrame}
                          setForm={setSelectedFrame}
                          handleChange={handleSelectedFrameChange}
                          id="lensTypeName"
                          freeSolo={false}
                          label="Select Lens Type"
                          disabled={disabledState}
                        />
                      </div>
                    </div>
                    <div>
                      <TextField
                        className="mt-4"
                        fullWidth
                        variant="outlined"
                        disabled={disabledState}
                        id="standard-basic"
                        value={selectedFrame?.lensColour ?? ''}
                        onChange={(e) => handleSelectedFrameChange({
                          target: {
                            name: 'lensColour',
                            value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                          }
                        })}
                        name={'lensColour'}
                        label="Color/Tint"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                      <TextField
                        className="mt-4"
                        fullWidth
                        variant="outlined"
                        disabled={disabledState}
                        id="standard-basic"
                        value={selectedFrame?.lensDetail ?? ''}
                        onChange={(e) => handleSelectedFrameChange({
                          target: {
                            name: 'lensDetail',
                            value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                          }
                        })}
                        name={'lensDetail'}
                        label="Detail"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-10">
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.oversizeLens ?? ''}
                            onChange={handleSelectedFrameChange}
                            name="oversizeLens"
                            disabled={disabledState}
                          />
                        }
                        label="Oversize Lens ( Additional Price )"
                      />
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.cutLensOnly ?? ''}
                            onChange={handleSelectedFrameChange}
                            name="cutLensOnly"
                            disabled={disabledState}
                          />
                        }
                        label="Cut Lens Only"
                      />
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.sendUncutLenses ?? ''}
                            onChange={handleSelectedFrameChange}
                            name="sendUncutLenses"
                            disabled={disabledState}
                          />
                        }
                        label="Send Uncut Lenses"
                      />
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.orderLensInsurance ?? ''}
                            onChange={handleSelectedFrameChange}
                            name="orderLensInsurance"
                            disabled={disabledState}
                          />
                        }
                        label="Order Lens from Insurance"
                      />
                    </div>
                  </div>
                  <div
                    className="flex gap-10 py-10"
                    style={{ paddingTop: '5rem' }}>
                    <TextField
                      id="outlined-memo"
                      label="Memo"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="lensMemo"
                      value={selectedFrame?.lensMemo ?? ''}
                      onChange={(e) => handleSelectedFrameChange({
                        target: {
                          name: 'lensMemo',
                          value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                        }
                      })}
                      disabled={disabledState}
                    />
                    <TextField
                      id="outlined-additional-price"
                      label="Additional Price"
                      variant="outlined"
                      size="small"
                      className="w-1"
                      name="lensAdditionalPrice"
                      error={
                        selectedFrame?.lensAdditionalPrice &&
                        !Number(selectedFrame?.lensAdditionalPrice)
                      }
                      value={selectedFrame?.lensAdditionalPrice ?? ''}
                      onChange={handleSelectedFrameChange}
                      disabled={disabledState}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row p-10">
              <Button
                className={classes.button}
                variant="contained"
                disabled={(!selectedFrame?.frameId && !selectedFrame?.lensTypeName) || disabledState}
                color="secondary"
                onClick={() => {
                  if (selectedFrame?.lensTypeName && (!selectedFrame?.eyeglassesSphereOd || !selectedFrame?.eyeglassesCylinderOd ||
                    !selectedFrame?.eyeglassesSphereOs || !selectedFrame?.eyeglassesCylinderOs)) {
                    toast.error('Please enter Sphere & Cylinder Values...', toastAttributes);
                    return null;
                  }
                  if (selectedFrame?.lensTypeName) {
                    let odPrice, osPrice
                    lensPrices[selectedFrame?.lensTypeName].rows.map((row) => {
                      if (row?.id === Number(selectedFrame?.eyeglassesSphereOd).toFixed(2)) {
                        if (row[Number(selectedFrame?.eyeglassesCylinderOd).toFixed(2)]) {
                          odPrice = +row[Number(selectedFrame?.eyeglassesCylinderOd).toFixed(2)]
                        }
                      }
                      return null;
                    });
                    lensPrices[selectedFrame?.lensTypeName].rows.map((row) => {
                      if (row?.id === Number(selectedFrame?.eyeglassesSphereOs).toFixed(2)) {
                        if (row[Number(selectedFrame?.eyeglassesCylinderOs).toFixed(2)]) {
                          osPrice = +row[Number(selectedFrame?.eyeglassesCylinderOs).toFixed(2)]
                        }
                      }
                      return null;
                    });
                    if (odPrice || osPrice) {
                      const greaterPrice = odPrice > osPrice ? odPrice : osPrice
                      handleAddFrameToOrder(greaterPrice)
                    } else {
                      setOpenOutOfRangeAlert(true)
                      toast.error('Selected Lens Rate is not available...', toastAttributes);
                      return null;
                    }

                  } else handleAddFrameToOrder()
                }}
                aria-label="add">
                <AddIcon />
                Add to Order
              </Button>
              <CustomAlert
                open={openOutOfRangeAlert}
                setOpen={setOpenOutOfRangeAlert}
                text1="Lens rate unavailable for selected values."
                text2="Use out of range price instead?"
                customFunction={() => {
                  handleAddFrameToOrder(+lensPrices[selectedFrame?.lensTypeName]?.outOfRangePrice)
                }}
              />
              <div className='pl-4'>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => { setSelectedFrame({}) }}
                  aria-label="add">
                  CLEAR
                </Button>
              </div>
            </div>
            <div className="flex flex-col max-h-320">
              <TableContainer
                className="flex flex-col w-full overflow-scroll"
                component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Brand</StyledTableCell>
                      <StyledTableCell>Model</StyledTableCell>
                      <StyledTableCell>Frame Color</StyledTableCell>
                      <StyledTableCell>Lens Type</StyledTableCell>
                      <StyledTableCell>Lens Color</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {eyeglasses.map((row, index) => (
                      <StyledTableRow
                        onClick={() => {
                          setSelectedFrame(row);
                        }}
                        key={index}
                        hover
                        className="cursor-pointer">
                        <StyledTableCell component="th" scope="row">
                          {row?.frameBrand}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.frameModel}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.frameColour}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.lensType === 'distance' &&
                            'Distance '}
                          {row?.lensType === 'read' && 'Reading '}
                          {row?.lensType === 'fTop' && 'Flat Top '}
                          {row?.lensType === 'progressive' &&
                            'Progressive '}
                          {row?.lensTypeName}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.lensColour}
                        </StyledTableCell>
                        <StyledTableCell>
                          {((+row?.frameRate || 0) + (+row?.lensRate || 0)).toLocaleString()}
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            disabled={disabledState}
                            onClick={() => {
                              let newEyeglasses = eyeglasses;
                              newEyeglasses.splice(index, 1);
                              setEyeglasses([...newEyeglasses]);
                              setSelectedFrame(row);
                            }}
                            aria-label="view">
                            <Icon>edit</Icon>
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </FuseAnimate>
      </div>
    </div>
  );
};

export default withRouter(EyeglassessOrder);
