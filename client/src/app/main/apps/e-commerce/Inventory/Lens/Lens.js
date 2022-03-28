import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Panel, SearchBox } from 'react-instantsearch-dom';
import { connectHits } from 'react-instantsearch-dom';
import { RefinementList } from 'react-instantsearch-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from 'react-router';
import '../../Customers/Search.css';
import '../../Customers/Themes.css';

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);

const Hits = ({ hits }) => {
  const classes = useStyles();

  return (
    <div className="flex flex-col ml-8 w-full">
      <div className="flex flex-row w-full">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SKU</StyledTableCell>
              <StyledTableCell>Lens Material</StyledTableCell>
              <StyledTableCell>Sphere</StyledTableCell>
              <StyledTableCell>Cylinder</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hits
              .sort((a, b) => (a.lensId < b.lensId ? -1 : 1))
              .map((row) => (
                <StyledTableRow key={row.lensId}>
                  <StyledTableCell component="th" scope="row">
                    {row.sku}
                  </StyledTableCell>
                  <StyledTableCell>{row.material}</StyledTableCell>
                  <StyledTableCell>{row.sphere}</StyledTableCell>
                  <StyledTableCell>{row.cylinder}</StyledTableCell>
                  <StyledTableCell>{row.quantity}</StyledTableCell>
                  <StyledTableCell>
                    <Link
                      to={`/apps/inventory/addlens/${row.lensId}`}
                      className="btn btn-primary">
                      <IconButton aria-label="edit">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
const CustomHits = connectHits(Hits);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
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
  table: {
    minWidth: 700
  }
});

const Lens = (props) => {
  // const [isLoading, setisLoading] = useState(false);

  // if (!isLoading) return <FuseLoading />;
  return (
    <div className="flex flex-col w-full h-full">
      <InstantSearch searchClient={searchClient} indexName="lens">
        <TableContainer component={Paper} className="flex flex-col w-full ">
          <div className="flex flex-row">
            <div className="flex flex-col flex-1"></div>
            <div className="flex flex-col flex-1 mb-10 rounded-12 shadow-10">
              <SearchBox
                translations={{
                  placeholder: 'Searh for lens...'
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
              />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex w-full justify-end">
                <Button
                  className="whitespace-no-wrap normal-case mb-24 ml-24"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    props.history.push('/apps/inventory/addlens');
                  }}>
                  Add Inventory
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-col w-1/4 ">
              <div className="p-8 mb-10 rounded-12 shadow-5">
                <Panel header="Sphere">
                  <RefinementList
                    attribute="sphere"
                    limit={4}
                    searchable={true}
                    translations={{
                      placeholder: 'Search for sphere…'
                    }}
                  />
                </Panel>
              </div>
              <div className="p-8 mb-10 rounded-12 shadow-5">
                <Panel header="Cylinder">
                  <RefinementList
                    attribute="cylinder"
                    limit={4}
                    searchable={true}
                    translations={{
                      placeholder: 'Search for cylinder…'
                    }}
                  />
                </Panel>
              </div>
              <div className="p-8 mb-10 rounded-12 shadow-5">
                <Panel header="Material">
                  <RefinementList
                    attribute="material"
                    limit={4}
                    searchable={true}
                    translations={{
                      placeholder: 'Search for materials…'
                    }}
                  />
                </Panel>
              </div>
            </div>
            <div className="flex flex-1">
              <CustomHits />
            </div>
          </div>
        </TableContainer>
      </InstantSearch>
    </div>
  );
};

export default withRouter(Lens);