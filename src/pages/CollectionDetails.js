import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import twitter from "../assets/images/Twitter.svg";
import ether from "../assets/images/etherscan-logo-circle.svg";
import { ParamsContext } from "../context/ParamsProvider";
import { FaEthereum } from "react-icons/fa";
import { BsLightningChargeFill } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";
import { MdShoppingCart } from "react-icons/md";
import { GrTwitter } from "react-icons/gr";
import { BiWorld } from "react-icons/bi";
import { AiOutlineShareAlt } from "react-icons/ai";
import { MdOutlinedFlag } from "react-icons/md";
// import { MdLoop } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { TiFilter } from "react-icons/ti";
import { AiOutlineCaretDown } from "react-icons/ai";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import metamask from "../assets/images/svg/metamask.svg";
import coinbase from "../assets/images/svg/coinbase.svg";
import wallet from "../assets/images/svg/walletconnect.svg";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { TbList } from "react-icons/tb";
import { TfiLayoutGrid2 } from "react-icons/tfi";

import "./new.css";
import "./trending.new.css";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3 from "web3";
const CollectionDetails = ({connectAccount}) => {
  const { id } = useParams();
  const { t } = useTranslation();
  // const { userId } = useContext(ParamsContext);

  const [collections, setCollections] = useState([]);
  const [collectionsAll, setCollectionsAll] = useState({});
  const [searchCollection, setSearchCollection] = useState([]);
  const [price, setPrice] = useState("2");

  const [collection, setCollection] = useState([]);
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [attribute, setAttribute] = useState([]);

  const [customAttribues, setCustomAttribute] = useState([]);
  const [searchAtt, setSearchAtt] = useState([]);
  const [myPublicAddress, setMyPublicAddress] = useState("qhut0...hfteh45");

  const isMetaMaskInstalled = useCallback(() => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  }, []);

  const checkWalletConnet = useCallback(async () => {
    if (isMetaMaskInstalled()) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (!!accounts[0]) {
        const walletAddress =
          accounts[0].split("").slice(0, 6).join("") +
          "..." +
          accounts[0]
            .split("")
            .slice(accounts[0].length - 7, accounts[0].length)
            .join("");
        setMyPublicAddress(walletAddress);
      }
    }
  }, [isMetaMaskInstalled]);


  const _handleWalletConnect = useCallback(async () => {
    setShow(false);
    setShownext(false);
    try {
      const provider = new WalletConnectProvider({
        infuraId: "84842078b09946638c03157f83405213", // Required
      });

      //  Enable session (triggers QR Code modal)
      await provider.enable();
      const web3 = new Web3(provider);
      let accounts = await web3.eth.getAccounts();
    
      const walletAddress =
        accounts[0].split("").slice(0, 6).join("") +
        "..." +
        accounts[0]
          .split("")
          .slice(accounts[0].length - 7, accounts[0].length)
          .join("");
      setMyPublicAddress(walletAddress);
    } catch (error) {
      console.error(error);
    }
  }, [isMetaMaskInstalled]);

  
  const _handleConnectWallet = useCallback(async () => {
    setShow(false);
    setShownext(false);
    const modal = document.getElementById("modal-metamask");
    if (!isMetaMaskInstalled()) {
      modal.classList.add("show");
      modal.style.display = "block";
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const walletAddress =
        accounts[0].split("").slice(0, 6).join("") +
        "..." +
        accounts[0]
          .split("")
          .slice(accounts[0].length - 7, accounts[0].length)
          .join("");
      setMyPublicAddress(walletAddress);
    } catch (error) {
      console.error(error);
    }
  }, [isMetaMaskInstalled]);

  const [show, setShow] = useState(false);

  const [shownext, setShownext] = useState(false);
  // const handleClosenext = () =>{)};
  const handleShownext = () => {
    setTimeout(() => {
      setShownext(true);
    }, 0);
    setShow(false);
  };

  // const volumeHandler = (e) => {
  //   console.log("Input value", e.target.value);
  //   const valN = e.target.value;
  //   const vluSrt = collectionsAll.filter((item) =>
  //     JSON.stringify(item.collection?.volume?.allTime).includes(valN)
  //   );
  //   setCollections(vluSrt);
  //   // parseInt(item?.volume?.allTime) === valN
  //   console.log(vluSrt);
  // };

  const nameHandler = (e) => {
    console.log("Input value", e.target.value);
    const valN = e.target.value;
    const vluSrt = collectionsAll.filter((item) =>
      item.token?.name.toLowerCase().includes(valN)
    );
    setCollections(vluSrt);
    // parseInt(item?.volume?.allTime) === valN
    console.log(vluSrt);
  };

  const handleChange = (event) => {
    const searchValue = event.target.value;

    const searchedData = searchCollection.filter((item) => {
      const searchTerm = searchValue.toLocaleLowerCase();
      const collectionName = item.token?.tokenId.toLocaleLowerCase();
      return searchTerm && collectionName.startsWith(searchTerm);
    });

    if (searchValue.length > 0) {
      setCollections(searchedData);
    } else {
      setCollections(searchCollection);
    }

    console.log(searchedData);
  };

  // modallllllll
  // const isMetaMaskInstalled = useCallback(() => {
  //   const { ethereum } = window;
  //   return Boolean(ethereum && ethereum.isMetaMask);
  // }, []);

  // const _handleConnectWallet = useCallback(async () => {
  //   const modal = document.getElementById("modal-metamask");

  //   if (!isMetaMaskInstalled()) {
  //     modal.classList.add("show");
  //     modal.style.display = "block";
  //     return;
  //   }
  //   try {
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //     const accounts = await window.ethereum.request({
  //       method: "eth_accounts",
  //     });
  //     const walletAddress =
  //       accounts[0].split("").slice(0, 6).join("") +
  //       "..." +
  //       accounts[0]
  //         .split("")
  //         .slice(accounts[0].length - 7, accounts[0].length)
  //         .join("");
  //     setMyPublicAddress(walletAddress);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [isMetaMaskInstalled]);
  // modallllll end
  const handleAttribute = (keys, values) => {
    if (searchAtt.length > 0) {
      searchAtt.map((item) => {
        if (item.keys === keys) {
          item.values = values;
          let x = [...searchAtt];
          // console.log(x);
          return setSearchAtt(x);
        } else {
          return setSearchAtt([...searchAtt, { keys, values }]);
        }
      });
    } else {
      setSearchAtt([...searchAtt, { keys, values }]);
    }
  };

  const [prc, setPrc] = useState("");

  const handleCross = (keys, values) => {
    const updateAtt = searchAtt.filter((item) => item.keys !== keys);
    setSearchAtt(updateAtt);
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {accept: '*/*', 'x-api-key': 'c8c99b47-ac0e-5677-915a-1f0571480193'}
    };

    // axios
    //   .get(
    //     `https://api-goerli.reservoir.tools/tokens/v5?collection=${id}&sortBy=floorAskPrice&sortDirection=asc&includeTopBid=false&includeAttributes=true&includeDynamicPricing=true&normalizeRoyalties=true`,options
    //   )
    //   .then(
    //     (response) => {
    //       setCollections(response.data.tokens);
    //       setCollectionsAll(response.data.tokens);
    //     }
    //   );

      // fetch(
      //   `https://api-goerli.reservoir.tools/tokens/v5?collection=${id}&sortBy=floorAskPrice&sortDirection=asc&includeTopBid=false&includeAttributes=true&includeDynamicPricing=true&normalizeRoyalties=true`,options
      // )
      //   .then((res) => res.json())
      //   .then((response) => {
      //     setCollections(response.data.tokens);
      //     console.log(response,'res')
      //     setCollectionsAll(response.data.tokens);
      //   });

  }, []);



  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {accept: '*/*', 'x-api-key': 'c8c99b47-ac0e-5677-915a-1f0571480193'}
    };
    fetch(`https://api-goerli.reservoir.tools/collections/v5?id=${id}`,options)
      .then((res) => res.json())
      .then((data) => setCollection(data.collections));

  }, []);


  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {accept: '*/*', 'x-api-key': 'c8c99b47-ac0e-5677-915a-1f0571480193'}
    };
    fetch(`https://api-goerli.reservoir.tools/collections/${id}/attributes/all/v2`,options)
      .then((response) => response.json())
      .then((response) => setCustomAttribute(response.attributes))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {accept: '*/*', 'x-api-key': 'c8c99b47-ac0e-5677-915a-1f0571480193'}
    };
    fetch(`
    https://api-goerli.reservoir.tools/collections/${id}/attributes/explore/v4`,options)
      .then((res) => res.json())
      .then((data) => setAttribute(data.attributes));
  }, []);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {accept: '*/*', 'x-api-key': 'c8c99b47-ac0e-5677-915a-1f0571480193'}
    };
    fetch(
      `https://api-goerli.reservoir.tools/tokens/v5?collection=${id}&sortBy=floorAskPrice&sortDirection=asc&includeTopBid=false&includeAttributes=true&includeDynamicPricing=true&normalizeRoyalties=true&${searchAtt
        .map((atri) => `attributes%5B${atri.keys}%5D=${atri.values}`)
        .join("&")} `,options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCollections(data.tokens);
        setSearchCollection(data.tokens);
      });
  }, [searchAtt]);

  useEffect(() => {}, [collections]);

  return (
    <div>
      <section style={{ marginTop: "80px" }}>
        <div
          style={{
            backgroundImage: `url(${collection[0]?.banner})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            // backgroundBlendMode: "overlay",
            backgroundColor: "rgba(255, 255, 255, 0.685)",
            height: "200px",
          }}
        ></div>

        <div style={{ marginTop: "-70px" }} className="container ">
          {" "}
          <img
            width={100}
            className="rounded-circle border border-5 "
            src={collection[0]?.image}
            alt=""
          />
        </div>

        <div className="container px-4 ">
          <section className="d-flex flex-column flex-lg-row align-items-center gap-1">
            <div className="d-flex flex-column w-50">
              <h2>{collection[0]?.name}</h2>
              <p
                style={{ color: "#868C9F", fontSize: "13px" }}
                className="text-md"
              >
                {collection[0]?.description}
              </p>
            </div>

            <div className="w-50 px-3 ">
              <div className="d-flex justify-content-end  mb-3 ">
                <Link
                  to={`https://twitter.com/${collection[0]?.twitterUsername}`}
                >
                  <GrTwitter className="me-3 border rounded-circle p-1 d-block fs-3 text-secondary" />
                </Link>
                <Link to={`https://twitter.com/${collection[0]?.externalUrl}`}>
                  <BiWorld className="me-3 border rounded-circle p-1 d-block fs-3 text-secondary" />
                </Link>

                <AiOutlineShareAlt className="me-3 border rounded-circle p-1 d-block fs-3" />
                <MdOutlinedFlag className="me-3 border rounded-circle p-1 d-block fs-3" />
                <span className=" border rounded-pill px-2 d-block ">
                  <AiOutlineStar /> <span>0</span>
                </span>
              </div>

              <div className="row g-4  ">
                <div className="col-6 col-lg-3 border rounded-start py-3 text-center">
                  <p className="text-secondary p-0 m-0">{t("flootPrice")}</p>
                  <h6 className="priceBox">
                    {" "}
                    <FaEthereum />
                    {collection[0]?.floorAsk?.price?.amount?.decimal}
                  </h6>
                </div>
                <div className="col-6 col-lg-3 border  py-3 text-center">
                  <p className="text-secondary p-0 m-0">{t("totalVolume")}</p>
                  <h6 className="priceBox">
                    <FaEthereum />
                    {(collection[0]?.volume?.allTime / 1000).toFixed(2)}k
                  </h6>
                </div>
                <div className="col-6 col-lg-3 border  py-3 text-center">
                  <p className="text-secondary p-0 m-0">{t("items")}</p>
                  <h6 className="priceBox"> {collection[0]?.tokenCount}</h6>
                </div>
                <div className="col-6 col-lg-3 border rounded-end py-3 text-center">
                  <p className="text-secondary p-0 m-0">{t("topOffer")}</p>
                  <h6 className="priceBox">
                    {/* 🥈💸{" "} */}
                    {Math.max(
                      collection[0]?.floorSale["1day"],
                      collection[0]?.floorSale["7day"],
                      collection[0]?.floorSale["30day"]
                    )}
                  </h6>
                </div>
              </div>
            </div>
          </section>

          {/*  */}

          {/*  */}
        </div>
        <div className="container d-flex flex-column flex-lg-row align-items-center gap-1">
          <div class="container">
            <div class="row">
              <div class="d-flex flex-row align-items-center justify-content-between ">
                <div className="btn-sections">
                  <div className="btn-section">
                    <Link to="/" className="single-btn-area">
                      <button className="single-btn">Overview</button>
                    </Link>
                    <Link to="/" className="single-btn-area">
                      <button className="single-btn">Buy NFTs</button>
                    </Link>
                    <Link to="/" className="single-btn-area">
                      <button className="single-btn">Pro Trade</button>
                    </Link>
                    <Link to="/" className="single-btn-area">
                      <button className="single-btn">Analytics</button>
                    </Link>
                    <Link to="/" className="single-btn-area">
                      <button className="single-btn">Activity</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container temp">
          <div className="d-flex flex-column flex-lg-row align-items-center gap-1">
            <div class="container-fluid">
              <div class="row">
                <div class="col-sm-12 col-md-12 col-lg-5 col-xl-5 d-flex flex-row align-items-center justify-content-between ">
                  <div class="sub1">
                    <div class="d-flex flex-row  justify-content-start">
                      <div class="flex-fill col-2 col-lg-4  justify-content-start">
                        <button className="reload">
                          <TiFilter className="reload-icon" />
                        </button>
                      </div>
                      <div class="flex-fill col-8 col-lg-8 filter-search-box">
                        <div
                          id="itemSearch"
                          className="col-12 justify-content-betweenmenu-search mb-0"
                        >
                          <form
                            role="search"
                            method="get"
                            id="searchItemform"
                            className="searchform"
                          >
                            <input
                              type="search"
                              className="search searchbox form-control border rounded "
                              name="s"
                              id="searchItem"
                              // value={value}
                              onChange={handleChange}
                              placeholder="Search NFTs"
                            />

                            <input
                              className="d-none"
                              type="submit"
                              id="searchItemsubmit"
                              value="Search"
                            />
                          </form>
                        </div>
                      </div>
                      <div class="flex-fill col-2 col-lg-4 last-btn">
                        <button className="reload">
                          <TfiReload className="reload-icon" />
                        </button>
                      </div>

                      {/* <div class='flex-fill'>Flex Item 3</div> */}
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 align-items-center justify-content-between ">
                  <div class="sub2">
                    <div class="d-flex flex-row">
                      <div class="flex-fill smallLayout">
                        <p className="d-flex  justify-content-center">
                          <span className="live me-2"></span>
                          <p className="live-text">{t("liveview")}</p>
                        </p>
                      </div>
                      <div class="flex-fill time-text-box">
                        <p className="time-text">
                          {collections &&
                            collections.length > 0 &&
                            moment()
                              .startOf("hour")
                              .fromNow(
                                collections[0].token?.lastFlagUpdate
                              )}{" "}
                          {t("ago")}
                        </p>
                      </div>
                      <div class="flex-fill result-text-box">
                        <p className="result-text">
                          {collection[0]?.tokenCount} {t("results")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3 align-items-center justify-content-end  shortbox">
                  <div class="sub3">
                    <div class="d-flex flex-row">
                      <div class="flex-fill">
                        <div className="price-box">
                          <select
                            className="form-select pointer"
                            aria-label="Default select example"
                            onChange={(e) => setPrice(e.target.value)}
                          >
                            <option value="2">
                              {t("price")}: {t("lowToHigh")}
                            </option>
                            <option value="1">
                              {t("price")}: {t("highToLow")}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="flex-fill">
                        <div className="view-type d-flex align-items-center justify-content-center">
                          <button className="list-view">
                            <TbList className="reload-icon" />
                          </button>
                          <button className="grid-view">
                            <TfiLayoutGrid2 className="reload-icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div class='row px-4 pt-4 d-flex flex-column align-items-center justify-content-between flex-md-row'>
					<div className='col-md flex-grow-1 w-100 mb-3 mb-md-0 d-flex '>
						<div
							id='itemSearch'
							className='col-12 justify-content-betweenmenu-search mb-0'>
							<form
								role='search'
								method='get'
								id='searchItemform'
								className='searchform'>
								<input
									type='search'
									className='search form-control border rounded '
									name='s'
									id='searchItem'
									// value={value}
									onChange={handleChange}
								/>

								<input
									className='d-none'
									type='submit'
									id='searchItemsubmit'
									value='Search'
								/>
							</form>
						</div>
					</div>
					<div class='col-md align-items-start justify-content-start w-100'>
						<div className='px-4 col-12 d-flex flex-row align-items-start justify-content-between'></div>
						<div className='px-4 col-12 d-flex flex-row align-items-start justify-content-between'></div>
					</div>
				</div> */}
      </section>

      <div className="container py-2 px-4">
        <div className="row">
          {/* <div className='col-12 col-lg-3'>
						<h2>{t("filter")}</h2>
						<div className='accordion ' id='accordionExample'>
							{customAttribues &&
								customAttribues.map((item, index) => (
									<div className='accordion-item'>
										<h2 className='accordion-header' id={"heading" + index}>
											<button
												className='accordion-button'
												type='button'
												data-bs-toggle='collapse'
												data-bs-target={"#collapse" + index}
												aria-expanded='false'
												aria-controls={"collapse" + index}>
												{item.key}
											</button>
										</h2>
										<div
											id={"collapse" + index}
											className='accordion-collapse collapse'
											aria-labelledby={"heading" + index}
											data-bs-parent='#accordionExample'>
											<div className='accordion-body pointer'>
												{item.values?.map((subItem) => (
													<p
														onClick={() =>
															handleAttribute(item.key, subItem.value)
														}>
														{subItem.value} - {subItem.count}
													</p>
												))}
											</div>
										</div>
									</div>
								))}
						</div>
					</div> */}
          {/* data from user collection */}

          {/* <div>hello</div> */}

          <div className="col-12 col-lg-12">
            {/* <h1>Data from user collection api: {id}</h1> */}
            <div className="d-flex gap-2 mb-3">
              {searchAtt
                .filter(
                  (obj, index, self) =>
                    index === self.findIndex((t) => t.keys === obj.keys)
                )
                .map((item, idx) => (
                  <div className="border p-2 px-3 rounded-pill bg-light d-flex gap-3">
                    <p className="m-0">
                      {" "}
                      {item.keys} {item.values}
                    </p>{" "}
                    <p
                      className="m-0 pointer"
                      onClick={() => handleCross(item.keys, item.values)}
                    >
                      x
                    </p>
                  </div>
                ))}
            </div>
            <div>
              <div className="row g-0 gap-0">
                {/* {collections && collection.length === 0 && (
                  <div>
                    <h1 className="text-danger text-center">
                      Loading...
                    </h1>
                  </div>
                )} */}
                {collections && collections.length > 0 ? (
                  collections
                    .sort((a, b) => {
                      if (price === "2") {
                        return (
                          a.market?.floorAsk?.price?.amount?.decimal -
                          b.market?.floorAsk?.price?.amount?.decimal
                        );
                      } else if (price === "1") {
                        return (
                          b.market?.floorAsk?.price?.amount?.decimal -
                          a.market?.floorAsk?.price?.amount?.decimal
                        );
                      }
                    })
                    // ?.filter((item) => {
                    //   return filteredData.toLowerCase() === ""
                    //     ? item
                    //     : (
                    //         item.collection?.name.toLowerCase() ||
                    //         JSON.stringify(item.collection?.volume?.allTime)
                    //       ).includes(filteredData);
                    // })
                    // .sort((a,b)=> a.market?.floorAsk?.price?.amount
                    // ?.decimal -b.market?.floorAsk?.price?.amount
                    // ?.decimal)
                    .map((collect, index) => (
                      // console.log(collection, "gggg")
                      <div
                        className="col-6 col-md-6 col-lg-2 card "
                        key={index}
                      >
                        <div className="border  m-1 box position-relative">
                          <Link
                            to={`/trendingDetails/${collect.token?.collection?.id}/${collect.token.tokenId}`}
                          >
                            <div className="card__box">
                              <div className="main">
                                <img
                                  className="parent_img w-100"
                                  src={collect.token?.image}
                                  alt=""
                                />
                                {/* <MdShoppingCart className="cart_icon" /> */}
                                <p className="bg-white p-2 rounded">
                                  {" "}
                                  {collect.market?.floorAsk?.price?.amount?.decimal.toFixed(
                                    4
                                  )}
                                </p>
                                <div className="w-100 card_bottom px-4 d-flex justify-content-between align-items-center">
                                  <div className="small-img">
                                    <img
                                      className="rounded-circle"
                                      width={30}
                                      src={collection[0]?.image}
                                      alt=""
                                    />
                                  </div>
                                  <div
                                    style={{ height: "25px", width: "25px" }}
                                    className="text-center bg-light  rounded-circle"
                                  >
                                    <AiOutlineStar className="text-secondary fw-bold" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                          <div className="text-center mt-3 mx-2">
                            <div className="d-flex px-2 mt-4">
                              <p className="fw-bold mb-0">
                                {" "}
                                #{collect.token?.tokenId}
                              </p>
                              {/* <p>{collection.token?.name}</p>{" "} */}
                            </div>
                            <div className="col-12  d-flex justify-content-between gap-3 px-2">
                              <p className="cardText">
                                {t("lastPrice")}
                                <span className="priceValue">
                                  <FaEthereum />
                                  {collect.token?.lastSell?.value}
                                </span>
                              </p>
                              <p className="text-start ms-4"></p>
                            </div>
                            <div class="d-flex align-items-center ">
                              <a
                                href="#!"
                                class="w-100  text-primary fw-bold text-center pb-3"
                                // onClick={_handleConnectWallet}
                                id="connectWallet"
                                onClick={() => {
                                  setShow(true);
                                  setPrc(collect);
                                }}
                              >
                                <BsLightningChargeFill className="me-2" />
                                 {t("buyNow")}
                              </a>







                  <Modal
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    size="sm"
                    show={show}
                    onHide={() => setShow(false)}
                  >
                    <Modal.Header closeButton className="mx-auto border-0 pb-0">
                      <Modal.Title className="mx-auto">
                        {t("connectWallet")}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p style={{ fontSize: "14px" }} className="text-center">
                        {t("byConnectiongYourWallet")}{" "}
                        <Link to="#">{t("termsOfService")}</Link> {t("andOur")}{" "}
                        <Link to="#">{t("privacyPolicy")}</Link> .
                      </p>
                      <div
                        // onClick={_handleConnectWallet}
                        onClick={connectAccount}
                        id="connectWallet"
                        style={{ cursor: "pointer" }}
                        className="option d-flex justify-content-between align-items-center border-bottom"
                      >
                        <p style={{ fontSize: "20px" }} className="mb-0">
                          <img src={metamask} alt="" /> {t("metaMask")}
                        </p>
                        <AiOutlineArrowRight className="icon" />
                      </div>
                      <div
                        onClick={handleShownext}
                        style={{ cursor: "pointer" }}
                        className="option d-flex justify-content-between align-items-center border-bottom"
                      >
                        <p style={{ fontSize: "20px" }} className="mb-0">
                          <img src={coinbase} alt="" /> {t("bullPass")}
                        </p>
                        <AiOutlineArrowRight className="icon" />
                      </div>
                      <div
                        onClick={_handleWalletConnect}
                        style={{ cursor: "pointer" }}
                        className="option d-flex justify-content-between align-items-center border-bottom"
                      >
                        <p style={{ fontSize: "20px" }} className="mb-0">
                          <img src={wallet} alt="" /> {t("walletConnect")}
                        </p>
                        <AiOutlineArrowRight className="icon" />
                      </div>

                      {/* <div
												style={{ cursor: "pointer" }}
												className='option d-flex justify-content-between align-items-center border-bottom'>
												<p
													style={{ fontSize: "20px" }}
													className='mb-0 fw-bold'>
													<img src={coinbase} alt='' /> Coinbase Wallet
												</p>
												<AiOutlineArrowRight className='icon' />
											</div> */}

                      {/* <p
												style={{ cursor: "pointer" }}
												className='text-center cursor-pointer pt-3'>
												{t("iDOntHaveAWallet")}{" "}
												
											</p> */}

                      <Link
                        onClick={() => setShow(false)}
                        to="/login"
                        style={{
                          height: "3rem",
                          margin: "0px",
                          padding: "0px",
                          cursor: "pointer",
                          border: "1px solid blue",
                          borderRadius: "1rem",
                          color: "blue",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="text-center cursor-pointer"
                      >
                        Login | Signup
                      </Link>
                    </Modal.Body>
                  </Modal>

                  <Modal show={shownext}>
                    <Modal.Header>
                      <Modal.Title>{t("bullPassPayment")}</Modal.Title>
                      <span
                        style={{
                          cursor: "pointer",
                          border: "1px solid",
                          borderRadius: "50%",
                          fontSize: "15px !important",
                          padding: "0 6px",
                        }}
                        onClick={() => setShownext(false)}
                      >
                        X
                      </span>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            {t("emailAddress")}
                          </label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleFormControlInput1"
                          />
                        </div>
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            {t("price")}
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                          />
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={() => setShownext(false)}
                      >
                        {t("submit")}
                      </Button>
                    </Modal.Footer>
                  </Modal>













                            </div>
                          </div>
                          {/* <div className="text-center mt-2">
                            <div className="d-flex justify-content-around">
                              <p>{collection.token?.name}</p>{" "}
                              <p className="border rounded px-2">
                                {" "}
                                {collection.token?.rarity}
                              </p>
                            </div>
                            <p className="text-start ms-4">
                              <FaEthereum />
                              {
                                collection.market?.floorAsk?.price?.amount
                                  ?.decimal
                              }
                            </p>
                            <div>
                              <button type="">Buy Now</button>
                            </div>
                          </div> */}
                          {/* <li className="list-inline-item mb-0 me-3">
                            <p
                              id="connectWallet"
                              onClick={_handleConnectWallet}
                            >
                              <span className="btn-icon-dark">
                                <span className="btn btn-icon btn-pills btn-primary">
                                  <i className="uil uil-wallet fs-6"></i>
                                </span>
                              </span>
                              <span className="btn-icon-light">
                                <span className="btn btn-icon btn-pills btn-light">
                                  <i className="uil uil-wallet fs-6"></i>
                                </span>
                              </span>
                            </p>
                          </li> */}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="mt-5">
                    <h1 className="text-danger text-center">
                      {t("noItemAvailable")}
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* data from attribute */}
          {/* <div className="col-12 col-lg-9">
            <h1>Data from attributes api: {id}</h1>
            <div>
              <div className="row g-5">
                {attribute.length === 0 && (
                  <div>
                    <h1 className="text-danger text-center">
                      Loading...
                    </h1>
                  </div>
                )}
                {attribute.length > 0 &&
                  attribute
                    ?.filter((item) => {
                      return filteredData.toLowerCase() === ""
                        ? item
                        : item.key.toLowerCase().includes(filteredData);
                    })
                    .map((att, index) => (
                      <div className="col-12 col-md-6 col-lg-3" key={index}>
                        <Link to={`/trendingDetails/${index}`}>
                          {att.sampleImages.map((pic, index) => (
                            <img
                              key={index}
                              className="w-100 my-2"
                              src={pic}
                              alt=""
                            />
                          ))}
                        </Link>
                        <p className="text-center">
                          {att.key} <br />
                          {att.value}
                        </p>
                      </div>
                    ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CollectionDetails;
