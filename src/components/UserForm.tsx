import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button,
  FormControl, Select, MenuItem, FormHelperText
} from '@mui/material';
import { User, Gender } from '@/utils/types';
import { getStates, getCities } from '@/utils/Appconstant';
import { validateUser } from '@/utils/userService';

interface UserFormProps {
  open: boolean;
  user?: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
  emailError?: string | null;
}

const initialFormData: User = {
  id: '',
  name: '',
  email: '',
  linkedin: '',
  gender: Gender.Male,
  address: { line1: '', line2: '', state: '', city: '', pin: '' },
};

const UserForm: React.FC<UserFormProps> = ({ open, user, onClose, onSave, emailError }) => {
  const [formData, setFormData] = useState<User>(initialFormData);
  const [errors, setErrors] = useState<any>({});
  const [states, setStates] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData(initialFormData);
    }
  }, [user]);

  useEffect(() => {
    if (!open) {
      setFormData(user || initialFormData);
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    setStates(getStates());
    if (formData.address.state) {
      setCities(getCities(formData.address.state));
    } else {
      setCities([]);
    }
  }, [formData.address.state]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name!]: value as string,
    }));
  };

  const handleAddressChange = (event: any) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [name!]: value as string },
    }));
  };

  const handleSave = () => {
    const validationErrors = validateUser(formData);
    
    if (Object.keys(validationErrors).length === 0) {
      if (emailError) {
        setErrors({ email: emailError });
        return;
      }
      onSave(formData);
      setFormData(prev => ({ ...prev, email: '' }));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        {/* Name Field */}
        <FormControl fullWidth margin="dense">
          <label className='mrgB8' htmlFor="name">Name</label>
          <TextField
            id="name"
            name="name"
            label="Name"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            className="mrgB16"
            slotProps={{
              input: {
                inputProps: { maxLength: 50 },
              },
            }}
          />
        </FormControl>

        {/* Email Field */}
        <FormControl fullWidth margin="dense">
          <label className='mrgB8' htmlFor="email">Email</label>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email || !!emailError}
            helperText={errors.email || emailError}
            className="mrgB16"
            slotProps={{
              input: {
                inputProps: { maxLength: 255 },
              },
            }}
          />
        </FormControl>

        {/* LinkedIn URL Field */}
        <FormControl fullWidth margin="dense">
          <label className='mrgB8' htmlFor="linkedin">LinkedIn URL</label>
          <TextField
            id="linkedin"
            name="linkedin"
            label="LinkedIn URL"
            fullWidth
            variant="outlined"
            value={formData.linkedin}
            onChange={handleChange}
            error={!!errors.linkedin}
            helperText={errors.linkedin}
            className="mrgB16"
            slotProps={{
              input: {
                inputProps: { maxLength: 255 },
              },
            }}
          />
        </FormControl>

        {/* Gender Field */}
        <FormControl fullWidth margin="dense" error={!!errors.gender}>
          <label className='mrgB8'>Gender</label>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mrgB16"
          >
            {Object.values(Gender).map(gender => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </Select>
          {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
        </FormControl>

        {/* Address Fields */}
        {/* Address Line 1 */}
        <FormControl fullWidth margin="dense">
          <label className='mrgB8' htmlFor="line1">Address Line 1</label>
          <TextField
            id="line1"
            name="line1"
            label="Address Line 1"
            fullWidth
            variant="outlined"
            value={formData.address.line1}
            onChange={handleAddressChange}
            error={!!errors.address?.line1}
            helperText={errors.address?.line1}
            className="mrgB16"
          />
        </FormControl>

        {/* Address Line 2 */}
        <FormControl fullWidth margin="dense">
          <label className='mrgB8' htmlFor="line2">Address Line 2</label>
          <TextField
            id="line2"
            name="line2"
            label="Address Line 2"
            fullWidth
            variant="outlined"
            value={formData.address.line2}
            onChange={handleAddressChange}
            error={!!errors.address?.line2}
            helperText={errors.address?.line2}
            className="mrgB16"
          />
        </FormControl>

        {/* State Field */}
        <FormControl fullWidth margin="dense" error={!!errors.address?.state}>
          <label className='mrgB8'>State</label>
          <Select
            name="state"
            value={formData.address.state}
            onChange={handleAddressChange}
            className="mrgB16"
          >
            {states.map(state => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
          {errors.address?.state && <FormHelperText>{errors.address?.state}</FormHelperText>}
        </FormControl>

        {/* City Field */}
        <FormControl fullWidth margin="dense" error={!!errors.address?.city}>
          <label className='mrgB8'>City</label>
          <Select
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            className="mrgB16"
          >
            {cities.map(city => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
          {errors.address?.city && <FormHelperText>{errors.address?.city}</FormHelperText>}
        </FormControl>

        {/* PIN Field */}
        <FormControl fullWidth margin="dense">
          <label className='mrgB8' htmlFor="pin">PIN Code</label>
          <TextField
            id="pin"
            name="pin"
            label="PIN Code"
            fullWidth
            variant="outlined"
            value={formData.address.pin}
            onChange={handleAddressChange}
            error={!!errors.address?.pin}
            helperText={errors.address?.pin}
            className="mrgB16"
            slotProps={{
              input: {
                inputProps: { maxLength: 6 },
              },
            }}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleSave} style={{ backgroundColor: '#ef7616', color: 'white' }}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
