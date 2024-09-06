import { User } from "./types";

const users: User[] = [];

export const getUsers = () => users;

export const addUser = (user: User) => {
  users.push(user);
};

export const updateUser = (updatedUser: User) => {
  const index = users.findIndex(user => user.id === updatedUser.id);
  if (index > -1) {
    users[index] = updatedUser;
  }
};

export const deleteUser = (userId: string) => {
  const index = users.findIndex(user => user.id === userId);
  if (index > -1) {
    users.splice(index, 1);
  }
};

export const validateUser = (user: User) => {
  const errors: any = {};
  if (!user.name || user.name.length < 2 || user.name.length > 50) {
    errors.name = 'Name is required and should be between 2 and 50 characters';
  }
  if (!user.email || !/\S+@\S+\.\S+/.test(user.email)) {
    errors.email = 'Valid email is required';
  }
  if (!user.linkedin || !/https?:\/\/(www\.)?linkedin\.com\/.*$/.test(user.linkedin)) {
    errors.linkedin = 'Valid LinkedIn URL is required';
  }
  if (!user.gender) {
    errors.gender = 'Gender is required';
  }
  if (!user.address.line1) {
    errors.address = { ...errors.address, line1: 'Address Line 1 is required' };
  }
  if (!user.address.state) {
    errors.address = { ...errors.address, state: 'State is required' };
  }
  if (!user.address.city) {
    errors.address = { ...errors.address, city: 'City is required' };
  }
  if (!/^\d{6}$/.test(user.address.pin)) {
    errors.address = { ...errors.address, pin: 'PIN should be exactly 6 digits' };
  }
  return errors;
};
