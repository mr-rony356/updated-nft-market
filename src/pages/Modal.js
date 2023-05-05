import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import createPool from "../assets/images/8.png";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import mark from '../assets/images/icons/mark.png'
import girl from '../assets/images/icons/girl.png';
import { useWeb3React } from '@web3-react/core';
import { useTranslation } from "react-i18next";
import icon1 from "../assets/images/icons/3.png"
import icon2 from "../assets/images/icons/1.png"
import OutlinedInput from '@mui/material/OutlinedInput';
import icon3 from "../assets/images/icons/6.png"
import Input from '@mui/material/Input';
import CloseIcon from '@mui/icons-material/Close';
import IosShareIcon from '@mui/icons-material/IosShare';
import "../components/styles/NFTStyles.css";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const marks = [
  {
    value: 0,
    label: '0%',
  },
  {
    value: 10,
    label: '10%',
  },
  {
    value: 20,
    label: '20%',
  }
];


function valuetext(value) {
  return `${value}%`;
}

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Title = styled.span`
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
      display: inline-block;
      font-weight: bold;
  `;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: '90%',
    overflow: 'scroll',
    borderRadius: '15px',
    bgcolor: 'white',
    //   border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };
  const styleS = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: '90%',
    borderRadius: '15px',
    bgcolor: 'white',
    //   border: '2px solid #000',
    boxShadow: 24,
    p: 3,
  };
    
export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openOne, setOpenOne] = React.useState(false);
  const handleOpenOne = () => {
    handleClose();
    setOpenOne(true);

  };
  const handleCloseOne = () => setOpenOne(false);


  const [openTwo, setOpenTwo] = React.useState(false);
  const handleOpenTwo = () => {
    handleCloseOne();
    setOpenTwo(true);

  };
  const handleCloseTwo = () => setOpenTwo(false);





  const [type2, setType2] = useState('auction');
  const [name2, setName2] = useState('');
  const [symbol2, setSymbol2] = useState('');
  const [price2, setPrice2] = useState('');
  const [supply2, setSupply2] = useState('');
  const [startType, setStartType] = useState('now');
  const [startDate, setStartDate] = useState(null);
  const [endType, setEndType] = useState('1');
  const [endDate, setEndDate] = useState(null);
  const [step3, setStep3] = useState(false);
  const [feeFlag, setFeeFlag] = useState(false);
  const [inFractionalize, setInFractionalize] = useState(false);
  const [inApprove, setInApprove] = useState(false);








  const { t } = useTranslation();
  const { account, chainId, library } = useWeb3React();
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [noItems, setNoItems] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialItemsLoaded, setInitialItemsLoaded] = useState(true);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [step, setStep] = useState(1);
  useEffect(() => {

    if (!selectedItem) { setStep3(false); return; }
    if (!name2) { setStep3(false); return; }
    if (!symbol2) { setStep3(false); return; }
    if (!price2 || parseFloat(price2) <= 0) { setStep3(false); return; }
    if (!supply2 || parseInt(supply2) < 1) { setStep3(false); return; }
    setStep3(true);
    let f_marketplace = sessionStorage.getItem('f_marketplace');
    let f_data = JSON.parse(f_marketplace);
    if (account?.toLowerCase() !== f_data.address) return;
    f_data.vault.name = name2;
    f_data.vault.symbol = symbol2;
    f_data.vault.price = price2;
    f_data.vault.supply = supply2;
    f_data.type = type2;
    sessionStorage.setItem('f_marketplace', JSON.stringify(f_data));
  }, [type2, name2, symbol2, price2, supply2, selectedItem]);
  const [value, setValue] = React.useState(dayjs('2022-04-17'));


  return (
    <div>
      <div onClick={handleOpen} className="d-flex align-items-center gap-2">
        <img width={30} src={createPool} alt="" />
        <div>
          <p className="text-text">
            {("Crowdsale")}
          </p>
          <div
            className="subtitle"
            style={{ fontSize: "12px" }}
          >
            {("Crowdsale")}
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='text-right mb-3'><IosShareIcon fontSize="small" color="action"></IosShareIcon>   <CloseIcon className="close" onClick={handleClose}></CloseIcon> </div>

          <div className=" max-width text-center">

            <div className="row mb-3">

              <div className="col-md-6">

                <button className={`btn ${type2 === 'fixed' ? 'btn-ui' : 'btn-ui-muted'}  w-100 mt-3`}
                  style={{ fontSize: 14 }}
                  onClick={() => setType2('fixed')}
                >
                  Fixed Price

                </button>
              </div>
              <div className="col-md-6">
                <button
                  className={`btn ${type2 === 'auction' ? 'btn-ui' : 'btn-ui-muted'}  w-100 mt-3`}
                  style={{ fontSize: 16 }}
                  onClick={() => setType2('auction')}
                >
                  Bid/Auction

                </button>
              </div>
            </div>


            <div className="row mb-3 row justify-content-between">
              <div className="col-md-6">
                <div className="d-flex">
                  <div>
                    <Link to={`/`}>
                      <img src={'https://i.seadn.io/gcs/files/6ad18b0e2c45c7f1eda6be028f3d931a.png?auto=format&w=1000'} className="img-fluid" alt="nft image" style={{ width: '50%', borderRadius: '10px' }} />
                    </Link>,

                  </div>
                  <div className="text-left">
                    <p className="md bold-lg">Kidzoki#257</p>
                    <p className="sm bold-md">kidzoki Georil</p>
                    <p className="sm">rarity #124 </p>


                  </div>



                </div>
              </div>
              {/* <label className="form-label">Vault NFTs</label>
                    <input type="text" className="form-control" placeholder="Vault name"
                      value={name2} onChange={event => setName2(event.target.value)} /> */}


              <div className="col-md-3">
                <p className="sm">Listing Price</p>

                <p className="md bold-lg">3 ETH</p>
                <p className="sm">$5764 USD</p>
              </div>
            </div>
            <div className="mb-3">
              {/* <label className="form-label">Token & Price</label>
                  <input type="number" className="form-control input-number" placeholder={`Reserve price in ${process.env.REACT_APP_COIN}`}
                    value={price2} onChange={event => setPrice2(event.target.value)} /> */}
              <div className="border-ui">
                <p className="lg ui-font text-center">$5764.68 USD</p>

              </div>

            </div>
            <div className=" mb-3">
              <p className="text-left">*Set a price</p>
              <div className="row mb-3">

                <div className="col-md-6">
                  <input type="text" className="form-control input-font-ui input-number" placeholder="Token supply"
                    value={'Floor 3ETH'} onChange={event => setSupply2(event.target.value)} />
                </div>
                <div className="col-md-6">
                  <input type="text" className="form-control input-font-ui" placeholder="Token symbol"
                    value={'Top Trait 2.5ETH'} onChange={event => setSymbol2(event.target.value)} />
                </div>
              </div>
            </div>

            <FormControl className=" " fullWidth >
              <OutlinedInput
                id="outlined-adornment-weight" value={3} size="small"
                endAdornment={<InputAdornment position="end">ETH</InputAdornment>}
                aria-describedby="outlined-weight-helper-text"
                inputProps={{
                  'aria-label': 'weight',
                }}
              />                    </FormControl>
            <FormHelperText id="standard-weight-helper-text">$5764.68 USD</FormHelperText>

            <div className=" border-ui mb-3">
              <div className="row">
                <div className="col-md-4 text-center">
                  <span className="sm "><img src={icon1} height={20} alt="" />Set Fractionalize shares </span>
                  <input type="text" className="form-control padding border-ui  input-font-ui"
                    value={100} />
                  <p className="sm">Upto 100,000,000 max</p>
                </div>
                <div className="col-md-4">
                  <span className="sm "><img src={icon2} height={20} alt="" />Set Price for shares </span>
                  <input type="text" className="form-control padding border-ui  input-font-ui"
                    value={'$50'} />
                  <p className="sm">.25</p>
                </div>
                <div className="col-md-4">
                  <span className="sm "><img src={icon3} height={20} alt="" />Token name </span>
                  <input type="text" className="form-control padding border-ui  input-font-ui"
                    value={'Kidzuki'} />
                </div>

              </div>


            </div>
            {type2 === 'auction' && <>
              <div className="mb-3">
                <p className="md bold-lg text-left">Duration</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker', 'DatePicker']}>
                    <DatePicker label="Start" defaultValue={dayjs('2022-04-17')} />
                    <DatePicker
                      label="End"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                    />
                  </DemoContainer>
                </LocalizationProvider>  
                                </div>
              <div className="mb-3">
                <p className="text-left sm"> Description</p>
                <div className="mb-3">
                  <Textarea className="border-ui" minRows={2} />
                </div>
                <p className="text-left sm "><Checkbox size="small" /> Private pool (Not listed on marketplace)</p>


              </div>


            </>}
            {type2 === 'fixed' && <>
              <div className="mb-3">
                <p className="text-left sm "> Description</p>
                <Textarea className="border-ui" minRows={3} />

                <p className="text-left sm "><Checkbox size="small" /> Private pool (Not listed on marketplace)</p>

              </div>


            </>


            }
            <div className="mb-3">
              <Box sx={{ width: 500 }}>
                <Typography id="track-inverted-slider" className="text-left md" gutterBottom>
                  Creator Fees
                </Typography>
                <Slider
                  aria-label="Custom marks"
                  defaultValue={8}
                  getAriaValueText={valuetext}
                  step={1}
                  size="small"
                  valueLabelDisplay="auto"
                  min={1} max={20}
                  marks={marks}></Slider>
              </Box>


            </div>

            <button onClick={handleOpenOne} className="btn btn-ui rounded-md w-100 mt-3" >
              CREATE POOL
         
            </button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={openOne}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleS} className="flex">
          <div className="row border-ui padding-ov">
  <div className=' row d-flex  justify-content-between mb-3'> 
    <div className='col-md-6'>
    <p className='font-ui-cl' >APPROVE CROWDSALE</p>

    </div>
    <div className='col-md-6  mb-3 text-right'>  <CloseIcon className='close' onClick={handleCloseOne} ></CloseIcon></div>

  </div>

  <div className="row mb-3  justify-content-between">
              <div className="col-md-8">
                <div className="d-flex">
                  <div>
                    <a>
                      <img src={'https://i.seadn.io/gcs/files/6ad18b0e2c45c7f1eda6be028f3d931a.png?auto=format&w=1000'}alt="nft image" style={{ width: '60px', borderRadius: '10px' , margin:'10px' }} />
                    </a>

                  </div>
                  <div className="text-center m-t">
                    <p className="md bold-lg">Kidzoki#257</p>
                    <p className="sm bold-md">kidzoki Georil</p>
                    <p className="sm">rarity #124 </p>


                  </div>



                </div>
              </div>


              <div className="col-md-4 text-right">
              <p className="md ">3 ETH</p>

              <p className="sm">7 days duration</p>
                <p className="sm">$5764 USD</p>
                <p className='sm'> Total 100 Shares</p>
              </div>
            </div>
            <hr />
  <div className='mb-3'>
    <p className='bold-md'>Go to your wallet
</p>
<p className='sm'>You'll be asked to approve this pool from your wallet.</p>
  </div>


  <div className="mb-3">
    <button onClick={handleOpenTwo} className="btn btn-ui w-100 mt-3" >
     Approve
    </button>


  </div>


</div>

        </Box>
      </Modal>
      <Modal
        open={openTwo}
        onClose={handleCloseTwo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleS} className="flex">
          <div className="row border-ui padding-ov">
        <div className='text-right w-100'>  <CloseIcon className='close' onClick={handleCloseTwo} ></CloseIcon></div>

          <p className='text-center md-lg bold-md mb-3'>Congratulations!</p>
          <div className='text-center mb-3'>
            <img src={girl} alt="girl" className="girl mb-3" />

          </div>
          <div className="ow mb-3">
            <p className='md  text-center bold-lg mb-3 '> <span><img src={mark} width={30} alt="" /></span> Your pool is complete & live now</p>

          </div>
          <div className="mb-3 text-center">
            <span className='md border-ui text-center bold-lg mb-3 '> Pool ID</span>

          </div>
          <div className='d-flex text-center w-100 ui-icon '>
          <i class=" uil-facebook-f"></i>
                <i class=" uil-instagram"></i>


                <i class=" uil-twitter"></i>
                <i class=" uil-copy-link"></i>

          </div>


          <div className="mb-3">
            <button onClick={handleCloseTwo} className="btn btn-ui rounded-md w-100 mt-3" >
              View  POOL
              listing
            </button>


          </div>


        </div>

        </Box>
      </Modal>
    </div>
  );
}
