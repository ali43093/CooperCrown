import {
  InstantSearch,
  Panel,
  SearchBox,
  HitsPerPage,
  Pagination,
  connectRefinementList,
  ClearRefinements,
  Configure,
  connectStateResults
} from 'react-instantsearch-dom';
import { connectHits } from 'react-instantsearch-dom';
import { firestore } from 'firebase';
import { RefinementList } from 'react-instantsearch-dom';
import { toast, Zoom } from 'react-toastify';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import LoadingDialog from '../../ReusableComponents/LoadingDialog';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { sortAlphabetically } from '../../ReusableComponents/HelperFunctions';

const VirtualRefinementList = connectRefinementList(() => null);

const CustomHits = connectHits((props) => {
  const { hits, userData, history } = props;
  const [images, setImages] = useState([]);
  const classes = useStyles();
  const handleClick = async (item) => {
    const queryShowRoomInventory = await firestore()
      .collection('showRoomInventory')
      .where('showRoomInventoryId', '==', Number(item))
      .limit(1)
      .get();

    let resultShowRoomInventory = queryShowRoomInventory.docs[0].data();
    setImages(resultShowRoomInventory?.images?.urls);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row">
        {images?.length
          ? images?.map((img, index) => (
            <div className="mb-8 w-224 mr-6 ">
              <img
                className="w-full border-grey-300 border-1 relative shadow-1 rounded-4"
                src={img.url}
                key={img.name}
                alt={''}
              />
            </div>
          ))
          : 'No Pictures'}
      </div>

      <div className="flex flex-row w-full">
        <Table
          className={classes.table}
          stickyHeader
          aria-label="customized table">
          <TableHead>
            <TableRow style={{ height: 10 }}>
              <StyledTableCell>SKU</StyledTableCell>
              <StyledTableCell>BRAND</StyledTableCell>
              <StyledTableCell>MODEL</StyledTableCell>
              <StyledTableCell>COLOR</StyledTableCell>
              <StyledTableCell>MATERIAL</StyledTableCell>
              <StyledTableCell>SHAPE</StyledTableCell>
              <StyledTableCell>SIZE</StyledTableCell>
              <StyledTableCell>QTY</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hits
              .sort((a, b) =>
                a.showRoomInventoryId < b.showRoomInventoryId ? -1 : 1
              )
              .map((hit) => (
                <StyledTableRow
                  style={{ height: 10 }}
                  onClick={() => handleClick(hit.showRoomInventoryId)}
                  key={hit.showRoomInventoryId}
                  className="cursor-pointer">
                  <StyledTableCell onClick={() => {
                    if (userData.userRole === 'admin' || userData?.inventoryView) {
                      history.push(`/apps/inventory/viewshowroominventory/${hit.showRoomInventoryId}`);
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
                  }} style={{ color: 'red' }}>
                    {`\xa0\xa0\xa0 ${hit.sku}`}
                  </StyledTableCell>
                  <StyledTableCell>{hit.brand}</StyledTableCell>
                  <StyledTableCell>{hit.productDescription}</StyledTableCell>
                  <StyledTableCell>{hit.colour}</StyledTableCell>
                  <StyledTableCell>{hit.material}</StyledTableCell>
                  <StyledTableCell>{hit.shape}</StyledTableCell>
                  <StyledTableCell>
                    <div>
                      <div>{hit.sizeX}</div>
                      <div>{hit.sizeY}</div>
                      <div>{hit.sizeZ}</div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell>{hit.quantity}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 10,
    textAlign: 'center',
    maxWidth: 'min-content'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  tabHeader: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark,
    padding: '10',
    width: '100%'
  },
  table: {
    minWidth: 900
  },
  orangeButton: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
}));

const ShowRoomInventory = (props) => {
  const classes = useStyles();
  const [openFiltersDialog, setOpenFiltersDialog] = useState(false);
  const [searchState, setSearchState] = useState({});
  const [showRoomFilter, setShowRoomFilter] = useState('');
  const [showRooms, setShowRooms] = useState([]);
  const handleCloseFiltersDialog = () => {
    setOpenFiltersDialog(false);
  };
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  useEffect(() => {
    const fetchShowRooms = async () => {
      let showroomdata = [];
      const queryShowrooms = await firestore().collection('showRooms').get();

      queryShowrooms.forEach((doc) => {
        showroomdata.push(doc.data());
      });
      setShowRooms(sortAlphabetically(showroomdata, 'locationName'));
    };
    fetchShowRooms();
  }, []);

  const ResultStats = connectStateResults(
    ({ searching }) =>
      searching ? (<LoadingDialog />) : (<div></div>)
  );

  return (
    <div className="flex flex-col w-full h-full">
      <InstantSearch
        searchClient={props?.searchClient}
        indexName="showRoomInventory"
        onSearchStateChange={(state) => {
          if (
            openFiltersDialog &&
            (state.refinementList?.brand ||
              state.refinementList?.colour ||
              state.refinementList?.material)
          ) {
            setSearchState(state.refinementList);
          }
        }}>
        <div className={clsx(classes.tabHeader)}>
          <div className="flex flex-row items-center">
            <div className="flex flex-row flex-1 justify-around">
              <Button
                className=' bg-white'
                variant="contained"
                onClick={() => {
                  setOpenFiltersDialog(true);
                }}>
                <div className="h-16 w-16 mr-4">
                  <img
                    src="https://img.icons8.com/ios/50/000000/empty-filter.png"
                    alt=""
                  />
                </div>
                FILTERS
              </Button>
              <Button
                className=' bg-white'
                variant="contained"
                onClick={() => {
                  setSearchState({});
                  setShowRoomFilter(undefined);
                }}>
                <div className="h-16 w-16 mr-4">
                  <img
                    src="https://img.icons8.com/ios/50/000000/clear-filters.png"
                    alt=""
                  />
                </div>
                CLEAR
              </Button>
              <VirtualRefinementList
                defaultRefinement={searchState?.brand}
                attribute="brand"
              />
              <VirtualRefinementList
                defaultRefinement={searchState?.colour}
                attribute="colour"
              />
              <VirtualRefinementList
                defaultRefinement={searchState?.material}
                attribute="material"
              />
            </div>
            <div className="flex flex-col flex-1 my-10 headerSearch">
              <SearchBox
                translations={{
                  placeholder: 'Searh for showroom inventory...'
                }}
                submit={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 18 18">
                    <g
                      fill="none"
                      fillRule="evenodd"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.67"
                      transform="translate(1 1)">
                      <circle cx="7.11" cy="7.11" r="7.11" />
                      <path d="M16 16l-3.87-3.87" />
                    </g>
                  </svg>
                }
                reset={false}
              />
            </div>
            <div className="flex flex-col flex-1 justify-center">
              <div className="flex w-full justify-around">
                <FormControl>
                  <FormHelperText className="md:flex hidden" style={{ color: 'white' }}>
                    Select Showroom from the list
                  </FormHelperText>
                  <FormHelperText className="md:hidden flex" style={{ color: 'white' }}>
                    Select Showroom
                  </FormHelperText>
                  <Select
                    id="showRoomId"
                    style={{ color: 'white' }}
                    value={showRoomFilter}
                    onChange={(e) => {
                      setShowRoomFilter(e.target.value);
                    }}
                    autoWidth>
                    {showRooms.map((row) => (
                      <MenuItem value={row?.showRoomId}>
                        {row?.locationName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Configure
                  filters={showRoomFilter ? `showRoomId:${showRoomFilter}` : ''}
                />
                <Button
                  className={classes.orangeButton}
                  style={{
                    maxHeight: '40px',
                    minHeight: '40px'
                  }}
                  variant="contained"
                  onClick={() => {
                    if (userData.userRole === 'admin' || userData?.inventoryCreate) {
                      props.history.push('/apps/inventory/addshowroominventory');
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
                  }}>
                  ADD NEW
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <Dialog
              fullWidth
              maxWidth="lg"
              open={openFiltersDialog}
              onClose={handleCloseFiltersDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                <h2>Select Filters!</h2>
              </DialogTitle>
              <DialogContent>
                <div className="flex flex-row justify-between refinementList">
                  <div className="p-6">
                    <Panel header="Brands">
                      <RefinementList
                        attribute="brand"
                        limit={10}
                        showMore={true}
                        searchable={true}
                        translations={{
                          placeholder: 'Search for brands…'
                        }}
                      />
                    </Panel>
                  </div>
                  <div className="p-6">
                    <Panel header="Color">
                      <RefinementList
                        attribute="colour"
                        limit={10}
                        showMore={true}
                        searchable={true}
                        translations={{
                          placeholder: 'Search for colors…'
                        }}
                      />
                    </Panel>
                  </div>
                  <div className="p-6">
                    <Panel header="Material">
                      <RefinementList
                        attribute="material"
                        limit={10}
                        showMore={true}
                        searchable={true}
                        translations={{
                          placeholder: 'Search for materials…'
                        }}
                      />
                    </Panel>
                  </div>
                </div>
                <div className="flex flex-row p-12 justify-center">
                  <ClearRefinements
                    translations={{
                      reset: 'CLEAR ALL'
                    }}
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <ResultStats />
        <TableContainer className="flex flex-col w-full ">
          <CustomHits props={props} userData={userData} history={props?.history} />
        </TableContainer>
        <div className="flex flex-row justify-center">
          <div className="flex flex-1"></div>
          <div className="flex flex-1 justify-center pt-8">
            <Pagination showLast={true} />
          </div>
          <div className="flex flex-1 justify-center pt-8">
            <HitsPerPage
              defaultRefinement={50}
              items={[
                { value: 50, label: 'Show 50' },
                { value: 100, label: 'Show 100' },
                { value: 200, label: 'Show 200' }
              ]}
            />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default withRouter(ShowRoomInventory);
