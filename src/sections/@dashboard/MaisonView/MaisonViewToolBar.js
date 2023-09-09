import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Button, Tooltip, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';

export default function MaisonViewToolBar({ publish, backLink, editLink, onChangePublish, sx, ...other }) {
  return (
    <>
      <Stack
        spacing={1.5}
        direction="row"
        sx={{
          mb: { xs: 3, md: 5 },
          ...sx,
        }}
        {...other}
      >
        <Button onClick={backLink.handleOpen} startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}>
          back
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Tooltip title="Edit">
          <IconButton href={editLink}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        </Tooltip>
        <LoadingButton
          color="inherit"
          variant="contained"
          loading={false} // You can customize this based on your loading logic
          onClick={() => onChangePublish(!publish)} // Toggle the value between true and false
          sx={{ textTransform: 'capitalize' }}
        >
          {publish ? (
            <>
              <Iconify icon="solar:file-text-bold" /> Published
            </>
          ) : (
            <>
              <Iconify icon="eva:cloud-upload-fill" /> Draft
            </>
          )}
        </LoadingButton>
      </Stack>
    </>
  );
}

MaisonViewToolBar.propTypes = {
  publish: PropTypes.bool.isRequired,
  backLink: PropTypes.string.isRequired,
  editLink: PropTypes.string.isRequired,
  onChangePublish: PropTypes.func.isRequired,
  sx: PropTypes.object,
};
