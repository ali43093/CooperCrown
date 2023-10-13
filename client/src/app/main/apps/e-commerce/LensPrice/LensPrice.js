import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Icon from '@material-ui/core/Icon';
import { firestore } from 'firebase';
import reducer from '../store/reducers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import AddLensTypeDialog from './AddLensTypeDialog';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  header: {
    minHeight: 160,
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 10,
    color: theme.palette.common.black,
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

function LensPrice(props) {
  const classes = useStyles(props);
  const [lensTypes, setLensTypes] = useState([]);
  const [filteredLensTypes, setfilteredLensTypes] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      const lensPrice = (
        await firestore().collection('lensPrice').doc('lensPrice').get()
      ).data();
      var keys = Object.keys(lensPrice);
      let lensTypes = [];
      keys.forEach((row) => {
        lensTypes.push(row.replace(/"/g, ''));
      });
      setLensTypes(lensTypes);
      setfilteredLensTypes(lensTypes);
    };


    fetchDetails();
  }, [open]);


  return (
    <FusePageSimple
      content={
        <div className="flex flex-col w-full">
          <div className={clsx(classes.header)}>
            <div className='flex flex-col h-full w-full'>
              <div className='flex flex-row w-full justify-center'>
                <Typography
                  className="flex uppercase"
                  style={{ fontSize: '3rem', fontWeight: 600 }}
                  variant="h6">
                  Lens Price
                </Typography>
              </div>
              <div className='flex flex-row w-full pt-32 pb-16'>
                <div className='flex flex-col items-center w-1/3'></div>
                <div className='flex flex-col items-center w-1/3'>
                  <Paper
                    className="flex items-center w-full px-8 py-4 rounded-8 bg-transparent border-1 border-white border-solid"
                    elevation={1}>
                    <Icon style={{ color: 'orange' }}>search</Icon>
                    <Input
                      placeholder="Search"
                      className="flex flex-1 mx-8 min-h-44 bg-transparent text-white"
                      disableUnderline
                      fullWidth
                      onChange={(e) => {
                        const inputValue = e.target.value.toLowerCase()
                        if (inputValue) {
                          const newTypes = lensTypes.filter((type) => type.toLowerCase().includes(inputValue));
                          setfilteredLensTypes(newTypes);
                        } else {
                          setfilteredLensTypes(lensTypes);
                        }
                      }}
                      inputProps={{
                        'aria-label': 'Search'
                      }}
                    />
                  </Paper>
                </div>
                <div className='flex flex-col items-center justify-center w-1/3'>
                  <Button
                    className={classes.button}
                    onClick={() =>
                      setOpen(true)
                    }
                    variant="contained"
                    color="secondary">
                    <span className="hidden sm:flex">ADD NEW</span>
                    <span className="flex sm:hidden">ADD</span>
                  </Button>
                </div>
              </div>
            </div>
            <AddLensTypeDialog open={open} handleClose={handleClose} />
          </div>

          <Table stickyHeader aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>LENS TYPE</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLensTypes.sort().map((hit, index) => (
                <StyledTableRow
                  key={index}
                  hover
                  className="cursor-pointer"
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/viewlens/${hit}`
                    );
                  }}
                >
                  <StyledTableCell component="th" scope="row">{hit}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(LensPrice);
