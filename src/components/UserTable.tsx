import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TableSortLabel,
  TablePagination,
  Collapse,
  IconButton,
  Typography,
  Box,
  TextField
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import { User, Gender } from '@/utils/types';

interface UserTableProps {
  users: User[];
  onEdit: (user: User | null) => void; // Changed to allow null for adding new users
  onDelete: (userId: string) => void;
  onSearch: (query: string) => void;
  onSort: (order: 'asc' | 'desc', orderBy: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete, onSearch, onSort }) => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    onSort(isAsc ? 'desc' : 'asc', property);
  };

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExpandClick = (userId: string) => {
    setExpandedRow(expandedRow === userId ? null : userId);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <Box>
      <Box mb={2} display="flex" justifyContent="space-between" style={{marginTop: 32}} alignItems="center">
        <Typography variant="h4">Users</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginRight: 16, marginTop: 8 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => onEdit(null)} // Pass null to add a new user
          >
            ADD
          </Button>
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : 'asc'}
                  onClick={() => handleRequestSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'email'}
                  direction={orderBy === 'email' ? order : 'asc'}
                  onClick={() => handleRequestSort('email')}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'linkedin'}
                  direction={orderBy === 'linkedin' ? order : 'asc'}
                  onClick={() => handleRequestSort('linkedin')}
                >
                  LinkedIn URL
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'gender'}
                  direction={orderBy === 'gender' ? order : 'asc'}
                  onClick={() => handleRequestSort('gender')}
                >
                  Gender
                </TableSortLabel>
              </TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users
                .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => (
                  <React.Fragment key={user.id}>
                    <TableRow>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.linkedin}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleExpandClick(user.id)}>
                          {expandedRow === user.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => onEdit(user)}><EditIcon /></IconButton>
                        <IconButton onClick={() => onDelete(user.id)}><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={7} style={{ paddingBottom: 0, paddingTop: 0 }}>
                        <Collapse in={expandedRow === user.id} timeout="auto" unmountOnExit>
                          <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                              Address
                            </Typography>
                            <Typography variant="body1">
                              {user.address.line1}, {user.address.line2}, {user.address.city}, {user.address.state}, {user.address.pin}
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="h6">No Data Found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default UserTable;
