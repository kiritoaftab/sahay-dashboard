import React, { useEffect } from "react";
// import AWS from "aws-sdk";
import { useState } from "react";
import { BASE_URL, categoryMap } from "../../constants";
import axios from "../../axiosInstance/axiosApi";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { TrashIcon } from "@heroicons/react/24/outline";

const AdminAddRanger = () => {
  // const awsSecretKey = process.env.REACT_APP_AWS_SECRET_KEY;
  // const awsAccessKey = process.env.REACT_APP_AWS_ACCESS_KEY;

  const { auth } = useAuth();

  const { userId } = useParams();
  // console.log('Adding product for vendor '+userId);
  const navigate = useNavigate();

  const [vendorDoc, setVendorDoc] = useState(null);

  const [allowedCategoryList, setAllowedCategoryList] = useState([
    "Select Category",
  ]);
  const [allowedSubCatList, setAllowedSubCatList] = useState([
    "Select SubCategory",
  ]);

  const styles = {
    container: `px-36 grid grid-cols-1 place-content-center rounded-2xl shadow-2xl font-Montserrat`,
    heading: `font-bold text-2xl mt-5 mb-14`,
    heading1: `font-bold text-3xl mt-5  font-Montserrat`,
    dropDownWrapper: `grid grid-cols-3 gap-4`,
    label: `peer-focus:font-medium  text-md text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-black peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 font-Montserrat`,
    select: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`,
  };

  // const handleFileChange = (event) => {
  //     const selectedFiles = event.target.files;
  //     // Handle the selected files
  //     console.log(selectedFiles);
  // };

  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(null);

  const [productName, setProductName] = useState(null);
  const [gst, setGst] = useState(null);
  const [price, setPrice] = useState(null);
  const [ytLink, setYtLink] = useState(null);
  const [desc, setDesc] = useState(null);

  const [units, setUnits] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [weight, setWeight] = useState(null);

  const [categorySelected, setCategorySelected] = useState("All");
  const [subCategorySelected, setSubCategorySelected] = useState(null);
  const [subCategoryList, setSubCategoryList] = useState(null);
  const [showSub, setShowSub] = useState(false);

  const [feature, setFeature] = useState(null);
  const [featureList, setFeatureList] = useState([]);

  // Function to upload files to S3
  // const uploadFiles = async (e) => {
  //   e.preventDefault();
  //   const S3_BUCKET = "awsbucket99999";
  //   const REGION = "ap-south-1";

  //   AWS.config.update({
  //     accessKeyId: awsAccessKey,
  //     secretAccessKey: awsSecretKey,
  //   });

  //   const s3 = new AWS.S3({
  //     params: { Bucket: S3_BUCKET },
  //     region: REGION,
  //   });

  //   const uploadPromises = files.map((file) => {
  //     const params = {
  //       Bucket: S3_BUCKET,
  //       Key: `aftab/images/${file.name}`,
  //       Body: file,
  //     };

  //     return s3
  //       .putObject(params)
  //       .on("httpUploadProgress", (evt) => {
  //         // File uploading progress
  //         console.log(
  //           "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
  //         );
  //         setUploadPercent(
  //           "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
  //         );
  //       })
  //       .promise();
  //   });

  //   try {
  //     await Promise.all(uploadPromises);
  //     const newFileUrls = files.map(
  //       (file) =>
  //         `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/aftab/images/${file.name}`
  //     );
  //     setFileUrls(newFileUrls);
  //     alert("Files uploaded successfully.");
  //   } catch (error) {
  //     console.error("Error uploading files:", error);
  //   }
  // };

  // Function to upload file to s3
  // const uploadFile = async (e) => {
  //    e.preventDefault();
  //     // S3 Bucket Name
  //     const S3_BUCKET = "awsbucket99999";

  //     // S3 Region
  //     const REGION = 'ap-south-1';

  //     // S3 Credentials
  //     AWS.config.update({
  //       accessKeyId: awsAccessKey,
  //       secretAccessKey: awsSecretKey,
  //     });
  //     const s3 = new AWS.S3({
  //       params: { Bucket: S3_BUCKET },
  //       region: REGION,
  //     });

  //     // Files Parameters

  //     const params = {
  //       Bucket: S3_BUCKET,
  //       // Key: "unionpigmyimages/" + file.name,
  //       Key: `aftab/` + file.name,
  //       // Key: "unionpigmyimages/" + file.name,
  //       Body: file,
  //     };

  //     // Uploading file to s3

  //     var upload = s3
  //       .putObject(params)
  //       .on("httpUploadProgress", (evt) => {
  //         // File uploading progress
  //         console.log(
  //           "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
  //         );
  //         setUploadPercent("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%")
  //       })
  //       .promise();

  //     await upload.then((err, data) => {
  //       console.log(err);
  //       // const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/unionpigmyimages/${file.name}`;
  //       const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/aftab/${file.name}`;
  //       // Fille successfully uploaded
  //       console.log(fileURL)
  //       setFileUrl(fileURL)
  //       alert("File uploaded successfully.");
  //     });
  //   };

  // Function to handle file selection and store them in the state
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleFileChangeV2 = (e) => {
    // Uploaded file
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  };

  const addProductApiCall = async (reqBody) => {
    try {
      const res = await axios.post(`${BASE_URL}products/addProduct`, reqBody);
      console.log(res.data);
      const apiResponse = res.data;
      console.log(apiResponse);
      navigate(`/vendor/products`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Adding Product`);
    const reqBody = {
      name: productName,
      desc: desc,
      price: price,
      category: categorySelected,
      subCategory: subCategorySelected,
      vendor_id: vendorDoc?._id,
      bannerImage: fileUrl,
      prodImages: fileUrls,
      unit: units,
      height: height,
      width: width,
      weight: weight,
      featureList: featureList,
    };
    console.log(reqBody);
    addProductApiCall(reqBody);
  };

  const handleSubSelect = (e) => {
    // setShowGrid(false);
    setSubCategorySelected(e.target.value);
  };

  const handleSelect = (e) => {
    // setShowGrid(false);
    console.log("Category Selected");
    setCategorySelected(e.target.value);
    setShowSub(true);
  };

  const fetchVendorData = async (vendorId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}vendor/getVendorByUserId/${vendorId}`
      );
      console.log(res.data.userDoc);
      setVendorDoc(res.data.userDoc);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorData(auth?._id);
  }, []);

  const addFeature = () => {
    if (feature.trim() !== "") {
      setFeatureList((prevFeatures) => [...prevFeatures, feature]);
      setFeature(""); // Clear the input after adding a feature
    }
  };

  const removeFeature = (index) => {
    setFeatureList((prevFeatures) => {
      const updatedFeatures = [...prevFeatures];
      updatedFeatures.splice(index, 1);
      return updatedFeatures;
    });
  };

  const populateCategoryMap = (vendorDoc) => {
    if (vendorDoc) {
      const categorySubSelectedList = vendorDoc?.categorySubSelectedList;
             
      categorySubSelectedList?.forEach((category) => {
        // Split the string using "--" as the delimiter
        const splitStrings = category.split("--");

        // Trim whitespaces from both category and subcategory
        const allowedCategory = splitStrings[0].trim();
        const allowedSubCategory = splitStrings[1].trim();
        console.log(`${allowedCategory} jj ${allowedSubCategory}`);

        setAllowedCategoryList((prevList) => {
          if (!prevList.includes(allowedCategory)) {
            return [...prevList, allowedCategory];
          }
          return prevList;
        });

        setAllowedSubCatList((prevList) => {
          if (!prevList.includes(allowedSubCategory)) {
            return [...prevList, allowedSubCategory];
          }
          return prevList;
        });
      });
    }
  };

  useEffect(() => {
    populateCategoryMap(vendorDoc);
  }, [vendorDoc]);

  return (
    <div className="bg-white">
      <h1 className={styles.heading1}>Add product</h1>
      <form className={styles.container} onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <label>Product Name</label>
            <input
              type="text"
              id="floating_product_name"
              name="floating_product_name"
              className="block w-full py-2.5 px-2  text-gray-900 border border-orange-300 rounded-2xl bg-gray-50 sm:text-md  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
              placeholder="Product Name"
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label>GST %</label>
            <input
              type="number"
              id="number"
              name="number"
              className="block w-full py-2.5 px-2  text-gray-900 border border-orange-300 rounded-2xl bg-gray-50 sm:text-md  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="GST %"
              onChange={(e) => setGst(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <label>Distribution Price (without GST)</label>
            <input
              type="price"
              id="price"
              name="price"
              className="block w-full py-2.5 px-2  text-gray-900 border border-orange-300 rounded-2xl bg-gray-50 sm:text-md  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Distribution price"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Description
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-orange-300 "
            placeholder="Product Description. Kindly provide detailed information, as it will be showcased on the main website."
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="grid md:grid-cols-4">
          <div className="relative z-0 w-4/5 mb-6 group">
            <label>Units</label>
            <input
              type="text"
              id="floating_product_name"
              name="floating_product_name"
              className="block w-full py-2.5 px-2  text-gray-900 border border-orange-300 rounded-2xl bg-gray-50 sm:text-md  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
              placeholder="Units"
              onChange={(e) => setUnits(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-4/5 mb-6 group">
            <label>Height (in cms) </label>
            <input
              type="number"
              id="number"
              name="number"
              className="block w-full py-2.5 px-2  text-gray-900 border border-orange-300 rounded-2xl bg-gray-50 sm:text-md  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Height (in cms)"
              onChange={(e) => setHeight(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-4/5 mb-6 group">
            <label>Width (in cms)</label>
            <input
              type="number"
              id="floating_product_name"
              name="floating_product_name"
              className="block w-full py-2.5 px-2  text-gray-900 border border-orange-300 rounded-2xl bg-gray-50 sm:text-md  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
              placeholder="Width (in gms)"
              onChange={(e) => setWidth(e.target.value)}
              required
            />
          </div>
          <div className="relative z-0 w-4/5 mb-6 group">
            <label>Weight (in gms)</label>
            <input
              type="number"
              id="number"
              name="number"
              className="block w-full py-2.5 px-2  text-gray-900 border border-orange-300 rounded-2xl bg-gray-50 sm:text-md  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Weight (in gms)"
              onChange={(e) => setWeight(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <p>Features</p>
          <div className="flex flex-row justify-between mb-5">
            <input
              className="block p-2.5 w-4/5 text-sm text-gray-900 bg-gray-50 rounded-2xl border border-orange-300"
              type="text"
              placeholder="Enter a feature"
              value={feature}
              onChange={(e) => setFeature(e.target.value)}
            />
            <button
              className="bg-green-800 hover:bg-green-700 text-white rounded-lg  font-semibold px-4 py-2"
              onClick={addFeature}
            >
              Add
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-evenly">
          {featureList.map((feature, index) => {
            return (
              <div
                key={index}
                className="flex flex-row justify-between bg-slate-100 text-gray-800 font-medium text-md rounded-lg p-2 mb-4"
              >
                <div>{feature}</div>
                <div
                  className="hover:bg-white hover:font-bold"
                  onClick={() => removeFeature(index)}
                >
                  <TrashIcon height={20} width={20} />
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.dropDownWrapper}>
          <div>
            <label htmlFor="category" className={styles.label}>
              Select Category
            </label>
            <select
              id="category"
              className={styles.select}
              onChange={handleSelect}
            >
              {allowedCategoryList?.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
          </div>

          {showSub ? (
            <div>
              <label htmlFor="subCategory" className={styles.label}>
                Select Sub Category
              </label>
              <select
                id="subCategory"
                className={styles.select}
                onChange={handleSubSelect}
              >
                return(
                <option>Select Sub Category</option>)
                {allowedSubCatList?.map((category, index) => {
                  if (categoryMap[categorySelected]?.includes(category)) {
                    return (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
          ) : (
            ``
          )}
        </div>

        <div>
          <label
            htmlFor="message"
            className="block mt-5 text-sm font-medium text-gray-900 dark:text-white"
          >
            Upload Product Banner Image
          </label>
        </div>

        <div>
          <input type="file" onChange={handleFileChangeV2} required />
          <button
            className="h-10 w-24  py-2.5 px-3  mt-7 text-sm font-medium text-white bg-blue-800 rounded-lg border border-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            // onClick={uploadFile}
          >
            Upload
          </button>
        </div>

        {fileUrl ? (
          <div>
            {" "}
            <p className={styles.badgeGreen}>Banner Image Uploaded</p>{" "}
            <img src={fileUrl} />{" "}
          </div>
        ) : (
          ``
        )}

        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Upload Product Images
        </label>
        <div className="block w-full text-lg text-gray-900 border border-orange-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400">
          <div className="flex justify-between items-center">
            <input type="file" onChange={handleFileChange} multiple required />
            <button
              className="text-white bg-blue-800 hover:bg-blue-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-7  py-3  dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              // onClick={uploadFiles}
            >
              Upload
            </button>
          </div>
          {/* {uploadPercent ? <p>{uploadPercent}</p> : ""} */}
          <div className="flex">
            {fileUrls.map((url, index) => (
              <img
                className="w-50 h-28"
                key={index}
                src={url}
                alt={`Uploaded file ${index}`}
              />
            ))}
          </div>
        </div>

        {/* <button type="button" className="text-white mt-8 w-50 bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Product</button> */}
        <button
          type="submit"
          className="text-white mt-8 mx-auto w-1/6 bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2  focus:outline-none "
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AdminAddRanger;
