import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { formatIndianRupee } from "../../constants";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const AdminRanger = () => {
  const productList = [
    {
      id: "1",
      name: "Ranger 1",
      desc: "Excellent performance",
      price: "90000",
      prodStatus: "REJECTED",
      orderCount: "0",
      currentUnit: "20",
      bannerImage:
        "https://www.cnet.com/a/img/resize/eb766a8cf69ce087b8afc5d82be7cf7ef440bdef/hub/2021/10/01/0dc5aad3-9dfe-4be1-b37d-2f643d85cd66/20210925-iphone-13-pro-03.jpg?auto=webp&width=1200",
    },
    {
      id: "1",
      name: "Ranger 1",
      desc: "Excellent performance",
      price: "90000",
      prodStatus: "REJECTED",
      orderCount: "0",
      currentUnit: "20",
      bannerImage:
        "https://www.cnet.com/a/img/resize/eb766a8cf69ce087b8afc5d82be7cf7ef440bdef/hub/2021/10/01/0dc5aad3-9dfe-4be1-b37d-2f643d85cd66/20210925-iphone-13-pro-03.jpg?auto=webp&width=1200",
    },
    {
      id: "1",
      name: "Ranger 1",
      desc: "Excellent performance",
      price: "90000",
      prodStatus: "REJECTED",
      orderCount: "0",
      currentUnit: "20",
      bannerImage:
        "https://www.cnet.com/a/img/resize/eb766a8cf69ce087b8afc5d82be7cf7ef440bdef/hub/2021/10/01/0dc5aad3-9dfe-4be1-b37d-2f643d85cd66/20210925-iphone-13-pro-03.jpg?auto=webp&width=1200",
    },
    {
      id: "1",
      name: "Ranger 1",
      desc: "Excellent performance",
      price: "90000",
      prodStatus: "REJECTED",
      orderCount: "0",
      currentUnit: "20",
      bannerImage:
        "https://www.cnet.com/a/img/resize/eb766a8cf69ce087b8afc5d82be7cf7ef440bdef/hub/2021/10/01/0dc5aad3-9dfe-4be1-b37d-2f643d85cd66/20210925-iphone-13-pro-03.jpg?auto=webp&width=1200",
    },
    {
      id: "1",
      name: "Ranger 1",
      desc: "Excellent performance",
      price: "90000",
      prodStatus: "REJECTED",
      orderCount: "0",
      currentUnit: "20",
      bannerImage:
        "https://www.cnet.com/a/img/resize/eb766a8cf69ce087b8afc5d82be7cf7ef440bdef/hub/2021/10/01/0dc5aad3-9dfe-4be1-b37d-2f643d85cd66/20210925-iphone-13-pro-03.jpg?auto=webp&width=1200",
    },
  ];
  const [products, setProducts] = useState([]);
  const [vendorDoc, setVendorDoc] = useState(null);

  const { auth } = useAuth();
  const navigate = useNavigate();

  const fetchTopProduct = async (vendorId) => {
    if (vendorId) {
      try {
        const res = await axios.get("/products/vendor/" + vendorId);
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const fetchVendorData = async (userId) => {
    try {
      const res = await axios.get("/vendor/getVendorByUserId/" + userId);
      console.log(res.data?.userDoc);
      setVendorDoc(res.data?.userDoc);
      fetchTopProduct(res.data?.userDoc?._id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVendorData(auth?._id);
  }, []);

  const ProductCard = ({
    img,
    name,
    desc,
    price,
    prodStatus,
    orderCount,
    currentUnit,
    id,
  }) => {
    return (
      <div className="flex flex-row p-2 w-full bg-white border border-black-300 rounded-lg shadow font-Montserrat ">
        <img src={img} className="object-scale-down h-64 w-64" />
        <div className="p-2 pl-4 flex flex-col justify-around">
          <p className="font-bold text-xl text-black-800">{name}</p>
          <p>{desc}</p>
          <p className="font-bold text-md text-gray-600">
            {formatIndianRupee(price)} /-
          </p>
          {prodStatus === "IN_PROGRESS" ? (
            <p className="font-normal text-lg text-teal-500">
              In the middle of ensuring quality, verification is underway. Stay
              tuned!
            </p>
          ) : prodStatus === "VERIFIED" ? (
            <p className="font-normal text-lg text-green-500">
              Congratulations! Your product has successfully completed the
              verification process and is now live for the world to see
            </p>
          ) : prodStatus === "REJECTED" ? (
            <p className="font-normal text-lg text-red-500">
              Product has been rejected
            </p>
          ) : (
            ``
          )}
          <p className="font-bold text-md text-black-800">
            Total orders :
            <span className="text-green-800 text-lg">{orderCount}</span>
          </p>
          <p className="font-bold text-md text-black-800">
            Units :
            <span className="text-green-800 text-lg">{currentUnit}</span>
          </p>
          <button
            onClick={() => navigate(`/admin/rangers/${id}`)}
            className="text-end font-light text-blue-700 flex flex-row justify-end"
          >
            
            <p className="mr-3">View More </p>
            <ArrowLongRightIcon height={20} width={20} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="grid grid-cols-2 p-3 w-screen md:w-full bg-gray-300 gap-4 max-md:grid-cols-1 place-items-center">
      {productList?.map((prod, index) => {
        return (
          <ProductCard
            key={index}
            id={prod?.id}
            img={prod?.bannerImage}
            name={prod?.name}
            desc={prod?.desc}
            price={prod?.price}
            prodStatus={prod?.prodStatus}
            orderCount={prod?.orderCount}
            currentUnit={prod?.currentUnit}
          />
        );
      })}
    </section>
  );
};

export default AdminRanger;
