import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import {
  CardHeader,
  Grid,
  Stack,
  TextField,
  Typography,
  Card,
  Paper,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  MenuItem,
  FormGroup,
  Checkbox,
  Switch,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDropzone } from 'react-dropzone';
import { AiFillDelete, AiOutlineFire, AiOutlineWifi } from 'react-icons/ai';
import { TbAirConditioning, TbParking } from 'react-icons/tb';
import { BiBed } from 'react-icons/bi';
import { BsFileEarmarkPerson } from 'react-icons/bs';
import { MdDateRange, MdOutlineBalcony } from 'react-icons/md';
import FormProvider from '../../../hooks/form-provider';
import NewHouseMap from './NewHouseMap';

const ImageThumbnail = ({ image, onRemove }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper sx={{ p: 1, display: 'inline-flex', alignItems: 'center', margin: 1 }}>
        <img
          src={URL.createObjectURL(image)}
          alt="Uploaded"
          style={{ width: '150px', height: 'auto', margin: '5px', cursor: 'pointer' }}
        />
      </Paper>
      <IconButton onClick={() => onRemove(image)}>
        <AiFillDelete />
      </IconButton>
    </div>
  );
};

const ImageUploadBox = ({ onFileUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: (acceptedFiles) => {
      onFileUpload(acceptedFiles);
    },
  });

  return (
    <Paper
      {...getRootProps()}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: 40, mb: 1 }} />
      <Typography variant="body2" sx={{ textAlign: 'center' }}>
        Click or drop an image here
      </Typography>
    </Paper>
  );
};

const houseShema = Yup.object().shape({
  titre: Yup.string().required('Titre is required'),
  description: Yup.string().required('Description is required'),
  images: Yup.array().min(1, 'Images is required'),
  bathrooms: Yup.number().required('bathrooms is required'),
  roomsNumb: Yup.number().required('Rooms number must be'),
  floor: Yup.number().required('floor must be'),
  maisonSize: Yup.number().required('maison size must be '),
  location: Yup.string().required('Location is requiered'),
  price: Yup.object().shape({
    prixJour: Yup.number().moreThan(0),
    prixMoins: Yup.number().moreThan(0),
    prixAnnee: Yup.number().moreThan(0),
  }),
  publish: Yup.boolean(),
  airConditioning: Yup.boolean(),
  townGaz: Yup.boolean(),
  parking: Yup.boolean(),
  equipped: Yup.boolean(),
  wifi: Yup.boolean(),
  balcony: Yup.boolean(),
});

export default function NewHouseForm({ currentMaison }) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const defaultValues = {
    titre: currentMaison ? currentMaison.titre : '',
    description: currentMaison ? currentMaison.description : '',
    images: currentMaison ? currentMaison.images : [],
    bathrooms: currentMaison ? currentMaison.bathrooms : '',
    roomsNumb: currentMaison ? currentMaison.roomsNumb : '',
    floor: currentMaison ? currentMaison.floor : '',
    maisonSize: currentMaison ? currentMaison.maisonSize : '',
    location: currentMaison ? currentMaison.location : '',
    coordinates: currentMaison ? currentMaison.coordinates : { lat: 0, lng: 0 },
    gendre: currentMaison ? currentMaison.gendre : [],
    periode: currentMaison ? currentMaison.periode : [],
    price: currentMaison
      ? currentMaison.price
      : {
          prixJour: '',
          prixMoins: '',
          prixAnnee: '',
        },
    publish: currentMaison ? currentMaison.publish : false,
    airConditioning: currentMaison ? currentMaison.airConditioning : false,
    townGaz: currentMaison ? currentMaison.townGaz : false,
    parking: currentMaison ? currentMaison.parking : false,
    equipped: currentMaison ? currentMaison.equipped : false,
    wifi: currentMaison ? currentMaison.wifi : false,
    balcony: currentMaison ? currentMaison.balcony : false,
  };
  const [MaisonInfo, SetMaisonInfo] = useState(defaultValues);

  const methods = useForm({
    resolver: yupResolver(houseShema),
    defaultValues: houseShema,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentMaison) {
      reset(SetMaisonInfo);
    }
  }, [currentMaison, SetMaisonInfo, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(currentMaison ? 'Update success!' : 'Create success!');
      console.info('DATA', data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  });

  const updateCoordinates = (lat, lng) => {
    SetMaisonInfo((prevState) => ({
      ...prevState,
      coordinates: { lat, lng },
    }));
  };

  const handleAvailabilityChange = (e) => {
    SetMaisonInfo((prevState) => ({
      ...prevState,
      publish: e.target.checked,
    }));
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'periode') {
      if (checked) {
        SetMaisonInfo((prevState) => ({
          ...prevState,
          periode: [...prevState.periode, value],
        }));
      } else {
        SetMaisonInfo((prevState) => ({
          ...prevState,
          periode: prevState.periode.filter((item) => item !== value),
        }));
      }
    } else if (type === 'checkbox') {
      if (checked) {
        SetMaisonInfo((prevState) => ({
          ...prevState,
          [name]: [...prevState[name], value],
        }));
      } else {
        SetMaisonInfo((prevState) => ({
          ...prevState,
          [name]: prevState[name].filter((item) => item !== value),
        }));
      }
    } else {
      SetMaisonInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (files) => {
    // Do something with the uploaded file, for example, set it to state
    SetMaisonInfo((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleDeleteImage = (image) => {
    SetMaisonInfo((prevState) => ({
      ...prevState,
      images: prevState.images.filter((img) => img !== image),
    }));
  };

  const handleDeleteAllImages = () => {
    SetMaisonInfo((prevState) => ({
      ...prevState,
      images: [],
    }));
  };

  const renderDetails = (
    <form>
      <Grid>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Details
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Title, short description, image, location ...
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Card>
          <CardHeader title="Details" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <TextField
              name="titre"
              label="titre de maison"
              variant="outlined"
              value={MaisonInfo.titre}
              onChange={handleChange}
              required
            />

            <TextField
              name="description"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              value={MaisonInfo.description}
              onChange={handleChange}
              required
            />
          </Stack>
          <Stack spacing={1.5} sx={{ p: 3 }}>
            <Typography variant="subtitle2">Images</Typography>
            <ImageUploadBox onFileUpload={handleImageUpload} />
            <Stack direction="row" flexWrap="wrap" justifyContent="flex-start">
              {MaisonInfo.images.map((image, index) => (
                <ImageThumbnail key={index} image={image} onRemove={handleDeleteImage} />
              ))}
            </Stack>

            {MaisonInfo.images.length > 0 && (
              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={handleDeleteAllImages}
                  style={{
                    backgroundColor: '#f44336',
                    color: 'white',
                    border: 'none',
                    padding: '10px 15px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                    marginTop: '10px',
                    float: 'right',
                  }}
                >
                  Supprimer tout <AiFillDelete />
                </button>
              </div>
            )}

            <Stack spacing={1.5} sx={{ p: 3 }}>
              <Typography variant="subtitle2">location</Typography>
              <NewHouseMap updateCoordinates={updateCoordinates} required />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </form>
  );

  const renderProprietes = (
    <form>
      <Grid>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          Proprietes
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Climatiseur, gaz, chambers...
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Card>
          <CardHeader title="proprietes" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" borderRadius={50}>
              <TbAirConditioning sx={{ fontSize: '50px' }} />
              <Typography variant="subtitle2" sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                Climatiseur
              </Typography>
              <RadioGroup
                name="airConditioning"
                value={MaisonInfo.airConditioning.toString()}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Oui"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Non"
                />
              </RadioGroup>
            </Stack>

            <Stack direction="row" alignItems="center" borderRadius={50}>
              <AiOutlineFire sx={{ fontSize: '50px' }} />
              <Typography variant="subtitle2" sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                Gaz de ville
              </Typography>
              <RadioGroup name="townGaz" value={MaisonInfo.townGaz.toString()} onChange={handleChange} row>
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Oui"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Non"
                />
              </RadioGroup>
            </Stack>

            <Stack direction="row" alignItems="center" borderRadius={50}>
              <TbParking sx={{ fontSize: '50px' }} />
              <Typography variant="subtitle2" sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                Parking
              </Typography>
              <RadioGroup name="parking" value={MaisonInfo.parking.toString()} onChange={handleChange} row>
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Oui"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Non"
                />
              </RadioGroup>
            </Stack>

            <Stack direction="row" alignItems="center" borderRadius={50}>
              <BiBed sx={{ fontSize: '50px' }} />
              <Typography variant="subtitle2" sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                Meuble
              </Typography>
              <RadioGroup name="equipped" value={MaisonInfo.equipped.toString()} onChange={handleChange} row>
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Oui"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Non"
                />
              </RadioGroup>
            </Stack>

            <Stack direction="row" alignItems="center" borderRadius={50}>
              <AiOutlineWifi sx={{ fontSize: '50px' }} />
              <Typography variant="subtitle2" sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                Wifi
              </Typography>
              <RadioGroup name="wifi" value={MaisonInfo.wifi.toString()} onChange={handleChange} row>
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Oui"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Non"
                />
              </RadioGroup>
            </Stack>

            <Stack direction="row" alignItems="center" borderRadius={50}>
              <MdOutlineBalcony sx={{ fontSize: '50px' }} />
              <Typography variant="subtitle2" sx={{ flex: '1', display: 'flex', alignItems: 'center' }}>
                Balcon
              </Typography>
              <RadioGroup name="balcony" value={MaisonInfo.balcony.toString()} onChange={handleChange} row>
                <FormControlLabel
                  value="true"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Oui"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio color="primary" sx={{ border: '1px solid rgba(0,0,0,0.2)' }} />}
                  label="Non"
                />
              </RadioGroup>
            </Stack>

            <FormGroup sx={{ justifyContent: 'flex-end' }}>
              <Stack direction="row" alignItems="center" borderRadius={50}>
                <BsFileEarmarkPerson />
                <Typography variant="subtitle2">Louer pour : </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={MaisonInfo.gendre.includes('etudiant')}
                      onChange={handleChange}
                      name="gendre"
                      value="etudiant"
                    />
                  }
                  label="Etudiant"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={MaisonInfo.gendre.includes('homme')}
                      onChange={handleChange}
                      name="gendre"
                      value="homme"
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={MaisonInfo.gendre.includes('femme')}
                      onChange={handleChange}
                      name="gendre"
                      value="femme"
                    />
                  }
                  label="Femme"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={MaisonInfo.gendre.includes('toute')}
                      onChange={handleChange}
                      name="gendre"
                      value="toute"
                    />
                  }
                  label="Toute"
                />
                {/* Add more checkboxes as needed */}
              </Stack>
            </FormGroup>

            <FormGroup sx={{ justifyContent: 'flex-end' }}>
              <Stack direction="row" alignItems="center" borderRadius={50}>
                <MdDateRange />
                <Typography variant="subtitle2">Louer par : </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={MaisonInfo.periode.includes('jour')}
                      onChange={handleChange}
                      name="periode"
                      value="jour"
                    />
                  }
                  label="Jour"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={MaisonInfo.periode.includes('moins')}
                      onChange={handleChange}
                      name="periode"
                      value="moins"
                    />
                  }
                  label="Moins"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={MaisonInfo.periode.includes('année')}
                      onChange={handleChange}
                      name="periode"
                      value="année"
                    />
                  }
                  label="Année"
                />
              </Stack>
            </FormGroup>

            <Stack spacing={3} sx={{ p: 3 }}>
              <Box
                columnGap={2}
                rowGap={3}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
                <TextField
                  name="bathrooms"
                  label="salle de bains"
                  placeholder="0"
                  type="number"
                  value={MaisonInfo.bathrooms}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  name="roomsNumb"
                  label="chambres"
                  placeholder="0"
                  type="number"
                  required
                  value={MaisonInfo.roomsNumb}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  name="maisonSize"
                  label="Maison Size"
                  select
                  required
                  value={MaisonInfo.maisonSize}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="S+0">S+0</MenuItem>
                  <MenuItem value="S+1">S+1</MenuItem>
                  <MenuItem value="S+2">S+2</MenuItem>
                  <MenuItem value="S+3">S+3</MenuItem>
                  <MenuItem value="S+4">S+4</MenuItem>
                </TextField>

                <TextField
                  name="floor"
                  label="etage de maison"
                  select
                  required
                  value={MaisonInfo.floor}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                >
                  <MenuItem value="Rez-de-chaussée">Rez-de-chaussée</MenuItem>
                  <MenuItem value="1er étage">1er étage</MenuItem>
                  <MenuItem value="2ème étage">2ème étage</MenuItem>
                  <MenuItem value="3ème étage">3ème étage</MenuItem>
                  <MenuItem value="4ème étage">4ème étage</MenuItem>
                  <MenuItem value="Penthouse/Villa">Penthouse/Villa</MenuItem>
                  <MenuItem value="Studio">Studio</MenuItem>
                </TextField>
              </Box>
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </form>
  );

  const renderPricing = (
    <form>
      <Grid>
        <Typography variant="h6" sx={{ mb: 0.5 }}>
          prix du loyer
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          prix selon proprietes...
        </Typography>
      </Grid>

      <Grid xs={12}>
        <Card>
          <CardHeader title="prix de loyer" />
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack direction="column" alignItems="center" borderRadius={50}>
              {/* Display the prix text field for 'jour' */}
              {MaisonInfo.periode.includes('jour') && (
                <Stack spacing={3} direction="row" alignItems="center" borderRadius={50}>
                  <Typography variant="subtitle2">Prix par : Jour</Typography>
                  <TextField
                    name="prixJour"
                    placeholder="$ 0.00 (par jour)"
                    type="number"
                    required
                    onChange={handleChange}
                    value={MaisonInfo.price.prixJour}
                  />
                </Stack>
              )}

              {/* Display the prix text field for 'moins' */}
              {MaisonInfo.periode.includes('moins') && (
                <Stack spacing={3} direction="row" alignItems="center" borderRadius={50}>
                  <Typography variant="subtitle2">Prix par : Moins</Typography>
                  <TextField
                    name="prixMoins"
                    placeholder="$ 0.00 (par moins)"
                    type="number"
                    required
                    onChange={handleChange}
                    value={MaisonInfo.price.prixMoins}
                  />
                </Stack>
              )}

              {/* Display the prix text field for 'année' */}
              {MaisonInfo.periode.includes('année') && (
                <Stack spacing={2} direction="row" alignItems="center" borderRadius={50}>
                  <Typography variant="subtitle2">Prix par : Année</Typography>
                  <TextField
                    name="prixAnnee"
                    placeholder="$ 0.00 (par Année)"
                    type="number"
                    required
                    onChange={handleChange}
                    value={MaisonInfo.price.prixAnnee}
                  />
                </Stack>
              )}
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </form>
  );

  const renderAction = (
    <form>
      <Grid>
        <Grid xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControlLabel
            control={<Switch defaultChecked />}
            label="avaible pour loyer"
            value={MaisonInfo.publish}
            sx={{ flexGrow: 1, pl: 3 }}
            onChange={handleAvailabilityChange}
          />
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            {!currentMaison ? 'Create Product' : 'Save Changes'}
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid>
        {renderDetails}
        {renderProprietes}
        {renderPricing}
        {renderAction}
      </Grid>
    </FormProvider>
  );
}

NewHouseForm.propTypes = {
  currentMaison: PropTypes.object,
};
