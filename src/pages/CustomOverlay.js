import React, { useState } from 'react';
import '../pages/homestyle.css';
import girl from '../assets/images/icons/girl.png';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Textarea from '@mui/joy/Textarea';


const today = dayjs();
const tomorrow = dayjs().add(1, 'day');



function OverlayComponent() {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleClick = () => {
    setShowOverlay(!showOverlay);
  }

  return (
    <div>
      <div onClick={handleClick}>
      <a
                    
                    className="mx-3 btn btn-pills btn-outline-primary"
                  >
                    {("createPool")}
                  </a>
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
                value={'0x37068cf3ff902f517b76fd0118ab40959880d808/245'} />
              <p className='sm text-left '>Enter OpenSea listing at a fixed price.</p>

              <div className="mb-3">
                <p className="md bold-lg text-left">Duration</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={['DatePicker', 'DateTimePicker', 'DateRangePicker']}
                  >
                    <DatePicker />

                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="mb-3">
                <p className="text-left sm"> Description</p>
                <div className="mb-3">
                  <Textarea className="border-ui" minRows={2} />
                </div>


              </div>
              <div className="mb-3">
                <button className="btn btn-ui rounded-md w-100 mt-3" >
                  CREATE POOL
                </button> 
                 <button onClick={handleClick} className="btn btn-ui-muted rounded-md w-100 mt-3" >
                  Cancel
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