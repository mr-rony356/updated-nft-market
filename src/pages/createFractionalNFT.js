import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useWeb3React } from '@web3-react/core';
import { ethereum, polygon, arrowRight } from "../utils/images.util";
import axios from "axios";
import icon1 from "../assets/images/icons/3.png"
import icon2 from "../assets/images/icons/1.png"
import icon3 from "../assets/images/icons/6.png"
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { notFoundImg } from "../utils/images.util";
import NFT2 from "../components/nft2.component";
import Input from '@mui/material/Input';
import "../components/styles/NFTStyles.css";
import { isApprovedFractionalizer, isApprovedAuctionFractionalizer, setApproveFractionalizer, setApproveAuctionFractionalizer, callFractionalize, callAuctionFractionalize } from "../utils/fraction";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles/item-details.style";
import TextField from '@mui/material/TextField';
import Textarea from '@mui/joy/Textarea';
import { useTranslation } from "react-i18next";
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FilledInput from '@mui/material/FilledInput';
import FormControl from '@mui/material/FormControl';
import { Button, Overlay } from "react-bootstrap";
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');
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

const CreateFractionalNFT = (props) => {
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
    if (account) {
      fetchItems('owned', page);
    }
  }, [account, page]);
  const fetchItems = (name, page) => {
    // let query = `/api/item/?owner=${account}&page=${page}&owned=true`;
    // setLoading(true);
    // axios.get(query)
    //   .then(res => {
    //     setLoading(false);
    //     initialItemsLoaded ? setItems(res.data.items) : setItems(items.concat(res.data.items));
    //     if (res.data.items.length === 0) setNoItems(true);
    //   }).catch(err => {
    //     setLoading(false);
    //     setItems([]);
    //     setNoItems(true);
    //     console.log(err);
    //   })
    let query = `/api/firstupdate/?owner=${account}&page=${page}&owned=true`;
    setLoading(true);
    console.log(query);
    axios
      .get(query)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        initialItemsLoaded
          ? setItems(res.data.items)
          : setItems(items.concat(res.data.items));
        if (res.data.items.length === 0) setNoItems(true);
      })
      .catch((err) => {
        setLoading(false);
        setItems([]);
        setNoItems(true);
        console.log(err);
      });
  }

  const clickStep = (num) => {
    if (!account) return;
    setStep(num);
    let f_marketplace = sessionStorage.getItem('f_marketplace');
    if (!f_marketplace) sessionStorage.setItem('f_marketplace', JSON.stringify({
      address: account?.toLowerCase(), nft: null, step: 1,
      vault: { name: '', symbol: '', price: 0, supply: 0 },
      type: 'fixed'
    }));
    else {
      let f_data = JSON.parse(f_marketplace);
      if (account?.toLowerCase() !== f_data.address) return;
      f_data.step = num;
      sessionStorage.setItem('f_marketplace', JSON.stringify(f_data));
    }
  }
  useEffect(() => {
    checkStorage();
  }, [account]);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };
  function loadMore() {
    if (!loading) {
      setInitialItemsLoaded(false);
      setPage(page + 1);
    }
  }
  const handleError = (msg) => {
    setSnackBarMessage(msg);
    setOpenSnackbar(true);
  }
  // Second page
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

  const checkApproval = async () => {
    if (!account || step !== 3) return;
    let _flag = true;
    if (type2 === 'auction') {
      let isApproved = await isApprovedAuctionFractionalizer(selectedItem.itemCollection, selectedItem.tokenId, chainId, library.getSigner());
      if (isApproved) selectedItem.isApproved = true;
      else _flag = false;
    } else {
      let isApproved = await isApprovedFractionalizer(selectedItem.itemCollection, selectedItem.tokenId, chainId, library.getSigner());
      if (isApproved) selectedItem.isApproved = true;
      else _flag = false;
    }
    setSelectedItem(selectedItem);
    setFeeFlag(_flag);
  }

  useEffect(() => {
    checkApproval();
  }, [account, step]);

  const onApprove = async (collection, tokenId) => {
    if (!account) return;
    setInApprove(true);
    if (type2 === 'auction') {
      const res = await setApproveAuctionFractionalizer(collection, tokenId, chainId, library.getSigner());
      console.log('type2 res', res)
      setInApprove(false);
      if (res) {
        handleError("NFT Token is approved successfully!");
        checkApproval();
      } else handleError("Approving is failed!");
    } else {
      const res = await setApproveFractionalizer(collection, tokenId, chainId, library.getSigner());
      console.log('!type2', res)
      setInApprove(false);
      if (res) {
        handleError("NFT Token is approved successfully!");
        checkApproval();
      } else handleError("Approving is failed!");
    }
  }
  const checkStorage = () => {
    let f_marketplace = sessionStorage.getItem('f_marketplace');
    if (!f_marketplace) return;
    let f_data = JSON.parse(f_marketplace);
    if (account?.toLowerCase() !== f_data.address) {
      sessionStorage.removeItem("f_marketplace");
      return;
    }
    setSelectedItem(f_data.nft);
    setStep(parseInt(f_data.step));
    setName2(f_data.vault.name);
    setSymbol2(f_data.vault.symbol);
    setPrice2(f_data.vault.price);
    setSupply2(f_data.vault.supply);
    setType2(f_data.type);
  }

  const onFractionalize = async () => {
    setInFractionalize(true);
    let _target = selectedItem.itemCollection;
    let _tokenId = selectedItem.tokenId;
    if (type2 === 'fixed') {
      callFractionalize(_target, _tokenId, name2, symbol2, supply2, price2, chainId, library.getSigner()).then(res => {
        if (res) {
          handleError("Fractionalizing is success!");
          //post data to backend db
          axios.post('/api/createFractions', {
            address: _target,
            txhash: res.hash,
            name: name2,
            symbol: symbol2,
            supply: supply2,
            price: price2,
            target: _target,
            tokenId: _tokenId,
            released: false,
            seller: account.toLowerCase(),
            flag: false,
            kickoff: 0,
            duration: 0,
            fee: 0
          })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
            });

          sessionStorage.removeItem('f_marketplace');
          window.location.href = `/profile/${account}`
        } else handleError("Fractionalizing is failed!");
        setInFractionalize(false);
      }).catch(err => { console.log(err); setInFractionalize(false); })
    } else if (type2 === 'auction') {
      const currentTime = new Date().getTime()
      let startTimeStamp = 0
      if (startType === 'specific') {
        if (!startDate) {
          handleError("Please select start time.");
          setInFractionalize(false);
          return;
        }
        const startTime = startDate.getTime()
        if (currentTime >= startTime) {
          handleError("The start time must be after the current time.");
          setInFractionalize(false);
          return;
        }
        startTimeStamp = Math.floor(startTime / 1000)
      } else {
        startTimeStamp = Math.floor(currentTime / 1000)
      }
      let endTimeStamp = 0
      if (endType === 'specific') {
        if (!endDate) {
          handleError("Please select end time.");
          setInFractionalize(false);
          return;
        }
        const endTime = endDate.getTime()
        endTimeStamp = Math.floor(endTime / 1000)
        if (currentTime >= endTime) {
          handleError("The end time must be after the current time.");
          setInFractionalize(false);
          return;
        }
      } else {
        const later = Number(endType);
        endTimeStamp = startTimeStamp + 86400 * later;
      }
      const durationTimestamp = endTimeStamp - startTimeStamp;
      if (durationTimestamp < 1800) {
        handleError("The end time must be more than 30min than the start time.");
        setInFractionalize(false);
        return;
      }


      callAuctionFractionalize(_target, _tokenId, name2, symbol2, supply2, price2, startTimeStamp, durationTimestamp, chainId, library.getSigner()).then(res => {
        if (res) {
          handleError("Fractionalizing is success!");
          //post data to backend db
          axios.post('/api/createFractions', {
            address: _target,
            txhash: res.hash,
            name: name2,
            symbol: symbol2,
            supply: supply2,
            price: price2,
            target: _target,
            tokenId: _tokenId,
            released: false,
            seller: account.toLowerCase(),
            flag: true,
            kickoff: startType === 'specific' ? startTimeStamp : startTimeStamp,
            duration: durationTimestamp,
            fee: 0
          })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
            });

          sessionStorage.removeItem('f_marketplace');
          window.location.href = `/profile/${account}`
        } else handleError("Fractionalizing is failed!");
        setInFractionalize(false);
      }).catch(err => { console.log(err); setInFractionalize(false); })
    }
  }
  return (
    <>
      <section className="bg-half-100 w-100 pb-0 mb-0">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Button className=" text-left d-block mb-4" variant="primary">
                {t("fractionalizeNFT")}
              </Button>
              {/* <h4 className="text-dark title-dark fw-normal">
                {t("fractionalizeNFT")}
              </h4> */}
            </div>
            <div className="col-lg-4">
              {/* <div className="hstack gap-3 justify-content-end">
                <button className="btn btn-soft-primary">
                  <img src={ethereum} style={{ paddingRight: "15px" }}  alt="image"/>
                  Ethereum
                </button>
                <button className="btn btn-soft-primary">
                  <img src={polygon} style={{ paddingRight: "15px" }}  alt="image"/>
                  Polygon
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </section>
      <section className="section pb-5">
        <div className="container">
          <div className="hstack justify-content-center gap-4">
            <button
              className={step === 1 ? "text-dark" : "text-muted"}
              disabled={!account}
              onClick={() => clickStep(1)}
              style={{
                all: "none",
                cursor: "pointer",
                border: " none",
                background: "transparent",
              }}
            >
              <span
                className={
                  step === 1
                    ? "badge bg-primary"
                    : step === 2 || step === 3
                      ? "badge bg-success"
                      : "badge bg-dark2"
                }
                style={{
                  fontSize: 20,
                  borderRadius: "50%",
                  width: 30,
                  marginRight: 15,
                }}
              >
                1
              </span>
              Select NFTs
            </button>
            <img src={arrowRight} height={20} alt="image" />
            <button
              className={step === 2 ? "text-dark" : "text-muted"}
              disabled={!account || !selectedItem}
              onClick={() => clickStep(2)}
              style={{
                all: "none",
                cursor: "pointer",
                border: " none",
                background: "transparent",
              }}
            >
              <span
                className={
                  step === 2
                    ? "badge bg-primary"
                    : step === 3 ? "badge bg-success" : "badge bg-dark2"
                }
                style={{
                  fontSize: 20,
                  borderRadius: "50%",
                  width: 30,
                  marginRight: 15,
                }}
              >
                2
              </span>
              Settings
            </button>
            <img src={arrowRight} height={20} alt="image" />
            <button
              className={step === 3 ? "text-dark" : "text-muted"}
              style={{ all: "none", cursor: "pointer", border: " none", background: "transparent" }}
              disabled={!account || !step3}
              onClick={() => clickStep(3)}
            >
              <span
                className={step === 3 ? "badge bg-primary" : "badge bg-dark2"}
                style={{
                  fontSize: 20,
                  borderRadius: "50%",
                  width: 30,
                  marginRight: 15,
                }}
              >
                3
              </span>
              Fees
            </button>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        {!account && <section className="section pt-0">
          <div className="container text-center">
            <p style={{ fontSize: 18 }}>
              Please connect your wallet
              <br />
              <span style={{ fontSize: 14 }}>
                To fractionalize a NFT you should connect the wallet
              </span>
            </p>
            <button
              className="btn btn-soft-primary"
              onClick={props.connectAccount}
            >
              Connect Wallet
            </button>
          </div>
        </section>}
        {account && step === 1 && <>
          {items?.length < 1 &&
            <section className="section pt-0" style={{ paddingBottom: 40 }}>
              <div
                className="rounded-md p-3 container text-center"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
              >
                <p style={{ fontSize: 18 }}>
                  There are no NFTs in your wallet!
                  <br />
                  <span style={{ fontSize: 15 }}>What you could do</span>
                </p>
                <div className="row justify-content-center text-center">
                  <div className="col-xl-4 col-md-5">
                    <ul
                      style={{
                        fontSize: 15,
                        listStylePosition: "inside",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <li>Check your network (Polygon, Ethereum, etc)</li>
                      <li>Refresh the page</li>
                      <li>Check if your wallet is connected</li>
                      <li>
                        Or <span className="text-primary">buy</span> ur first
                        NFT!
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          }
          <div className="container mt-4 pt-2 mt-lg-0 pt-lg-0">
            <div className="d-flex justify-content-between mb-3">
              <h4>{selectedItem ? 'Selected a NFT' : 'You should select a NFT'}</h4>
              {selectedItem ? <button className="btn btn-primary rounded-md" onClick={() => clickStep(2)}> Next 🠮 </button>
                : <button className="btn btn-muted rounded-md" style={{ cursor: 'no-drop' }}> Next 🠮 </button>}
            </div>
            <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-4">
              {items.map((data, index) => {
                return (
                  <NFT2 item={data} updateStorage={checkStorage} address={account} handleError={handleError} key={`fractional-step1-${index}`} />
                );
              })}
            </div>
          </div>

          {/* Load More */}
          <div className="mt-4 text-center" style={{ display: noItems ? "none" : "" }}>
            <button className="btn btn-pills btn-primary mx-1" onClick={() => loadMore()}>
              {loading ? "Loading..." : "Load more"}
            </button>
          </div>
        </>}
        {account && step >= 2 && <div className="container text-center">
          <div className="row">
            <div className="col-md-6 text-center">
              <div className="sticky-bar p-3" style={{}}>
                {!selectedItem ? <img
                  src={notFoundImg}
                  className="img-fluid rounded-md shadow"
                  alt=""
                /> : <div className="col">
                  <div className="card nft-items rounded-md shadow overflow-hidden mb-1">
                    <div className="nft-image rounded-md position-relative overflow-hidden">
                      <Link to={`/item-details/${selectedItem.itemCollection}/${selectedItem.tokenId}`}>
                        <img src={'https://i.seadn.io/gcs/files/6ad18b0e2c45c7f1eda6be028f3d931a.png?auto=format&w=1000'} className="img-fluid" alt="" style={{ width: '100%' }} />
                      </Link>
                    </div>
                    <div className="card-body content position-relative p-0 mt-3">
                      <Link to={`/item-details/${selectedItem.itemCollection}/${selectedItem.tokenId}`} className="text-dark">
                        <Title>{selectedItem.name}</Title>
                      </Link>
                    </div>
                  </div>
                </div>}
              </div>
            </div>
            {step === 2 &&
             <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="p-4 bg-white rounded-md shadow-sm pb-5">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <button className={`btn ${type2 === 'fixed' ? 'btn-ui' : 'btn-ui-muted'}  w-100 mt-3`}
                      style={{ fontSize: 16 }}
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
                        <Link to={`/item-details/${selectedItem.itemCollection}/${selectedItem.tokenId}`}>
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
                    <p className="lg ui-font">$5764.68 USD</p>

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

                  <div className="mb-3">
                    <FormControl className="border-ui padding" fullWidth >
                      <Input
                        id="outlined-adornment-amount" value={3}
                        endAdornment={<InputAdornment className="bd-left lg bold-lg input-font" position="end">ETH</InputAdornment>}
                        aria-describedby="standard-weight-helper-text" placeholder="3"
                        inputProps={{
                          'aria-label': 'weight',
                        }}
                      />
                    </FormControl>
                    <FormHelperText id="standard-weight-helper-text">$5764.68 USD</FormHelperText>

                  </div>
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
                    defaultValue={1}
                    getAriaValueText={valuetext}
                    step={1}
                    size="small"
                    valueLabelDisplay="auto"
                     min={1} max={20}
                    marks={marks}></Slider>
                </Box>


                </div>

                {step3 ? <button className="btn btn-ui rounded-md w-100 mt-3" onClick={() => clickStep(3)}>
                  CREATE POOL
                </button> : <button className="btn btn-ui rounded-md w-100 mt-3" style={{ cursor: 'no-drop' }}>
                  CREATE POOL
                </button>}
                {/* <CustomOverlay></CustomOverlay> */}
              </div>
            </div>}
            {step === 3 && <div className="col-md-6 mt-4 pt-2 mt-sm-0 pt-sm-0">
              <div className="bg-white rounded-md shadow-sm p-3 mt-2">
                <h6 className="text-start">Unlock NFTs</h6>
                <div className="hstack justify-content-between bg-light p-3 rounded mt-2">
                  <div><img className="f-image" src={selectedItem?.mainData} alt="" /></div>
                  <div><span className="f-title">{selectedItem.name}</span></div>
                  <div>1 NFT</div>
                  <div>
                    {inApprove ? (<button className="btn btn-success btn-sm">Approving...</button>)
                      : (selectedItem.isApproved ?
                        <button className="btn btn-success btn-sm" disabled>Approved </button>
                        : <button className="btn btn-primary btn-sm" onClick={() => onApprove(selectedItem.itemCollection, selectedItem.tokenId)}>Approve </button>)}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-md shadow-sm p-3 mt-2">
                <h6 className="text-start">Mint Vault & Fractionalize</h6>
                <div className={`hstack flex-sm-column bg-light p-3 rounded ${feeFlag ? '' : 'd-none'}`}>
                  <p className="text-dark my-auto text-start">
                    Minting, in regards to NFTs,
                    is the process of taking a digital asset and converting
                    the digital file into a digital asset stored on the blockchain,
                    making it officially a commodity that can be bought and sold.
                  </p>
                  {feeFlag ?
                    (inFractionalize ? <button className="btn btn-primary w-100 mt-3" disabled>Paying...</button>
                      : <button className="btn btn-primary w-100 mt-3" onClick={() => onFractionalize()}>Pay fee</button>)
                    : <button className="btn btn-muted w-100 mt-3" disabled>Pay fee</button>}
                </div>
              </div>
            </div>}
          </div>
        </div>}
      </section>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleClose}
        message={snackBarMessage}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

export default CreateFractionalNFT;
