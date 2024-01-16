import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { sales , orders, box, productsLive, ordersPending, inventory,taxes, bannerMan, vroVector, formatIndianRupee} from '../../constants' 
import useAuth from '../../hooks/useAuth';
import axios from '../../axiosInstance/axiosApi';

const StatCard = ({heading,number,icon}) => {
    return(
        <section className="flex flex-col p-8 w-44 max-w-xs p-2 bg-white border border-indigo-300 rounded-lg shadow font-Montserrat ">
            
        <img src={icon} className='h-12 w-12' />
        <h5 className="p-0.5 mt-2 ml  text-lg  font-semibold tracking-tight text-gray-900 dark:text-white font-Montserrat">{heading}</h5>
   
          <p className="text-lg text-justify  text-violet-800  font-bold font-Montserrat">{number}</p>
        </section>
    )
}

const AdminHome = () => {

    const {auth} = useAuth();
    console.log(auth);

    const salePercent = "+20%";

    const [vendorDoc,setVendorDoc] = useState(null);
    const [vroDoc,setVroDoc] = useState(null);
    const [topProducts,setTopProducts] = useState(null);
    const [topProd,setTopProd] = useState(null);
    const [inventoryHealth,setInventoryHealth] = useState(0);

    useEffect(()=> {
        if(Array.isArray(topProducts) && topProducts.length>0){
            setTopProd(topProducts[0]);
            let a=0;
            let b=0;
            topProducts.forEach((prod, index) => {
                a += prod?.currentUnit || 0;
                b += prod?.addedUnit || 0;
            });
            setInventoryHealth((a/b)*100);  // total Current Unit / total added Unit of top 3 products 
        }
    },[topProducts])

    const fetchTopProduct = async(vendorId) => {
        if(vendorId){
            try {
                const res = await axios.get("/products/vendor/fetchTopProduct/"+vendorId)
                console.log(res.data);
                setTopProducts(res.data);
            } catch (error) {
                console.error(error)
            }
        }
    }

    const fetchVroData = async(vroId) => {
        if(vroId){
            try {
                const res =await axios.get("/vro/vro/"+vroId)
                console.log(res.data);
                setVroDoc(res.data?.vroDoc);
            } catch (error) {
                console.error(error)
            }
        }
    }

    const fetchVendorData = async(userId) => {
        try {
            const res = await axios.get("/vendor/getVendorByUserId/"+userId);
            fetchVroData(res.data?.userDoc?.vro_id);
            fetchTopProduct(res.data?.userDoc?._id);
            console.log(res.data?.userDoc);
            setVendorDoc(res.data?.userDoc);
            
        } catch (error) {
            console.error(error)
        }
        
    }

    useEffect(()=> {
        fetchVendorData(auth?._id);
    },[])
    //NEED TO ADD style : w-screen md:w-full, for all components in home to render properly
  return (
    <section
        className='grid grid-cols-3 p-3 w-screen md:w-full bg-gray-300 gap-6 max-md:grid-cols-2 place-items-center'
    >
            <div  className="flex flex-row col-span-2 p-3  max-md:col-span-2 items-center w-full bg-white border border-gray-200 rounded-lg shadow">
                <img className="h-40" src={bannerMan} alt=""/>
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Welcome, {vendorDoc?.shopName}</h5>
                    <p className="mb-3 font-normal text-gray-700  text-balance ">
                        Bravo! Your commitment and skill have driven a significant <br></br> <span className='text-green-800 font-semibold text-lg'>{salePercent}</span> surge in sales today.
                    </p>
                </div>
            </div>
        
        {/* sale */}
        <div className='flex flex-row justify-around w-full max-md:col-span-2'>
        <StatCard 
            heading="Sales"
            number={`${formatIndianRupee(vendorDoc?.sales)}`}
            icon={sales}
        />
        <StatCard 
            heading="Orders"
            number={vendorDoc?.orderCount}
            icon={orders}
        />
        </div>
        
        <div 
            className='flex flex-row  col-span-2 p-4  max-md:col-span-2 items-center w-full bg-white border border-gray-200 rounded-lg shadow'
        >
             <img className="h-40" src={topProd?.bannerImage} alt=""/>
             <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Your most desired Product</h5>
                    <p className='text-lg font-semibold text-black-800 '>{topProd?.name}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-balance ">
                        Celebrate the success! With <span className='text-green-500 font-semibold text-lg'>{topProd?.orderCount}</span> units sold, this product has generated a revenue
                         of <span className='text-green-600 font-semibold text-lg'>{formatIndianRupee(topProd?.price * topProd?.orderCount)}</span> .
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-balance ">
                        You currently have <span className='text-green-500 font-semibold text-lg'>{topProd?.currentUnit}</span> units of this in your inventory.
                    </p>
                </div>

        </div>

        <div className='flex flex-row justify-around w-full max-md:col-span-2'>
            <StatCard 
                heading="Total Products"
                number={vendorDoc?.productsUploaded}
                icon={box}
            />
            <StatCard 
                heading="Products Live"
                number={vendorDoc?.productsLive}
                icon={productsLive}
            />
        </div>

        <div
            className='flex flex-row col-span-2 p-4  max-md:col-span-2 items-center w-full bg-white border border-gray-200 rounded-lg shadow'
        >
            <img className="h-40" src={vroVector} alt=""/>
            <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Vendor Relationship Officer</h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-balance ">
                        You're in good hands! <span className='text-black-500 font-semibold'>{vroDoc?.username}</span>  is your dedicated VRO available to assist you. 
                        Reach out effortlessly by sending an email 
                        to  <span className='text-black-500 font-semibold'>
                            <a href="mailto:shoeb@gmail.com?subject=Vendor%20Resolution&body=Hello%20Shoeb,">{vroDoc?.email}</a>
                        </span>.
                    </p>
                </div>
        </div>
    
        
        <div className='flex flex-row justify-around w-full max-md:col-span-2'>
            <StatCard 
                heading="Orders Pending"
                number={vendorDoc?.ordersPending?.length}
                icon={ordersPending}
            />
            <StatCard 
                heading="Inventory Health"
                number={`${inventoryHealth} %`}
                icon={inventory}
            />
        </div>

        


        <div className='flex flex-row justify-around w-full'>
            <StatCard 
                heading="GST verified"
                number={vendorDoc?.gst}
                icon={taxes}
            />
        </div>
        
    </section>
  )
}

export default AdminHome