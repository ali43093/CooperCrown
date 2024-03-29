import { customValuesArrayGenerator, sortAlphabetically, visualAquityDropDownValues } from '../ReusableComponents/HelperFunctions';
import { firestore } from 'firebase';
import { Icon, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { withRouter } from 'react-router';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  centerText: {
    textAlign: 'center',
  },
});

const VisualAcuity = (props) => {
  const classes = useStyles();
  const { form, handleChange, disabledState, setForm } = props;
  const [contactLens, setContactLens] = useState([])
  const [filteredContactLensOd, setFilteredContactLensOd] = useState(contactLens)
  const [filteredContactLensOs, setFilteredContactLensOs] = useState(contactLens)

  useEffect(() => {
    const fetchContacts = async () => {
      const queryContactLens = await firestore().collection('contacts').get();

      let resultContacts = [];
      queryContactLens.forEach((doc) => {
        resultContacts.push(doc.data());
      });
      setContactLens(resultContacts);
      setFilteredContactLensOd(resultContacts);
      setFilteredContactLensOs(resultContacts);
    }
    fetchContacts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterOdContacts = (value, attribute) => {
    let newContacts = filteredContactLensOd.filter((contact) => contact?.[attribute] === value)
    setFilteredContactLensOd(newContacts)
  }
  const filterOsContacts = (value, attribute) => {
    let newContacts2 = filteredContactLensOs.filter((contact) => contact?.[attribute] === value)
    setFilteredContactLensOs(newContacts2)
  }

  return (
    <div className="flex flex-col h-260 px-16 py-6">
      <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
        <div className="flex flex-row justify-center border-b-1 border-black border-solid">
          <h1 className="font-700" style={{ color: '#f15a25' }}>
            VISUAL ACUITY
          </h1>
        </div>
        <br></br>
        <div className=" border-b-1 border-black border-solid px-11">
          <div className="p-16 sm:p-24 w-full">
            <div className="flex flex-row justify-around px-10 w-full">
              <div className="flex flex-col h-260 py-6 w-full">
                <div className="justify-around py-30">
                  <div className="flex flex-row justify-around px-16">

                    <h3 className="font-700">Far</h3>

                    <h3 className="font-700">Near</h3>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="px-6 py-12 w-1/2 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-row w-full justify-around gap-10">
                        <h3>Unaided</h3>
                        <h3>Aided</h3>
                      </div>
                      <div className="flex flex-row w-full justify-around items-end gap-10">
                        <h3 className="font-700">OD:</h3>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.farOd ?? ''}
                            name="farOd"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.farOd2 ?? ''}
                            name="farOd2"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-row w-full justify-around items-end gap-10">
                        <h3 className="font-700">OS:</h3>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.farOs ?? ''}
                            name="farOs"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.farOs2 ?? ''}
                            name="farOs2"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-row w-full justify-around items-end gap-10">
                        <h3 className="font-700">OS:</h3>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.farOu ?? ''}
                            name="farOu"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.farOu2 ?? ''}
                            name="farOu2"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="px-6 py-12 w-1/2 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-row w-full justify-around gap-10">
                        <h3>Unaided</h3>
                        <h3>Aided</h3>
                      </div>
                      <div className="flex flex-row w-full justify-around items-end gap-10">
                        <h3 className="font-700">OD:</h3>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.nearOd ?? ''}
                            name="nearOd"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.nearOd2 ?? ''}
                            name="nearOd2"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-row w-full justify-around items-end gap-10">
                        <h3 className="font-700">OS:</h3>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.nearOs ?? ''}
                            name="nearOs"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.nearOs2 ?? ''}
                            name="nearOs2"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                      <div className="flex flex-row w-full justify-around items-end gap-10">
                        <h3 className="font-700">OU:</h3>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.nearOu ?? ''}
                            name="nearOu"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className='flex flex-col w-1/2'>
                          <Select
                            className={classes.centerText}
                            disabled={disabledState}
                            value={form?.nearOu2 ?? ''}
                            name="nearOu2"
                            onChange={handleChange}
                          >
                            {visualAquityDropDownValues.map((row) => (
                              <MenuItem key={row} value={row}>{row}</MenuItem>
                            ))}
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className='flex flex-col w-full px-24 gap-10'>
              <div className='flex flex-row w-full gap-10'>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="font-700"> IOP</h3>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="IOP"
                      name="IOP"
                      value={form?.IOP}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="NCT"
                        control={<Radio />}
                        disabled={disabledState}
                        label="NCT"
                      />
                      <FormControlLabel
                        value="GAT"
                        disabled={disabledState}
                        control={<Radio />}
                        label="GAT"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="font-700">OD:</h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    disabled={disabledState}
                    value={form?.odmmhg}
                    onChange={handleChange}
                    name={'odmmhg'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                  <h3 className="font-700">mmHg</h3>
                </div>
              </div>
              <div className='flex flex-row w-full gap-10'>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="font-700">Time:</h3>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                      className="m-0 w-160"
                      size="small"
                      margin="normal"
                      disabled={disabledState}
                      id="time-picker"
                      value={form?.examTime}
                      onChange={(date) => {
                        handleChange({
                          target: { name: 'examTime', value: date }
                        });
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change time'
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </div>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="font-700">OS:</h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    disabled={disabledState}
                    value={form?.osmmhg}
                    onChange={handleChange}
                    name={'osmmhg'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                  <h3 className="font-700">mmHg</h3>
                </div>
              </div>
              <div className='flex flex-row w-full gap-10'>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="text-center font-700 truncate">Color Vision/Ishihara:</h3>
                  <h3 className="font-700">OD:</h3>
                  <TextField
                    size="small"
                    style={{ width: 65 }}
                    id="standard-basic"
                    value={form?.odVision}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'odVision '}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                  <h3 className="font-700">/7</h3>
                </div>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="font-700">OS:</h3>
                  <TextField
                    size="small"
                    style={{ width: 65 }}
                    id="standard-basic"
                    value={form?.osVision}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'osVision '}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                  <h3 className="font-700">{`/ 7`}</h3>
                </div>
              </div>
              <div className='flex flex-row w-full gap-10'>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="font-700">Stereopsis:</h3>
                  <TextField
                    size="small"
                    style={{ width: 85 }}
                    id="standard-basic"
                    value={form?.Stereopsistime}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'Stereopsistime '}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                  <h3 className="font-700">sec</h3>
                </div>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="text-center font-700">Binocular:</h3>
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="binouler"
                      name="binouler"
                      value={form?.binouler}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="Yes"
                        control={<Radio />}
                        disabled={disabledState}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="No"
                        disabled={disabledState}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className='flex flex-row w-full gap-10'>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="font-700">{'Phoria: (H)'}</h3>
                  <TextField
                    size="small"
                    style={{ width: 85 }}
                    id="standard-basic"
                    value={form?.Phoriah}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'Phoriah'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                  <FormControl component="fieldset" >
                    <RadioGroup
                      row
                      aria-label="Phoriah"
                      name="Phoriah"
                      value={form?.Phoriah}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="XP"
                        control={<Radio />}
                        disabled={disabledState}
                        label="XP"
                      />
                      <FormControlLabel
                        value="EP"
                        disabled={disabledState}
                        control={<Radio />}
                        label="EP"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="font-700">{'(V)'}:</h3>
                  <TextField
                    size="small"
                    style={{ width: 85 }}
                    id="standard-basic"
                    value={form?.Phoriav}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'Phoriav'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="Phoriav"
                      name="Phoriav"
                      value={form?.Phoriav}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="RH"
                        control={<Radio />}
                        disabled={disabledState}
                        label="RH"
                      />
                      <FormControlLabel
                        value="LH"
                        disabled={disabledState}
                        control={<Radio />}
                        label="LH"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
              <div className='flex flex-row w-full gap-10'>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <div>
                    <h3 className="font-700 truncate">{`Blood Pressure: `}</h3>
                    <h3 className="font-400 truncate text-center">{`(mmHg)`}</h3>
                  </div>
                  <TextField
                    size="small"
                    style={{ width: 70 }}
                    id="standard-basic"
                    disabled={disabledState}
                    value={form?.bpUp}
                    onChange={handleChange}
                    name={'bpUp'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                  <h3 className="font-700">/</h3>
                  <TextField
                    size="small"
                    style={{ width: 70 }}
                    id="standard-basic"
                    disabled={disabledState}
                    value={form?.bpDown}
                    onChange={handleChange}
                    name={'bpDown'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                </div>
                <div className='flex flex-row w-1/2 justify-start gap-10 items-center'>
                  <h3 className="font-700 truncate w-84">@ Time</h3>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container>
                      <KeyboardTimePicker
                        margin="normal"
                        disabled={disabledState}
                        id="time-picker"
                        value={form?.bpTime}
                        onChange={(date) => {
                          handleChange({ target: { name: 'bpTime', value: date } });
                        }}
                        KeyboardButtonProps={{
                          'aria-label': 'change time'
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-10 w-full">
            <div className="flex flex-row px-20">
              <div className="p-1 h-auto flex-1">
                <h3 className="text-center font-700">EG RX</h3>
              </div>
              <div className="p-1 h-auto flex-1">
                <h3 className="text-center font-700">Sphere</h3>
              </div>
              <div className="p-1 h-auto flex-1">
                <h3 className="text-center font-700">Cylinder</h3>
              </div>
              <div className="p-1 h-auto flex-1">
                <h3 className="text-center font-700">Axis</h3>
              </div>
              <div className="p-1 h-auto flex-1">
                <h3 className="text-center font-700">Add</h3>
              </div>
            </div>

            <div className="flex flex-row px-20">
              <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                <h4 className="text-center font-700">OD</h4>
              </div>
              <div className="flex flex-col flex-1 h-auto border-grey-400 border-solid border-1">
                <Select
                  className={classes.centerText}
                  disabled={disabledState}
                  value={form?.odSphere ?? 'blank'}
                  name="odSphere"
                  onChange={handleChange}
                >
                  {customValuesArrayGenerator(-30, 30, 0.25, true).map((row) => (
                    <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col flex-1 h-auto border-grey-400 border-solid border-1">
                <Select
                  className={classes.centerText}
                  disabled={disabledState}
                  value={form?.odCylinder ?? ''}
                  name="odCylinder"
                  onChange={handleChange}
                >
                  {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                    <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                <TextField
                  size="small"
                  fullWidth
                  id="standard-basic"
                  value={form?.odAxis}
                  disabled={disabledState}
                  onChange={handleChange}
                  name={'odAxis'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                  type="number"
                />
              </div>
              <div className="flex flex-col flex-1 h-auto border-grey-400 border-solid border-1">
                <Select
                  className={classes.centerText}
                  disabled={disabledState}
                  value={form?.odAdd ?? ''}
                  name="odAdd"
                  onChange={handleChange}
                >
                  {customValuesArrayGenerator(0.25, 5, 0.25).map((row) => (
                    <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-row px-20">
              <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                <h4 className="text-center font-700">OS</h4>
              </div>
              <div className="flex flex-col flex-1 h-auto border-grey-400 border-solid border-1">
                <Select
                  className={classes.centerText}
                  disabled={disabledState}
                  value={form?.osSphere ?? 'blank'}
                  name="osSphere"
                  onChange={handleChange}
                >
                  {customValuesArrayGenerator(-30, 30, 0.25, true).map((row) => (
                    <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col flex-1 h-auto border-grey-400 border-solid border-1">
                <Select
                  className={classes.centerText}
                  disabled={disabledState}
                  value={form?.osCylinder ?? ''}
                  name="osCylinder"
                  onChange={handleChange}
                >
                  {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                    <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                  ))}
                </Select>
              </div>
              <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                <TextField
                  size="small"
                  fullWidth
                  id="standard-basic"
                  disabled={disabledState}
                  value={form?.osAxis}
                  onChange={handleChange}
                  name={'osAxis'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                  type="number"
                />
              </div>
              <div className="flex flex-col flex-1 h-auto border-grey-400 border-solid border-1">
                <Select
                  className={classes.centerText}
                  disabled={disabledState}
                  value={form?.osAdd ?? ''}
                  name="osAdd"
                  onChange={handleChange}
                >
                  {customValuesArrayGenerator(0.25, 5, 0.25).map((row) => (
                    <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className=' flex flex-row w-full justify-center'>
            <div className='flex flex-row w-1/3 py-4'>
              <h3 className='truncate w-128'>Age Hab RX: </h3>
              <TextField
                size="small"
                disabled={disabledState}
                id="standard-basic"
                value={form?.ageHabRx}
                onChange={handleChange}
                name={'ageHabRx'}
                InputProps={{
                  inputProps: {
                    style: { textAlign: 'center' }
                  }
                }}
              />
            </div>
          </div>
          <div className='w-full h-2 bg-black'></div>

          <div className="p-6 w-full">

            <div className="flex justify-around flex-row w-full">

              <div className=" w-full h-auto justify-between">
                <div className="flex flex-row justify-around">
                  <div className="ml-20 h-auto flex-1">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form?.diagnosticLenses}
                          onChange={handleChange}
                          disabled={disabledState}
                          name="diagnosticLenses"
                        />
                      }
                      label="Diagnostic Lenses"
                    />
                  </div>
                  <div className=" h-auto flex-1">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form?.seeAtDispense}
                          onChange={handleChange}
                          disabled={disabledState}
                          name="seeAtDispense"
                        />
                      }
                      label="See At Dispense"
                    />
                  </div>
                  <div className=" h-auto flex-1">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form?.finalRx}
                          disabled={disabledState}
                          onChange={handleChange}
                          name="finalRx"
                        />
                      }
                      label="Final Rx"
                    />
                  </div>
                  <div className=" h-auto flex-1">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form?.followUpRequired}
                          onChange={handleChange}
                          disabled={disabledState}
                          name="followUpRequired"
                        />
                      }
                      label="Follow-Up Required"
                    />
                  </div>
                  <div className=" h-auto flex-1">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form?.R1}
                          disabled={disabledState}
                          onChange={handleChange}
                          name="R1"
                        />
                      }
                      label={`I \u00A0\u00A0& \u00A0\u00A0R`}
                    />
                  </div>
                </div>

                <div className="py-10 w-full">
                  <div className="flex flex-row">
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">CL RX</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Sphere</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Cylinder</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Axis</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Add</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">BC</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">DIA</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Brand</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Model</h3>
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className="flex flex-row flex-1 h-auto border-grey-400 border-solid border-1 justify-around items-center">
                      <h3 className="text-center font-700">OD</h3>
                      <IconButton
                        onClick={(ev) => {
                          setFilteredContactLensOd(contactLens)
                          setForm({ ...form, clrxOdBrand: undefined, clrxOdModel: undefined })
                        }}>
                        <Icon color="action">
                          delete
                        </Icon>
                      </IconButton>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.clrxOdSphere ?? 'blank'}
                        name="clrxOdSphere"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-30, 30, 0.25, true).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.clrxOdCylinder ?? ''}
                        name="clrxOdCylinder"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.clrxOdAxis}
                        onChange={handleChange}
                        disabled={disabledState}
                        name={'clrxOdAxis'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.clrxOdAdd}
                        onChange={handleChange}
                        disabled={disabledState}
                        name={'clrxOdAdd'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.clrxOdBc}
                        disabled={disabledState}
                        onChange={handleChange}
                        name={'clrxOdBc'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.clrxOdDia}
                        disabled={disabledState}
                        onChange={handleChange}
                        name={'clrxOdDia'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="flex flex-col flex-1 h-auto border-grey-400 border-solid border-1 justify-between relative overflow-hidden">
                      <Select
                        className='truncate'
                        disabled={disabledState}
                        labelId="demo-simple-select-autowidth-label"
                        value={form?.clrxOdBrand ?? ''}
                        name="clrxOdBrand"
                        onChange={(e) => {
                          handleChange(e)
                          filterOdContacts(e.target.value, 'brand')
                        }}>
                        {[...new Set(sortAlphabetically(filteredContactLensOd, 'brand')?.map((item) => (item?.brand ?? '')))].map((row) => (
                          <MenuItem value={row}>
                            {row}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col flex-1 h-auto border-grey-400 border-solid border-1 justify-between relative overflow-hidden">
                      <Select
                        className='truncate'
                        disabled={disabledState}
                        labelId="demo-simple-select-autowidth-label"
                        value={form?.clrxOdModel ?? ''}
                        name="clrxOdModel"
                        onChange={(e) => {
                          handleChange(e)
                          filterOdContacts(e.target.value, 'model')
                        }}>
                        {[...new Set(sortAlphabetically(filteredContactLensOd, 'model')?.map((item) => (item?.model ?? '')))].map((row) => (<MenuItem value={row}>{row}</MenuItem>))}
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className="flex flex-row flex-1 h-auto border-grey-400 border-solid border-1 justify-around items-center">
                      <h3 className="text-center font-700">OS</h3>
                      <IconButton
                        onClick={(ev) => {
                          setFilteredContactLensOs(contactLens)
                          setForm({ ...form, clrxOsBrand: undefined, clrxOsModel: undefined })
                        }}>
                        <Icon color="action">
                          delete
                        </Icon>
                      </IconButton>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.clrxOsSphere ?? 'blank'}
                        name="clrxOsSphere"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-30, 30, 0.25, true).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.clrxOsCylinder ?? ''}
                        name="clrxOsCylinder"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.clrxOsAxis}
                        disabled={disabledState}
                        onChange={handleChange}
                        name={'clrxOsAxis'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.clrxOsAdd}
                        disabled={disabledState}
                        onChange={handleChange}
                        name={'clrxOsAdd'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.clrxOsBc}
                        disabled={disabledState}
                        onChange={handleChange}
                        name={'clrxOsBc'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.clrxOsDia}
                        onChange={handleChange}
                        disabled={disabledState}
                        name={'clrxOsDia'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="flex flex-col flex-1 h-auto border-grey-400 border-solid border-1 justify-between relative overflow-hidden">
                      <Select
                        className='truncate'
                        disabled={disabledState}
                        labelId="demo-simple-select-autowidth-label"
                        value={form?.clrxOsBrand ?? ''}
                        name="clrxOsBrand"
                        onChange={(e) => {
                          handleChange(e)
                          filterOsContacts(e.target.value, 'brand')
                        }}>
                        {[...new Set(filteredContactLensOs?.map((item) => (item?.brand ?? '')))].map((row) => (
                          <MenuItem value={row}>
                            {row}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col flex-1 h-auto border-grey-400 border-solid border-1 justify-between relative overflow-hidden">
                      <Select
                        className='truncate'
                        disabled={disabledState}
                        labelId="demo-simple-select-autowidth-label"
                        value={form?.clrxOsModel ?? ''}
                        name="clrxOsModel"
                        onChange={(e) => {
                          handleChange(e)
                          filterOsContacts(e.target.value, 'model')
                        }}>
                        {[...new Set(filteredContactLensOs?.map((item) => (item?.model ?? '')))].map((row) => (
                          <MenuItem value={row}>
                            {row}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-around my-10 w-full px-60'>
                  <TextField
                    // className="mt-12"
                    size="medium"
                    disabled={disabledState}
                    id="outlined-multiline-static"
                    label="Memo"
                    value={form?.clrxMemo}
                    onChange={handleChange}
                    name={'clrxMemo'}
                    variant="outlined"
                  />
                </div>
                <div className=" py-10 w-full">

                  <div className="flex flex-row justify-around">
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">SUBJ RX</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Sphere</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Cylinder</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Axis</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Prism/Base</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">VA</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Add</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">VA</h3>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <h3 className="text-center font-700">OD</h3>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.subjRxOdSphere ?? 'blank'}
                        name="subjRxOdSphere"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-30, 30, 0.25, true).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.subjRxOdCylinder ?? ''}
                        name="subjRxOdCylinder"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.subjRxOdAxis}
                        disabled={disabledState}
                        onChange={handleChange}
                        name={'subjRxOdAxis'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.subjRxOdPrismBase}
                        onChange={handleChange}
                        name={'subjRxOdPrismBase'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-col">
                        <Select
                          className={classes.centerText}
                          disabled={disabledState}
                          value={form?.subjRxOdVa1 ?? ''}
                          name="subjRxOdVa1"
                          onChange={handleChange}
                        >
                          {visualAquityDropDownValues.map((row) => (
                            <MenuItem key={row} value={row}>{row}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.subjRxOdAdd ?? ''}
                        name="subjRxOdAdd"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(0.25, 5, 0.25).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-col">
                        <Select
                          className={classes.centerText}
                          disabled={disabledState}
                          value={form?.subjRxOdVa2 ?? ''}
                          name="subjRxOdVa2"
                          onChange={handleChange}
                        >
                          {visualAquityDropDownValues.map((row) => (
                            <MenuItem key={row} value={row}>{row}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row">
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <h3 className="text-center font-700">OS</h3>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.subjRxOsSphere ?? 'blank'}
                        name="subjRxOsSphere"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-30, 30, 0.25, true).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.subjRxOsCylinder ?? ''}
                        name="subjRxOsCylinder"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.subjRxOsAxis}
                        onChange={handleChange}
                        name={'subjRxOsAxis'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        disabled={disabledState}
                        id="standard-basic"
                        value={form?.subjRxOsPrismBase}
                        onChange={handleChange}
                        name={'subjRxOsPrismBase'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-col">
                        <Select
                          className={classes.centerText}
                          disabled={disabledState}
                          value={form?.subjRxOsVa1 ?? ''}
                          name="subjRxOsVa1"
                          onChange={handleChange}
                        >
                          {visualAquityDropDownValues.map((row) => (
                            <MenuItem key={row} value={row}>{row}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.subjRxOsAdd ?? ''}
                        name="subjRxOsAdd"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(0.25, 5, 0.25).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-col">
                        <Select
                          className={classes.centerText}
                          disabled={disabledState}
                          value={form?.subjRxOsVa2 ?? ''}
                          name="subjRxOsVa2"
                          onChange={handleChange}
                        >
                          {visualAquityDropDownValues.map((row) => (
                            <MenuItem key={row} value={row}>{row}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full py-10">

                  <div className="flex flex-row">
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">EG RX</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Sphere</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Cylinder</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Axis</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Prism/Base</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">VA</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">Add</h3>
                    </div>
                    <div className="p-1 h-auto flex-1">
                      <h3 className="text-center font-700">VA</h3>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <h3 className="text-center font-700">OD</h3>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.egRxOdSphere ?? 'blank'}
                        name="egRxOdSphere"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-30, 30, 0.25, true).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.egRxOdCylinder ?? ''}
                        name="egRxOdCylinder"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.egRxOdAxis}
                        disabled={disabledState}
                        onChange={handleChange}
                        name={'egRxOdAxis'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.egRxOdPrismBase}
                        onChange={handleChange}
                        name={'egRxOdPrismBase'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-col">
                        <Select
                          className={classes.centerText}
                          disabled={disabledState}
                          value={form?.egRxOdVa1 ?? ''}
                          name="egRxOdVa1"
                          onChange={handleChange}
                        >
                          {visualAquityDropDownValues.map((row) => (
                            <MenuItem key={row} value={row}>{row}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.egRxOdAdd ?? ''}
                        name="egRxOdAdd"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(0.25, 5, 0.25).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-col">
                        <Select
                          className={classes.centerText}
                          disabled={disabledState}
                          value={form?.egRxOdVa2 ?? ''}
                          name="egRxOdVa2"
                          onChange={handleChange}
                        >
                          {visualAquityDropDownValues.map((row) => (
                            <MenuItem key={row} value={row}>{row}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <h3 className="text-center font-700">OS</h3>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.egRxOsSphere ?? 'blank'}
                        name="egRxOsSphere"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-30, 30, 0.25, true).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.egRxOsCylinder ?? ''}
                        name="egRxOsCylinder"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.egRxOsAxis}
                        onChange={handleChange}
                        name={'egRxOsAxis'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.egRxOsPrismBase}
                        onChange={handleChange}
                        name={'egRxOsPrismBase'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-col">
                        <Select
                          className={classes.centerText}
                          disabled={disabledState}
                          value={form?.egRxOsVa1 ?? ''}
                          name="egRxOsVa1"
                          onChange={handleChange}
                        >
                          {visualAquityDropDownValues.map((row) => (
                            <MenuItem key={row} value={row}>{row}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 border-grey-400 border-solid border-1">
                      <Select
                        className={classes.centerText}
                        disabled={disabledState}
                        value={form?.egRxOsAdd ?? ''}
                        name="egRxOsAdd"
                        onChange={handleChange}
                      >
                        {customValuesArrayGenerator(0.25, 5, 0.25).map((row) => (
                          <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                        ))}
                      </Select>
                    </div>
                    <div className="p-1 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-col">
                        <Select
                          className={classes.centerText}
                          disabled={disabledState}
                          value={form?.egRxOsVa2 ?? ''}
                          name="egRxOsVa2"
                          onChange={handleChange}
                        >
                          {visualAquityDropDownValues.map((row) => (
                            <MenuItem key={row} value={row}>{row}</MenuItem>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col justify-around my-10 w-full px-60'>
                  <TextField
                    // className="mt-12"
                    size="medium"
                    disabled={disabledState}
                    id="outlined-multiline-static"
                    label="Memo"
                    value={form?.egrxMemo}
                    onChange={handleChange}
                    name={'egrxMemo'}
                    variant="outlined"
                  />
                </div>
                <div className="flex flex-row px-60">
                  <TextField
                    className="mt-12"
                    size="medium"
                    disabled={disabledState}
                    id="outlined-multiline-static"
                    label="NRA/PRA"
                    value={form?.nraPra}
                    onChange={handleChange}
                    name={'nraPra'}
                    variant="outlined"
                  />
                  <TextField
                    className="ml-12 mt-12"
                    size="medium"
                    disabled={disabledState}
                    id="outlined-multiline-static"
                    label="BCC"
                    value={form?.bcc}
                    onChange={handleChange}
                    name={'bcc'}
                    variant="outlined"
                  />
                </div>
                <div className="flex flex-row px-60">
                  <TextField
                    className="mt-10 "
                    fullWidth
                    InputProps={{ style: { fontSize: 20 } }}
                    disabled={disabledState}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    id="outlined-multiline-static"
                    label="Additional Testing"
                    multiline
                    rows={3}
                    value={form?.additionalTesting}
                    onChange={handleChange}
                    name={'additionalTesting'}
                    variant="outlined"
                  />

                  <br></br>
                </div>
              </div>
            </div>
          </div>
          <br></br>
        </div>
        <div className='flex flex-row w-full justify-center py-4 px-10 items-center h-auto gap-10'>
          <TextField
            size="small"
            style={{ width: 150 }}
            label="CT: UCT"
            id="outlined-multiline-static"
            disabled={disabledState}
            value={form?.ctUct}
            onChange={handleChange}
            name={'ctUct'}
            variant="outlined"

          />
          <TextField
            size="small"
            style={{ width: 150 }}
            label="CF: OD"
            id="outlined-multiline-static"
            disabled={disabledState}
            value={form?.cfod}
            onChange={handleChange}
            name={'cfod'}
            variant="outlined"
          />
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="cfOd"
              name="cfOd"
              value={form?.cfOd}
              onChange={handleChange}>
              <FormControlLabel
                value="ftfc"
                disabled={disabledState}
                control={<Radio />}
                label="FTFC"
              />
              <FormControlLabel
                value="other"
                disabled={disabledState}
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          {form?.cfOd === 'other' && (
            <TextField
              size="small"
              style={{ width: 150 }}
              disabled={disabledState}
              id="outlined-multiline-static"
              label="Other"
              value={form?.otherCfod}
              onChange={handleChange}
              name={'otherCfod'}
              variant="outlined"
            />
          )}
        </div>
        <div className='flex flex-row w-full justify-center py-4 px-10 items-center h-auto gap-10'>
          <TextField
            size="small"
            style={{ width: 150 }}
            id="outlined-multiline-static"
            disabled={disabledState}
            value={form?.cscAct}
            onChange={handleChange}
            name={'cscAct'}
            variant="outlined"
            label="ACT"
          />
          <TextField
            size="small"
            style={{ width: 150 }}
            label="CF: OS"
            id="outlined-multiline-static"
            disabled={disabledState}
            value={form?.cfos}
            onChange={handleChange}
            name={'cfos'}
            variant="outlined"
          />
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="cfOs"
              name="cfOs"
              value={form?.cfOs}
              onChange={handleChange}>
              <FormControlLabel
                value="ftfc2"
                disabled={disabledState}
                control={<Radio />}
                label="FTFC"
              />
              <FormControlLabel
                value="other"
                disabled={disabledState}
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          {form?.cfOs === 'other' && (
            <TextField
              size="small"
              style={{ width: 150 }}
              disabled={disabledState}
              id="outlined-multiline-static"
              label="Other"
              value={form?.cfOsOther}
              onChange={handleChange}
              name={'cfOsOther'}
              variant="outlined"
            />
          )}
        </div>
        <div className='flex flex-row w-full justify-center py-4 px-10 items-center h-auto gap-10'>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="act"
              name="act"
              value={form?.act}
              onChange={handleChange}>
              <FormControlLabel
                value="C"
                disabled={disabledState}
                control={<Radio />}
                label="C"
              />

              <FormControlLabel
                classname="ml-3"
                value="SC"
                disabled={disabledState}
                control={<Radio />}
                label="SC"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="p-16 sm:p-24 w-full">

          <div className="flex flex-row justify-center ">
            <div className="  h-auto justify-around">
              <div className="flex flex-row justify-center">
                <h3 className="font-700 pl-6 pt-6">{`EOM'S OD\u00A0\u00A0\u00A0\u00A0`}</h3>

                <div className="ml-10">
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="eodod"
                      name="eodod"
                      value={form?.eodod}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="From"
                        disabled={disabledState}
                        control={<Radio />}
                        label="Full"
                      />
                      <FormControlLabel
                        value="other"
                        disabled={disabledState}
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  {form?.eodod === 'other' && (
                    <TextField
                      className="ml-8"
                      size="small"
                      disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Other"
                      value={form?.eomOdFromOther1}
                      onChange={handleChange}
                      name={'eomOdFromOther1'}
                      variant="outlined"
                    />
                  )}
                </div>

              </div>
              <div className="flex flex-row justify-center">
                <h3 className="font-700 pl-6 pt-6">{`EOM'S OS\u00A0\u00A0\u00A0\u00A0`}</h3>

                <div className="ml-10">
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="eodos"
                      name="eodos"
                      value={form?.eodos}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="From"
                        disabled={disabledState}
                        control={<Radio />}
                        label="Full"
                      />
                      <FormControlLabel
                        value="other"
                        disabled={disabledState}
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  {form?.eodos === 'other' && (
                    <TextField
                      className="ml-8"
                      size="small"
                      disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Other"
                      value={form?.eomOsFromOther}
                      onChange={handleChange}
                      name={'eomOsFromOther'}
                      variant="outlined"
                    />
                  )}
                  <br></br><br></br>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(VisualAcuity);
