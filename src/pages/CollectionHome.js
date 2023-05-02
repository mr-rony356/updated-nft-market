import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ParamsContext } from "../context/ParamsProvider";
import { FaEthereum } from "react-icons/fa";
import CollectionNav from "./CollectionNav";
import { AuthStateContext } from "../context/authContext";
import { useTranslation } from "react-i18next";
import "./trending.css";
import Pagination from "../utils/Pagination";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const CollectionHome = () => {
	const { t } = useTranslation();
	const [page, setPage] = useState(1);
	const [amount, setAmount] = useState(50);
	const { setUserId } = useContext(AuthStateContext);

	const [collections, setCollection] = useState([]);
	const [newCollections, setNewCollections] = useState([]);
	const [allNewCollections, setAllNewCollections] = useState([]);
	const [dataSort, setDataSort] = useState("1h");

	const [load, setLoad] = useState(20);
	const [show, setShow] = useState(true);

	const handleChange = (event) => {
		const searchValue = event.target.value;

		const searchedData = allNewCollections.filter((item) => {
			const searchTerm = searchValue.toLocaleLowerCase();
			const collectionName = item.collection?.name.toLocaleLowerCase();
			return searchTerm && collectionName.startsWith(searchTerm);
		});

		if (searchValue.length > 0) {
			setNewCollections(searchedData);
		} else {
			setNewCollections(allNewCollections);
		}

		console.log(searchedData);
	};

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {accept: '*/*', 'x-api-key': 'c8c99b47-ac0e-5677-915a-1f0571480193'}
		  };
		fetch(`https://api-goerli.reservoir.tools/collections/v5`,options)
			.then((res) => res.json())
			.then((data) => setCollection(data.collections));
	}, []);

	useEffect(() => {
		const nftGoOptions = {
			method: 'GET',
			headers: {
			  accept: 'application/json',
			  'X-API-KEY': '7d043c4a-eb15-45bb-98ee-5b4392e9a821'
			}
		  };
		fetch(
			`https://api.nftgo.io/api/v1/ranking/trending-collections?sortby=saleNum&asc=-1&offset=0&limit=100&range=${dataSort}`,nftGoOptions
		)
			.then((res) => res.json())
			.then((data) => {
				setNewCollections(data?.data?.list);
				setAllNewCollections(data?.data?.list);
			});
	}, [dataSort]);

	const handleLoadMore = () => {
		setLoad(load + 20);
	};
	useEffect(() => {
		if (load >= collections.length) {
			setShow(false);
		} else {
			setShow(true);
		}
	}, [load]);

	// console.log("okCollection", collections);
	const lastIndex = page * amount;
	const firstIndex = lastIndex - amount;
	const currentLinks = newCollections.slice(firstIndex, lastIndex);

	console.log(firstIndex, lastIndex, "1st last");

	return (
		<div>
			<div className='trending_section container custom__container  '>
				{/* <p
          style={{ fontSize: "24px", fontWeight: "700" }}
          className="text-start  py-5  headingcss'"
        >
          {t("trending")}
        </p> */}
				{/* nav */}
				<div
					style={{ fontSize: "16px", fontWeight: "600" }}
					className='d-flex gap-4  mb-3'></div>
				{/* nav */}

				{/* data sorting navbar start */}
				<div className='d-flex justify-content-between'>
					<div className='trending_btn'>
						<Link
							style={{ fontSize: "20px" }}
							to='/trending'
							className={`d-block`}>
							<Button className='col-12 text-left d-block ' variant='primary'>
								{t("trending")}
							</Button>
						</Link>
					</div>
				</div>
				{/* data sorting navbar end */}

				<div className='mt-1 '>
					<div className='table_section'>
						<table className='table caption-top shadow rounded'>
							<thead>
								<tr
									className=''
									style={{
										fontSize: "14px",
										fontWeight: "700",
										color: "#111119",
									}}>
									{/* <th scope="col">#</th> */}
									<th scope='col' className='tablefix'>
										{t("collection")}
									</th>
									<th className='text-end' scope='col'>
										{t("flootPrice")}
									</th>
									<th className='text-end' scope='col'>
										{" "}
										{t("volume")}({dataSort})
									</th>
									<th className='text-end' scope='col'>
										{" "}
										{t("sales")}({dataSort})
									</th>
									<th className='text-end' scope='col'>
										{t("holers")}
									</th>
									<th className='text-end' scope='col'>
										{t("listed")}
									</th>
								</tr>
							</thead>
							{/* <tbody>
              {collections
                // .slice(0, load)
                .sort((a, b) => b.floorSale["1day"] - a.floorSale["1day"])
                .map((collection, index) => (
                  <tr key={index} className="pointer hover-background">
                    <th scope="row">{index + 1}</th>
                    <td
                    // onClick={() => setUserId(collection?.primaryContract)}
                    >
                      <Link to={`/trending/${collection?.primaryContract}`}>
                        <img
                          width={50}
                          height={50}
                          className="rounded-circle  me-4"
                          src={collection.image}
                          alt=""
                        />
                        {collection.name}
                      </Link>{" "}
                    </td>
                    <td>
                      {" "}
                      {(collection.volume["allTime"] / 1000).toFixed(2)} k{" "}
                      <br />{" "}
                      <span className="text-success">
                        {" "}
                        {(
                          (collection.volume["30day"] -
                            collection.volume["1day"]) /
                          100
                        ).toFixed(2)}{" "}
                        %
                      </span>
                    </td>
                    <td>
                      {" "}
                      <FaEthereum />
                      {collection.floorAsk?.price?.amount?.decimal.toFixed(
                        2
                      )}{" "}
                    </td>
                    <td className="d-flex flex-column ">
                      <p className="mb-0">
                        {collection.floorSale["1day"].toFixed(2)}
                      </p>

                      <p className="mb-0">
                        <span
                          className={
                            collection.floorSale["30day"] -
                              collection.floorSale["1day"] >=
                            0
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {" "}
                          {(
                            (collection.floorSale["30day"] -
                              collection.floorSale["1day"]) *
                            100
                          ).toFixed(1)}{" "}
                          %
                        </span>
                      </p>
                    </td>
                    <td>{collection.tokenCount}</td>
                  </tr>
                ))}
            </tbody> */}

							{/* collection list */}
							<tbody>
								{currentLinks?.slice(0, 10).map((collection, index) => {
									return (
										<tr key={index} className='pointer hover-background'>
											{/* <th style={{ fontSize: "14px" }} scope="row">
                        {firstIndex === 0 ? index + 1 : index+51}
                      </th> */}
											<td
												className='tablefix'
												// onClick={() => setUserId(collection?.primaryContract)}
												style={{ width: "305px" }}>
												<Link
													to={`/trending/${collection.collection?.collTags?.contract}`}>
													<img
														width={40}
														height={40}
														className='rounded-circle mx-1'
														src={collection.collection?.logo}
														alt=''
													/>
													<span
														style={{ fontSize: "14px" }}
														className='text-black '>
														{collection.collection?.name.slice(0, 10)}
													</span>
												</Link>{" "}
											</td>
											<td>
												<div className='text-end'>
													<div style={{ fontSize: "14px" }}>
														<FaEthereum />
														{collection.floorPrice?.tokenPrice}
													</div>
													<div
														className='text-secondary '
														style={{ fontSize: "12px" }}>
														{(collection.floorPriceChange * 100).toFixed(3)}%
													</div>
												</div>
											</td>
											<td className='text-end'>
												<div style={{ fontSize: "14px" }}>
													<FaEthereum />
													{collection.volumeEth.toFixed(2)}
												</div>
												<div
													className={
														collection.volumeEthChange * 100 < 0
															? "text-danger "
															: "text-success "
													}
													style={{ fontSize: "12px" }}>
													{(collection.volumeEthChange * 100).toFixed(2)}%
												</div>
											</td>
											<td className='text-end'>
												<div style={{ fontSize: "14px" }}>
													{collection.saleNum}
												</div>
												<div
													className={
														collection.saleNumChange * 100 < 0
															? "text-danger "
															: "text-success "
													}
													style={{ fontSize: "12px" }}>
													{(collection.saleNumChange * 100).toFixed(2)}%
												</div>
											</td>
											<td style={{ fontSize: "14px" }} className='text-end'>
												{collection.holderNum}
											</td>
											<td style={{ fontSize: "14px" }} className='text-end'>
												{(
													(collection.listingNum / collection.supply) *
													100
												).toFixed(2)}
												%
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					{/* {show && (
            <button onClick={handleLoadMore} type="">
              Load More
            </button>
          )} */}
					<Pagination
						page={page}
						setPage={setPage}
						members={newCollections.length}
						amount={amount}
					/>
				</div>
			</div>
		</div>
	);
};

export default CollectionHome;
