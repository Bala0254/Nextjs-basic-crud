'use client';

import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import { User } from '@/utils/types';
import { addUser, updateUser, deleteUser, getUsers } from '@/utils/userService';
import UserForm from './../components/UserForm';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const HomePage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(getUsers());
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Check if the email already exists
  const isEmailUnique = (email: string, userId?: string): boolean => {
    return users.every(user => user.email.toLowerCase() !== email.toLowerCase() || user.id === userId);
  };

  const handleEdit = (user: User | null) => {
    setSelectedUser(user);
    setFormOpen(true);
  };

  const handleDelete = (userId: string) => {
    setConfirmDelete(userId);
  };

  const handleConfirmDelete = () => {
    if (confirmDelete) {
      deleteUser(confirmDelete);
      setUsers(getUsers());
      setConfirmDelete(null);
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedUser(null);
    setEmailError(null);
  };

  const handleSave = (user: User) => {
    if (!isEmailUnique(user.email, user.id)) {
      setEmailError('Email already exists');
      return;
    }
    
    setEmailError(null);

    if (user.id) {
      updateUser(user);
    } else {
      addUser({ ...user, id: Date.now().toString() });
    }
    setUsers(getUsers());
    handleCloseForm();
  };

  const handleSearch = (query: string) => {
    const filteredUsers = getUsers().filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.linkedin.toLowerCase().includes(query) ||
      user.gender.toLowerCase().includes(query)
    );
    setUsers(filteredUsers);
  };  

  const handleSort = (order: 'asc' | 'desc', orderBy: string) => {
    const sortedUsers = [...getUsers()].sort((a, b) => {
      if (orderBy === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      if (orderBy === 'email') {
        return order === 'asc' ? a.email.localeCompare(b.email) : b.email.localeCompare(a.email);
      }
      return 0;
    });
    setUsers(sortedUsers);
  };

  return (
    <div>
      <UserTable
        users={users}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onSearch={handleSearch}
        onSort={handleSort}
      />
      <UserForm
        open={formOpen}
        user={selectedUser}
        onClose={handleCloseForm}
        onSave={handleSave}
        emailError={emailError}
      />
      {/* Confirmation Dialog */}
      <Dialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this user?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" style={{backgroundColor: '#ef7616', color: 'white'}}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
