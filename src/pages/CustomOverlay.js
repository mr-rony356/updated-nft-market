import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import '../pages/homestyle.css';
import mark from '../assets/images/icons/mark.png'
import girl from '../assets/images/icons/girl.png';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Textarea from '@mui/joy/Textarea';
import CloseIcon from '@mui/icons-material/Close';
import IosShareIcon from '@mui/icons-material/IosShare';

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');



function OverlayComponent() {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    setShowOverlay(!showOverlay);
  }
  const [showOverlayOne, setShowOverlayOne] = useState(false);

  const handleClicks = () => {
    setShowOverlayOne(!showOverlayOne);
        setShowOverlay(false);
        setShowOverlayTwo(false);


  }
  const [showOverlayTwo, setShowOverlayTwo] = useState(false);

  const handleClickss = () => {
    setShowOverlayTwo(!showOverlayTwo);
        setShowOverlay(false);

  }

  return (
    <div>
      <div onClick={handleClick}>
      <Button className=" text-left d-block mb-4" variant="primary">
            {("create pool")}
            </Button>
      </div>

      {showOverlay && (
        <div className="overlay">
          
          <div className="overlay-content">
            
            <div className="row border-ui padding-ov">

              <div className='text-center'>
                <img src={girl} alt="girl" className="girl" />

              </div>
              <p className='md text-center'>Buy any NFT listed fixed price with the community</p>
              <input type="text" className="form-control input-font-ui input-number"
                />
              <p className='sm text-left  className="mb-3'>Enter OpenSea listing at a fixed price.</p>

              <div >
                <p className="md bold-lg text-left">Duration</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={['DatePicker', 'DateTimePicker', 'DateRangePicker']}
                  >
                    <DatePicker />

                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className='mb-3'>
                <p className="text-left sm"> Description</p>
                <div >
                  <Textarea className="border-ui" minRows={2} />
                </div>


              </div>
              <div>
                <button onClick={handleClickss} className="btn btn-ui rounded-md w-100 mb-3" >
                  CREATE POOL
                </button>
                <button  className="btn btn-ui-muted rounded-md w-100" >
                  Cancel
                </button>



              </div>


            </div>
          </div>
        </div>
      )}
      {showOverlayOne && (

<div className="overlay">
  <div className="overlay-contents">
    <div className="row border-ui padding-ov">
    <div className='text-right w-100'>  <CloseIcon className='close' onClick={handleClicks} ></CloseIcon></div>

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
        <button onClick={handleClicks} className="btn btn-ui rounded-md w-100 mt-3" >
          View  POOL
          listing
        </button>


      </div>


    </div>
  </div>
</div>

)}
      {showOverlayTwo && (

<div className="overlay">
  <div className="overlay-contents">

    <div className="row border-ui padding-ov">
      <div className=' row d-flex  justify-content-between mb-3'> 
        <div className='col-md-6'>
        <p className='font-ui-cl' >APPROVE POOL</p>

        </div>
        <div className='col-md-6  mb-3 text-right'>  <CloseIcon className='close' onClick={handleClickss} ></CloseIcon></div>

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
        <button onClick={handleClicks} className="btn btn-ui w-100 mt-3" >
         Approve
        </button>


      </div>


    </div>
  </div>
</div>

)}

    </div>
  );
}
export default OverlayComponent;