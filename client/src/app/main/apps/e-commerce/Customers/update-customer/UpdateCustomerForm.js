import { states } from 'app/main/apps/e-commerce/Emails/helper.js';
import { toast, Zoom } from 'react-toastify';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import AddFamilyDialog from './AddFamilyDialog';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useState } from 'react';
import reducer from '../../store/reducers';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
    padding: 5,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
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
  flexGrow: {
    flex: '1'
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

function UpdateCustomerForm(props) {
  const classes = useStyles();
  const {
    form,
    handleChange,
    errors,
    setForm,
    familyMembers,
    setFamilyMembers,
    customers,
    setOpenAlertOnSave
  } = props;
  const [state, setState] = useState(form?.state);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const defaultStates = {
    options: states,
    getOptionLabel: (option) => option.name || option
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

  return (
    <div className='flex flex-col gap-16 h-auto'>
      <div className="flex md:flex-row flex-col">
        <div className="p-10 md:w-3/5 w-full">
          <div className="py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                CUSTOMER INFO
              </h1>
            </div>

            <div className="flex flex-col px-16">
              <div className="flex flex-row flex-wrap">
                <div className="flex flex-col w-1/2">
                  <TextField
                    className="mt-8"
                    error={errors?.firstName}
                    helperText={errors?.firstName}
                    required
                    label="First Name"
                    autoFocus
                    id="first-name"
                    name="firstName"
                    value={form?.firstName}
                    onChange={(e) => handleChange({
                      target: {
                        name: 'firstName',
                        value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                      }
                    })}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8"
                    error={errors?.lastName}
                    helperText={errors?.lastName}
                    required
                    label="Last Name"
                    id="last-name"
                    name="lastName"
                    value={form?.lastName}
                    onChange={(e) => handleChange({
                      target: {
                        name: 'lastName',
                        value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                      }
                    })}
                    variant="outlined"
                    fullWidth
                  />
                  <div className="flex">
                    <Typography
                      className={`username text-16 whitespace-no-wrap self-center ${errors?.dob ? 'text-red' : ''} `}
                      color="inherit">
                      Date of Birth*
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justifyContent="start">
                        <KeyboardDatePicker
                          required
                          className="ml-24"
                          margin="normal"
                          id="date-picker-dialog"
                          format="MM/dd/yyyy"
                          error={errors?.dob}
                          helperText={errors?.dob}
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
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className="flex mt-10 flex-row justify-between">
                    <Typography
                      className={`username text-16 whitespace-no-wrap self-center ${errors?.gender ? 'text-red' : ''} `}
                      color="inherit">
                      Gender*
                    </Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        row
                        aria-label="gender"
                        error={errors?.gender}
                        name="gender"
                        value={form?.gender}
                        onChange={handleChange}>
                        <FormControlLabel
                          value="Female"
                          control={<Radio />}
                          label="Female"
                        />
                        <FormControlLabel
                          value="Male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="Other"
                          control={<Radio />}
                          label="Other"
                        />
                      </RadioGroup>
                      <FormHelperText className=' text-red'>{errors?.gender}</FormHelperText>
                    </FormControl>
                  </div>
                  <div className="flex">
                    <Typography
                      className={`username text-16 whitespace-no-wrap self-center ${errors?.ethnicity ? 'text-red' : ''} `}
                      color="inherit">
                      Ethnicity*
                    </Typography>
                    <div className="w-full">
                      <FormControl className="pl-32 w-full">
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="ethnicityId"
                          required
                          value={form?.ethnicity}
                          name="ethnicity"
                          onChange={handleChange}
                          error={errors?.ethnicity}
                          helperText={errors?.ethnicity}
                          autoWidth>
                          <MenuItem value={'American Indian & Alaska Native'}>
                            American Indian & Alaska Native
                          </MenuItem>
                          <MenuItem value={'Asian'}>Asian</MenuItem>
                          <MenuItem value={'Asian / India & Pakistan'}>
                            Asian / India & Pakistan
                          </MenuItem>
                          <MenuItem value={'Black / African American'}>
                            Black / African American
                          </MenuItem>
                          <MenuItem value={'Hispanic / Latino'}>
                            Hispanic / Latino
                          </MenuItem>
                          <MenuItem
                            value={'Native Hawaiian & Other Pacific Islander'}>
                            Native Hawaiian & Other Pacific Islander
                          </MenuItem>
                          <MenuItem value={'White / Caucasian'}>
                            White / Caucasian
                          </MenuItem>
                          <MenuItem value={'Others'}>Others</MenuItem>
                        </Select>
                        {errors?.ethnicity && <FormHelperText className='text-red'>{errors?.ethnicity}</FormHelperText>}
                        {!errors?.ethnicity && <FormHelperText>Select from the list</FormHelperText>}
                      </FormControl>
                    </div>
                  </div>
                  <TextField
                    className="mt-10"
                    multiline
                    maxRows={7}
                    minRows={7}
                    label="Other Information"
                    id="other"
                    name="other"
                    value={form?.other}
                    onChange={(e) => handleChange({
                      target: {
                        name: 'other',
                        value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                      }
                    })}
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="flex flex-col w-1/2 pl-10">
                  <TextField
                    className="mt-8"
                    required
                    id="outlined-multiline-static"
                    label="Address"
                    error={errors?.address}
                    helperText={errors?.address}
                    value={form?.address}
                    onChange={(e) => handleChange({
                      target: {
                        name: 'address',
                        value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                      }
                    })}
                    name="address"
                    variant="outlined"
                  />
                  <TextField
                    className="mt-8"
                    required
                    error={errors?.city}
                    helperText={errors?.city}
                    label="City"
                    id="city"
                    name="city"
                    value={form?.city}
                    onChange={(e) => handleChange({
                      target: {
                        name: 'city',
                        value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                      }
                    })}
                    variant="outlined"
                    fullWidth
                  />
                  <Autocomplete
                    {...defaultStates}
                    id="stateId"
                    value={form?.state}
                    fullWidth
                    error={errors?.state}
                    getOptionSelected={(option, value) => option.name === value}
                    inputValue={state}
                    onInputChange={(e, value) => setState(value)}
                    name="state"
                    onChange={(_, value) =>
                      handleChange({
                        target: { value: value?.name, name: 'state' }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="State*" margin="normal" />
                    )}
                  />
                  <FormHelperText className=' text-red'>{errors?.state}</FormHelperText>
                  <TextField
                    className="mt-8"
                    required
                    error={errors?.zipCode}
                    helperText={errors?.zipCode}
                    label="ZIP Code"
                    id="zip-code"
                    name="zipCode"
                    value={form?.zipCode}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8"
                    required
                    label="Phone 1"
                    id="phone1"
                    name="phone1"
                    error={errors?.phone1}
                    helperText={errors?.phone1}
                    value={form?.phone1}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8"
                    label="Phone 2"
                    id="phone2"
                    name="phone2"
                    value={form?.phone2}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8"
                    label="Email"
                    id="email"
                    name="email"
                    value={form?.email}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 md:w-2/5 w-full md:pl-0 h-360">
          <div className="py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                FAMILY TREE
              </h1>
            </div>
            <div className="flex flex-row p-12 justify-end">
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpen(true);
                }}>
                ADD NEW
              </Button>
            </div>
            <div className="flex flex-col w-full p-4">
              <AddFamilyDialog
                handleClose={handleClose}
                open={open}
                mainForm={form}
                setMainForm={setForm}
                familyMembers={familyMembers}
                setFamilyMembers={setFamilyMembers}
              />

              <div className="flex flex-col w-full h-288">
                <TableContainer
                  className="flex flex-col w-full"
                  component={Paper}>
                  <Table
                    // className={classes.table}
                    stickyHeader
                    aria-label="customized table">
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
                        .map((row, index) => (
                          <StyledTableRow
                            key={row.customerId}
                            style={{ height: 10 }}>
                            <StyledTableCell>{row?.customCustomerId}</StyledTableCell>
                            <StyledTableCell>{row?.firstName}</StyledTableCell>
                            <StyledTableCell>{row?.lastName}</StyledTableCell>
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
        </div>
      </div>
      <div className="flex flex-col px-10 md:my-0 mt-44 mb-20">
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={() => {
            if (!form?.customerId) {
              let count = 0;
              customers.map((row) => {
                if (
                  row?.firstName === form?.firstName &&
                  row?.lastName === form?.lastName &&
                  row?.dob.toDate().getDate() === form?.dob.getDate() &&
                  row?.dob.toDate().getMonth() === form?.dob.getMonth() &&
                  row?.dob.toDate().getYear() === form?.dob.getYear()
                ) {
                  count++;
                }
                return null;
              });
              if (count > 0) {
                setOpenAlertOnSave(true);
                toast.error('Customer already exists!', {
                  position: 'top-center',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  transition: Zoom
                });
              } else {
                setOpenAlertOnSave(true);
              }
            } else {
              setOpenAlertOnSave(true);
              return;
            }
          }}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default withReducer('eCommerceApp', reducer)(UpdateCustomerForm);
