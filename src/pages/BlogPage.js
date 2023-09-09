import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Button, Container, Stack, Typography } from '@mui/material';


// components
import { useState } from 'react';

import ClinicForm from '../components/ClincForm/ClincForm';

import ClinicDetail from '../components/select/ClincPage';

import Iconify from '../components/iconify';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';

import Maps from './maps';
import Select from '../components/select/Select';
// mock
import POSTS from '../_mock/blog';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];


// ----------------------------------------------------------------------

export default function BlogPage() {
  const [isNewUserFormOpen, setIsNewUserFormOpen] = useState(false);

  const handleOpenNewUserForm = () => {
    setIsNewUserFormOpen(true);
  };
  
  const handleCloseNewUserForm = () => {
    setIsNewUserFormOpen(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Localisation | Minimal UI </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Liste of Clinc
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}onClick={handleOpenNewUserForm}  >
            New Clinc Form
          </Button>
        </Stack>
        {isNewUserFormOpen && (  <ClinicForm onClose={handleCloseNewUserForm} />  )}

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>
        
        <Select/>
      </Container>
    </>
  );
}
