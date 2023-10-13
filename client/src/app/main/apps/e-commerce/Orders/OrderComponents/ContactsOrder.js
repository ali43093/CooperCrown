import _ from '@lodash';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { toast, Zoom } from 'react-toastify';
import { withRouter } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment'
import Paper from '@material-ui/core/Paper';
import React, { useCallback, useState } from 'react';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { sortAlphabetically } from '../../ReusableComponents/HelperFunctions';

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

const ContactsOrder = (props) => {
  const classes = useStyles();
  const [selectedContactLens, setSelectedContactLens] = useState({});
  const { form, handleChange, disabledState, prescription, contactLens, contactLenses, setContactLenses } = props;
  const [filteredContactLensOd, setFilteredContactLensOd] = useState(contactLens);
  const [filteredContactLensOs, setFilteredContactLensOs] = useState(contactLens);

  const handleSelectedContactLensChange = useCallback((event) => {
    event?.persist && event.persist();
    setSelectedContactLens((_selectedContactLens) =>
      _.setIn(
        { ..._selectedContactLens },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContactLensRate = () => {
    if (selectedContactLens?.OU) {
      const clOdRate = +filteredContactLensOd[0]?.price || 0
      return { clOdRate, clOsRate: clOdRate }
    } else if (
      selectedContactLens?.contactLensStyleOd &&
      selectedContactLens?.contactLensStyleOs
    ) {
      const clOdRate = +filteredContactLensOd[0]?.price || 0
      const clOsRate = +filteredContactLensOs[0]?.price || 0
      return { clOdRate, clOsRate }
    } else {
      toast.error('Please select Contact Lens Style for OD & OS...', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom
      });
      return null;
    }
  };

  const handleAddContactsLensToOrder = () => {
    let res = fetchContactLensRate();

    if (res?.clOdRate !== undefined && res?.clOsRate !== undefined) {
      setContactLenses([...contactLenses, { ...selectedContactLens, contactLensRate: (res?.clOdRate * selectedContactLens?.contactLensQtyOd || 0) + (res?.clOsRate * selectedContactLens?.contactLensQtyOs || 0), clOdRate: res?.clOdRate, clOsRate: res?.clOsRate }]);
    } else {
      toast.error(
        'Contact Lens Rate is not calculated yet.',
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom
        }
      );
    }
  };

  const filterOdContacts = (value, attribute) => {
    let newContacts = filteredContactLensOd.filter((contact) => contact?.[attribute] === value)
    setFilteredContactLensOd(newContacts)
  }

  const filterOsContacts = (value, attribute) => {
    let newContacts = filteredContactLensOs.filter((contact) => contact?.[attribute] === value)
    setFilteredContactLensOs(newContacts)
  }

  return (
    <div>
      <div className="contact-lens-prescription flex flex-col p-16 sm:px-24">
        <FuseAnimate
          animation="transition.slideRightIn"
          delay={500}>
          <div className="py-8  border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                CONTACT LENS PRESCRIPTION
              </h1>
            </div>
            <div>
              <div className="flex flex-col p-8 flex-1 h-auto justify-between">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col px-10 w-1/2 ">
                    <FormControl>
                      <InputLabel id="demo-simple-select-autowidth-label">
                        Select Prescription
                      </InputLabel>
                      <Select
                        disabled={disabledState}
                        labelId="demo-simple-select-autowidth-label"
                        value={selectedContactLens?.prescriptionId ?? ''}
                        name="prescriptionId"
                        onChange={(e) => {
                          handleSelectedContactLensChange(e)
                          setSelectedContactLens(
                            prescription.filter(
                              (word) =>
                                word.prescriptionId === e.target.value
                            )?.[0]
                          )
                        }}
                      >
                        {[...prescription.filter((word) => word.prescriptionType === 'contactLensRx')].sort((a, b) => (a.prescriptionId > b.prescriptionId ? -1 : 1))
                          .map((row) => (
                            <MenuItem value={row?.prescriptionId}>
                              {row?.prescriptionDate ? moment(row?.prescriptionDate.toDate()).format('MM/DD/YYYY') : ''}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </div>
                </div>

                <div className="flex flex-row ">
                  <div className="p-8 h-auto w-40">
                    <h3 className="text-center font-700">RX</h3>
                  </div>
                  <div className="p-8 h-auto w-80">
                    <h3 className="text-center font-700">Sphere</h3>
                  </div>
                  <div className="p-8 h-auto w-80">
                    <h3 className="text-center font-700">Cylinder</h3>
                  </div>
                  <div className="p-8 h-auto w-80">
                    <h3 className="text-center font-700">Axis</h3>
                  </div>
                  <div className="p-8 h-auto w-80">
                    <h3 className="text-center font-700">Add</h3>
                  </div>
                  <div className="p-8 h-auto w-1/4">
                    <h3 className="text-center font-700">Brand</h3>
                  </div>
                  <div className="p-8 h-auto w-1/4">
                    <h3 className="text-center font-700">Model</h3>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                    <h3 className="text-center font-700">OD</h3>
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={selectedContactLens?.contactLensSphereOd ?? ''}
                      onChange={handleSelectedContactLensChange}
                      disabled
                      name={'contactLensSphereOd'}
                      type='number'
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={selectedContactLens?.contactLensCylinderOd ?? ''}
                      onChange={handleSelectedContactLensChange}
                      disabled
                      name={'contactLensCylinderOd'}
                      type='number'
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={selectedContactLens?.contactLensAxisOd ?? ''}
                      disabled
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensAxisOd'}
                      type='number'
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled
                      value={selectedContactLens?.contactLensAddOd ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensAddOd'}
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
                      disabled
                      value={selectedContactLens?.contactLensBrandOd ?? ''}
                      onChange={(e) => handleSelectedContactLensChange({
                        target: {
                          name: 'contactLensBrandOd',
                          value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                        }
                      })}
                      name={'contactLensBrandOd'}
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
                      disabled
                      value={selectedContactLens?.contactLensModelOd ?? ''}
                      onChange={(e) => handleSelectedContactLensChange({
                        target: {
                          name: 'contactLensModelOd',
                          value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                        }
                      })}
                      name={'contactLensModelOd'}
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
                    <h3 className="text-center font-700">OS</h3>
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled
                      value={selectedContactLens?.contactLensSphereOs ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensSphereOs'}
                      type='number'
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled
                      value={selectedContactLens?.contactLensCylinderOs ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensCylinderOs'}
                      type='number'
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled
                      value={selectedContactLens?.contactLensAxisOs ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensAxisOs'}
                      type='number'
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled
                      value={selectedContactLens?.contactLensAddOs ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensAddOs'}
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
                      disabled
                      value={selectedContactLens?.contactLensBrandOs ?? ''}
                      onChange={(e) => handleSelectedContactLensChange({
                        target: {
                          name: 'contactLensBrandOs',
                          value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                        }
                      })}
                      name={'contactLensBrandOs'}
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
                      disabled
                      value={selectedContactLens?.contactLensModelOs ?? ''}
                      onChange={(e) => handleSelectedContactLensChange({
                        target: {
                          name: 'contactlensModelOs',
                          value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                        }
                      })}
                      name={'contactLensModelOs'}
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
        </FuseAnimate>
      </div>

      <div className="contact-lens-info flex flex-col p-16 sm:px-24">
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
                    checked={form?.shipContactLensToCustomerLogic ?? ''}
                    onChange={handleChange}
                    name="shipContactLensToCustomerLogic"
                    disabled={disabledState}
                  />
                }
                label="Ship To Customer"
              />
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                CONTACT LENS INFO
              </h1>
              <FormControlLabel
                className="m-0"
                style={{ color: '#f15a25' }}
                control={
                  <Checkbox
                    checked={form?.rushContactLensOrder ?? ''}
                    onChange={handleChange}
                    name="rushContactLensOrder"
                    disabled={disabledState}
                  />
                }
                label="Rush Order"
              />
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col gap-10 w-full">
                <div className="flex w-full items-end gap-20 px-20">
                  <h3 className="text-center font-700">OD</h3>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Style
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensStyleOd ?? ''}
                      name="contactLensStyleOd"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOdContacts(e.target.value, 'style')
                      }}>
                      {[...new Set(sortAlphabetically(filteredContactLensOd, 'style')?.map((item) => (item?.style ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Brand
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensBrandOd ?? ''}
                      name="contactLensBrandOd"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOdContacts(e.target.value, 'brand')
                      }}>
                      {[...new Set(sortAlphabetically(filteredContactLensOd, 'brand')?.map((item) => (item?.brand ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Model
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensNameOd ?? ''}
                      name="contactLensNameOd"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOdContacts(e.target.value, 'model')
                      }}>
                      {[...new Set(sortAlphabetically(filteredContactLensOd, 'model')?.map((item) => (item?.model ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Base Curve
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensBaseCurveOd ?? ''}
                      name="contactLensBaseCurveOd"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOdContacts(e.target.value, 'basecurve')
                      }}>
                      {[...new Set(sortAlphabetically(filteredContactLensOd, 'basecurve')?.map((item) => (item?.basecurve ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Pack Qty
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensPackQtyOd ?? ''}
                      name="contactLensPackQtyOd"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOdContacts(e.target.value, 'packquantity')
                      }}>
                      {[...new Set(sortAlphabetically(filteredContactLensOd, 'packquantity')?.map((item) => (item?.packquantity ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    style={{ maxWidth: '80px' }}
                    size="small"
                    id="standard-basic"
                    type='number'
                    label='Quantity'
                    disabled={disabledState}
                    value={selectedContactLens?.contactLensQtyOd ?? ''}
                    onChange={handleSelectedContactLensChange}
                    name={'contactLensQtyOd'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
                <div className="flex w-full items-end gap-20 px-20">
                  <h3 className="text-center font-700">OS</h3>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Style
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensStyleOs ?? ''}
                      name="contactLensStyleOs"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOsContacts(e.target.value, 'style')
                      }}>
                      {[...new Set(sortAlphabetically(filteredContactLensOs, 'style')?.map((item) => (item?.style ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Brand
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensBrandOs ?? ''}
                      name="contactLensBrandOs"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOsContacts(e.target.value, 'brand')
                      }}>
                      {[...new Set(sortAlphabetically(filteredContactLensOs, 'brand')?.map((item) => (item?.brand ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Model
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensNameOs ?? ''}
                      name="contactLensNameOs"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOsContacts(e.target.value, 'model')
                      }}>
                      {[...new Set(sortAlphabetically(filteredContactLensOs, 'model')?.map((item) => (item?.model ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Base Curve
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensBaseCurveOs ?? ''}
                      name="contactLensBaseCurveOs"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOsContacts(e.target.value, 'basecurve')
                      }}>
                      {[...new Set(sortAlphabetically(filteredContactLensOs, 'basecurve')?.map((item) => (item?.basecurve ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Pack Qty
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensPackQtyOs ?? ''}
                      name="contactLensPackQtyOs"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOsContacts(e.target.value, 'packquantity')
                      }}>
                      {[...new Set(sortAlphabetically(filteredContactLensOs, 'packquantity')?.map((item) => (item?.packquantity ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    style={{ maxWidth: '80px' }}
                    size="small"
                    id="standard-basic"
                    type='number'
                    label='Quantity'
                    disabled={disabledState}
                    value={selectedContactLens?.contactLensQtyOs ?? ''}
                    onChange={handleSelectedContactLensChange}
                    name={'contactLensQtyOs'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
                <div className='flex flex-col w-full p-20'>
                  <TextField
                    fullWidth
                    value={selectedContactLens?.contactLensMemo ?? ''}
                    onChange={handleSelectedContactLensChange}
                    disabled={disabledState}
                    name={'contactLensMemo'}
                    variant='outlined'
                    label="Memo"
                  />
                </div>
                <div className="flex flex-col px-20 gap-10">
                  <FormControlLabel
                    className="m-0"
                    style={{ width: 'fit-content' }}
                    control={
                      <Checkbox
                        checked={selectedContactLens?.OU ?? ''}
                        onChange={(e) => {
                          // handleSelectedContactLensChange(e)
                          if (e.target.checked) {
                            console.log('I am triggered')
                            setSelectedContactLens({
                              ...selectedContactLens, OU: e.target.checked, contactLensStyleOs: selectedContactLens?.contactLensStyleOd, contactLensBrandOs: selectedContactLens?.contactLensBrandOd,
                              contactLensNameOs: selectedContactLens?.contactLensNameOd, contactLensBaseCurveOs: selectedContactLens?.contactLensBaseCurveOd, contactLensPackQtyOs: selectedContactLens?.contactLensPackQtyOd,
                              contactLensQtyOs: selectedContactLens?.contactLensQtyOd
                            })
                            setFilteredContactLensOs(contactLens)
                          } else {
                            setSelectedContactLens({
                              ...selectedContactLens, OU: e.target.checked, contactLensStyleOs: undefined, contactLensBrandOs: undefined, contactLensNameOs: undefined,
                              contactLensBaseCurveOs: undefined, contactLensPackQtyOs: undefined, contactLensQtyOs: undefined
                            })
                            setFilteredContactLensOs(contactLens)
                          }
                        }}
                        name="OU"
                        disabled={disabledState}
                      />
                    }
                    label="OU"
                  />
                  <div className="flex gap-10 justify-between">
                    <FormControlLabel
                      className="m-0"
                      control={
                        <Checkbox
                          checked={selectedContactLens?.orderFromShowroom ?? ''}
                          onChange={handleSelectedContactLensChange}
                          name="orderFromShowroom"
                          disabled={disabledState}
                        />
                      }
                      label="Order From Showroom"
                    />
                    <FormControlLabel
                      className="m-0"
                      control={
                        <Checkbox
                          checked={selectedContactLens?.orderFromLab ?? ''}
                          onChange={handleSelectedContactLensChange}
                          name="orderFromLab"
                          disabled={disabledState}
                        />
                      }
                      label="Order From Lab"
                    />
                    <FormControlLabel
                      className="m-0"
                      control={
                        <Checkbox
                          checked={selectedContactLens?.contactLensInsurance ?? ''}
                          onChange={handleSelectedContactLensChange}
                          name="contactLensInsurance"
                          disabled={disabledState}
                        />
                      }
                      label="Order From Insurance"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row p-10">
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleAddContactsLensToOrder}
                disabled={disabledState}
                aria-label="add">
                <AddIcon />
                Add to Order
              </Button>
              <div className='pl-4'>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSelectedContactLens({})
                    setFilteredContactLensOd(contactLens)
                    setFilteredContactLensOs(contactLens)
                  }}
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
                    <TableRow className='truncate'>
                      <StyledTableCell>RX</StyledTableCell>
                      <StyledTableCell>Style</StyledTableCell>
                      <StyledTableCell>Brand</StyledTableCell>
                      <StyledTableCell>Model</StyledTableCell>
                      <StyledTableCell>Base Curve</StyledTableCell>
                      <StyledTableCell>Pack Qty</StyledTableCell>
                      <StyledTableCell>Unit Price</StyledTableCell>
                      <StyledTableCell>Qty</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contactLenses.map((row, index) => (
                      <StyledTableRow
                        onClick={() => {
                          setSelectedContactLens(row);
                        }}
                        key={index}
                        hover
                        className="cursor-pointer truncate">
                        <StyledTableCell>
                          <div className="flex flex-col">
                            <div>OD</div>
                            <div>OS</div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="flex flex-col">
                            <div>{row?.contactLensStyleOd}</div>
                            <div>{row?.contactLensStyleOs}</div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="flex flex-col">
                            <div>{row?.contactLensBrandOd}</div>
                            <div>{row?.contactLensBrandOs}</div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="flex flex-col">
                            <div>{row?.contactLensNameOd}</div>
                            <div>{row?.contactLensNameOs}</div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="flex flex-col">
                            <div>{row?.contactLensBaseCurveOd}</div>
                            <div>{row?.contactLensBaseCurveOs}</div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="flex flex-col">
                            <div>{row?.contactLensPackQtyOd}</div>
                            <div>{row?.contactLensPackQtyOs}</div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="flex flex-col">
                            <div>{row?.clOdRate}</div>
                            <div>{row?.clOsRate}</div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="flex flex-col">
                            <div>{row?.contactLensQtyOd}</div>
                            <div>{row?.contactLensQtyOs}</div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <div className="flex flex-col">
                            <div>{row?.clOdRate * row?.contactLensQtyOd}</div>
                            <div>{row?.clOsRate * row?.contactLensQtyOs}</div>
                          </div>
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            disabled={disabledState}
                            onClick={() => {
                              let newContactLenses = contactLenses;
                              newContactLenses.splice(index, 1);
                              setContactLenses([
                                ...newContactLenses
                              ]);
                              setSelectedContactLens(row);
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

export default withRouter(ContactsOrder);
