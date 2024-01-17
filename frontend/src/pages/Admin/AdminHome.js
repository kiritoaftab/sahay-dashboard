import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { sales , orders, box, productsLive, ordersPending, inventory,taxes, bannerMan, vroVector, formatIndianRupee} from '../../constants' 
import useAuth from '../../hooks/useAuth';
import axios from '../../axiosInstance/axiosApi';
import {ArrowTrendingUpIcon} from '@heroicons/react/24/outline'

const StatCard = ({heading,number,icon}) => {
    return(
        <section className="flex flex-col p-8 w-44 max-w-xs p-2 bg-white border border-indigo-300 rounded-lg shadow font-Montserrat ">
            
        <img src={icon} className='h-12 w-12' />
        <h5 className="p-0.5 mt-2 ml  text-lg  font-semibold tracking-tight text-gray-900  font-Montserrat">{heading}</h5>
   
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
        className='grid grid-cols-3 p-3 w-screen md:w-full bg-background gap-6 max-md:grid-cols-2 place-items-center p-10'
    >
            <div  className="flex flex-col col-span-2 p-5  max-md:col-span-2  w-full bg-white rounded-3xl shadow">
                
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Welcome back, Aesha Upadhyay ! {vendorDoc?.shopName}</h5>
                    <p className="mb-3 font-semibold text-gray-500  text-balance ">
                    Your smart work and skills have led to the following stats 
                    </p>
                </div>
                <div className='w-100 flex flex-row justify-around gap-5 '>
                        <div className='flex flex-row border-2 flex flex-col border-background w-3/6 p-5 rounded-3xl gap-5'>
                            <h5 className='font-bold'>Today's Revenue</h5>
                            <h5 className='text-2xl text-primary font-extrabold'>Rs 20,000</h5>
                            <p className='flex flex-row gap-2'><ArrowTrendingUpIcon className='h-5 w-5 text-green-400'/> <span className='text-green-500'> 5%  </span> since yesterday</p>
                        </div>
                        <div className='flex flex-row border-2 flex flex-col border-background w-3/6 p-5 rounded-3xl gap-5'>
                            <h5 className='font-bold'>Today's Orders</h5>
                            <h5 className='text-2xl text-primary font-extrabold'>30</h5>
                            <p className='flex flex-row gap-2'><ArrowTrendingUpIcon className='h-5 w-5 text-green-400'/> <span className='text-green-500'> 2%  </span> since yesterday</p>
                        </div>
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
            className='flex flex-col col-span-2 p-5  max-md:col-span-2  w-full bg-white rounded-3xl shadow'
        >
             <div className="flex flex-col justify-between p-4 leading-normal">
             <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Most Booked Rangers{vendorDoc?.shopName}</h5>
                    <p className="mb-3 font-semibold text-gray-500  text-balance ">
                    Your smart work and skills have led to the following stats 
                    </p>
                </div>
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
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">Vendor Relationship Officer</h5>
                    <p className="mb-3 font-normal text-gray-700  text-balance ">
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