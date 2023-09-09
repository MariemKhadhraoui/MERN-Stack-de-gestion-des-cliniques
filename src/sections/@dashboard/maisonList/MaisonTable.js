import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link } from 'react-router-dom';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import ClinicForm from '../../../components/ClincForm/ClincForm';

import Label from '../../../components/label';
import Scrollbar from '../../../components/scrollbar';
import Iconify from '../../../components/iconify';
import MAISONLIST from '../../../_mock/maisons';

import MaisonListHead from './MaisonListHead';
import MaisonListToolbar from './MaisonListToolbar';
import MaisonViewDetails from '../MaisonView/MaisonViewDetails';
import MaisonEditHouse from '../MaisonEdit/MaisonEditHouse';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'titre', label: 'titre', alignRight: false },
  { id: 'region', label: 'region', alignRight: false },
  { id: 'adresse', label: 'adresse', alignRight: false },
  { id: 'Tel', label: 'Tel', alignRight: false },

 
];

// ________________________________________________________________________________________

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.titre.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    // Change 'name' to 'titre' or any other property you want to filter based on
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function MaisonTable() {
  const [isNewUserFormOpen, setIsNewUserFormOpen] = useState(false);

  const [viewDetials, SetViewDetials] = useState(false);

  const [EditMode, SetEditMode] = useState(false);

  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('titre');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedHouse, setSelectedHouse] = useState(null);
  
  const handleOpenNewUserForm = () => {
    setIsNewUserFormOpen(true);
  };
  
  const handleCloseNewUserForm = () => {
    setIsNewUserFormOpen(false);
  };

  const handleViewDetails = () => {
    SetViewDetials(true);
  };

  const handleEdit = () => {
    SetEditMode(true);
    handleCloseMenu();
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = MAISONLIST.map((n) => n.titre);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, titre) => {
    const selectedIndex = selected.indexOf(titre);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, titre);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - MAISONLIST.length) : 0;
  const filteredMasions = applySortFilter(MAISONLIST, getComparator(order, orderBy), filterName);
  const isNotFound = !filteredMasions.length && !!filterName;

  const changeSelectedHouse = (row) => {
    setSelectedHouse(row);
  };
  const [isDialogOpen, setDialogOpen] = useState(false);

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleDelete = () => {
    // Replace this with your actual delete logic
    console.log('Item deleted');
    closeDialog(); // Close the dialog after successful delete
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Clinic | Minimal UI </title>
      </Helmet>
      {viewDetials ? (
        <MaisonViewDetails
          handleOpen={() => {
            SetViewDetials(false);
          }}
          house={selectedHouse}
        />
      ) : EditMode ? (
        <MaisonEditHouse
          handleOpen={() => {
            SetEditMode(false);
          }}
          house={selectedHouse}
        />
      ) : (
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h4" gutterBottom>
              Clinic List
            </Typography>
           
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}onClick={handleOpenNewUserForm}  >
            New Clinc Form
          </Button>
        </Stack>
        {isNewUserFormOpen && (  <ClinicForm onClose={handleCloseNewUserForm} />  )}
          

          <Card>
            <MaisonListToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Scrollbar>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <MaisonListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={MAISONLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                  <TableBody>
                    {filteredMasions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      const { titre,region,adresse,tel  } = row;
                      const selectedUser = selected.indexOf(titre) !== -1;

                      return (
                        <TableRow
                          onClick={() => changeSelectedHouse(row)}
                          hover
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, titre)} />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {titre}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{region}</TableCell>

                        <TableCell align="left">{adresse}</TableCell>

                        <TableCell align="left">{tel}</TableCell>
              

                        
                          <TableCell align="right">     
                            <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                              <Iconify icon={'eva:more-vertical-fill'} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        );
                        })}
                        {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                        )}
                        </TableBody>

                        {isNotFound && (
                        <TableBody>
                        <TableRow>
                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                        </TableCell>
                        </TableRow>
                        </TableBody>
                        )}
                        </Table>
                        </TableContainer>
                        </Scrollbar>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={MAISONLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      )}

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem sx={{ color: 'info' }} onClick={handleViewDetails}>
          <Iconify icon={'eva:eye-outline'} sx={{ mr: 2 }} />
          View
        </MenuItem>

        <MenuItem sx={{ color: 'info' }} onClick={handleOpenNewUserForm}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <div>
      <MenuItem sx={{ color: 'error.main' }} onClick={openDialog}>
        <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
        Delete
      </MenuItem>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
      </Popover>
    </>
  );
}
