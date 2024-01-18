import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosInstance/axiosApi";
import { TrashIcon } from "@heroicons/react/24/outline";
// import AWS from "aws-sdk";

const AdminRangerDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [productDoc, setProductDoc] = useState(null);

  const [productName, setProductName] = useState("");
  const [productCurrentUnit, setProductCurrentUnit] = useState(0);
  const [productHeight, setProductHeight] = useState(0);
  const [productWidth, setProductWidth] = useState(0);
  const [productWeight, setProductWeight] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProdDesc] = useState("");
  const [featureList, setFeatureList] = useState([]);
  const [editedFeatures, setEditedFeatures] = useState(
    Array(featureList.length).fill(false)
  );
  const [prodImages, setProdImages] = useState([]);
  const [feature, setFeature] = useState("");
    const [verified,setVerified] = useState("")
  //File related
  const [files, setFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(null);

  const rangerDetails = [
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

  const handleFileChangeV2 = (e) => {
    // Uploaded file
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  // const awsSecretKey = process.env.REACT_APP_AWS_SECRET_KEY;
  // const awsAccessKey = process.env.REACT_APP_AWS_ACCESS_KEY;

  //  const uploadFile = async (e) => {
  //     e.preventDefault();
  //      // S3 Bucket Name
  //      const S3_BUCKET = "awsbucket99999";

  //      // S3 Region
  //      const REGION = 'ap-south-1';

  //      // S3 Credentials
  //      AWS.config.update({
  //        accessKeyId: awsAccessKey,
  //        secretAccessKey: awsSecretKey,
  //      });
  //      const s3 = new AWS.S3({
  //        params: { Bucket: S3_BUCKET },
  //        region: REGION,
  //      });

  //      // Files Parameters

  //      const params = {
  //        Bucket: S3_BUCKET,
  //        // Key: "unionpigmyimages/" + file.name,
  //        Key: `aftab/` + file.name,
  //        // Key: "unionpigmyimages/" + file.name,
  //        Body: file,
  //      };

  //      // Uploading file to s3

  //      var upload = s3
  //        .putObject(params)
  //        .on("httpUploadProgress", (evt) => {
  //          // File uploading progress
  //          console.log(
  //            "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
  //          );
  //          setUploadPercent("Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%")
  //        })
  //        .promise();

  //      await upload.then((err, data) => {
  //        console.log(err);
  //        // const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/unionpigmyimages/${file.name}`;
  //        const fileURL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/aftab/${file.name}`;
  //        // Fille successfully uploaded
  //        console.log(fileURL)
  //        setFileUrl(fileURL)
  //        alert("File uploaded successfully.");

  //      });
  //    };

  //  const uploadFiles = async (e) => {
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

  const fetchProduct = async (productId) => {
    try {
      const res = await axios.get("/products/" + productId);
      console.log(res.data);
      setProductDoc(res.data?.product);
    } catch (error) {
      console.error(error);
    }
  };

  const addFeature = (feature) => {
    if (feature.trim() !== "") {
      setFeatureList((prevFeatures) => [...prevFeatures, feature]);
      setEditedFeatures((prevEdited) => [...prevEdited, false]);
    }
  };

  const removeFeature = (index) => {
    setFeatureList((prevFeatures) => {
      const updatedFeatures = [...prevFeatures];
      updatedFeatures.splice(index, 1);
      return updatedFeatures;
    });

    setEditedFeatures((prevEdited) => {
      const updatedEdited = [...prevEdited];
      updatedEdited.splice(index, 1);
      return updatedEdited;
    });
  };

  const handleEditClick = (index) => {
    setEditedFeatures((prevEdited) => {
      const updatedEdited = [...prevEdited];
      updatedEdited[index] = !updatedEdited[index];
      return updatedEdited;
    });
  };

  const handleFeatureChange = (index, value) => {
    setFeatureList((prevFeatures) => {
      const updatedFeatures = [...prevFeatures];
      updatedFeatures[index] = value;
      return updatedFeatures;
    });
  };

  useEffect(() => {
    if (productDoc) {
      setProductName(productDoc?.name);
      setProductCurrentUnit(productDoc?.currentUnit);
      setProductHeight(productDoc?.height);
      setProductWidth(productDoc?.width);
      setProductWeight(productDoc?.weight);
      setProductPrice(productDoc?.price);
      setProdDesc(productDoc?.desc);
      setFeatureList(productDoc?.featureList);
      setProdImages(productDoc?.prodImages);
      setFileUrl(productDoc?.bannerImage);
      setFileUrls(productDoc?.prodImages);
    }
  }, [productDoc]);

  useEffect(() => {
    fetchProduct(id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = {
      prodId: productDoc?._id,
      name: productName,
      units: productCurrentUnit,
      height: productHeight,
      width: productWidth,
      weight: productWeight,
      price: productPrice,
      desc: productDescription,
      featureList,
      bannerImage: fileUrl,
      prodImages: fileUrls,
    };

    console.log(reqBody);

    try {
      const res = await axios.post("/products/editProduct", reqBody);
      console.log(res.data);
      navigate("/vendor/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full md:w-full bg-gray-300 ">
      <div className="bg-white p-5 rounded-lg m-5">
        <p className="font-bold text-3xl mb-4 ">Ranger Details</p>
        <div className="flex flex-row">
          <div className="basis-1/4 flex flex-col justify-start">
            <img
              className="h-64 w-64 mix-blend-multiply object-scale-down"
              src={fileUrl}
            />
            <input className="my-3" type="file" onChange={handleFileChangeV2} />
            <button
              className="bg-blue-600 font-normal p-2 hover:bg-blue-500 text-md rounded-lg w-2/3 text-white"
              type="button"
              //  onClick={uploadFile}
            >
              Change Banner Image
            </button>
          </div>

          <form
            className="basis-3/4 flex flex-col justify-center gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <label className="text-lg font-medium mb-2">Name</label>
            <input
              type="name"
              placeholder="Product name"
              className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-lg font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                  value={productHeight}
                  onChange={(e) => {
                    setProductHeight(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="text-lg font-medium mb-2">
                  Adhaar Number
                </label>
                <input
                  type="number"
                  placeholder="Adhaar Number"
                  className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                  value={productWidth}
                  onChange={(e) => {
                    setProductWidth(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="text-lg font-medium mb-2">Pincode</label>
                <input
                  type="number"
                  placeholder="Pincode"
                  className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                  value={productWeight}
                  onChange={(e) => {
                    setProductWeight(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-lg font-medium mb-2">Price</label>
                <input
                  type="number"
                  placeholder="Price"
                  className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                  value={productHeight}
                  onChange={(e) => {
                    setProductHeight(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="text-lg font-medium mb-2">
                  Starting Time
                </label>
                <input
                  type="time"
                  placeholder="Starting Hour"
                  className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                  value={productWidth}
                  onChange={(e) => {
                    setProductWidth(e.target.value);
                  }}
                />
              </div>
              <div>
                <label className="text-lg font-medium mb-2">Ending Time</label>
                <input
                  type="time"
                  placeholder="Ending Hour"
                  className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                  value={productWeight}
                  onChange={(e) => {
                    setProductWeight(e.target.value);
                  }}
                />
              </div>
            </div>
            <label className="text-lg font-medium mb-2">Location</label>
            <input
              type="text"
              placeholder="Location"
              className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
              value={productDescription}
              onChange={(e) => {
                setProdDesc(e.target.value);
              }}
            />
            <label className="text-lg font-medium mb-2 my-2">Services</label>
            <div className="flex flex-row justify-between mb-5">
              <input
                className="bg-slate-100 rounded-lg p-3 w-4/5 border border-black-500"
                type="text"
                placeholder="Enter a service"
                value={feature}
                onChange={(e) => setFeature(e.target.value)}
              />
              <button
                className="bg-green-800 hover:bg-green-700 text-white rounded-lg ml-2 w-1/5  font-semibold px-4 py-2"
                type="button"
                onClick={() => addFeature(feature)}
              >
                Add
              </button>
            </div>

            <label className="text-lg font-medium mb-2 my-2" >
              Police verification
            </label>
            <div className="flex flex-row justify-between mb-5" >
              <select
                className="bg-slate-100 rounded-lg p-3 w-4/5 border border-black-500"
                placeholder="Enter a service"
                value={verified}
                onChange={(e) => setVerified(e.target.value)}
              >
                <option selected>Choose an option</option>
                <option value="IN_PROCESS">In Process</option>
                <option value="VERIFIED">Verified</option>
                <option value="REJECTED">Rejected</option>
              </select>

              <button
                className="bg-green-800 hover:bg-green-700 text-white rounded-lg ml-2 w-1/5  font-semibold px-4 py-2"
                type="button"
                onClick={() => addFeature(feature)}
              >
                Add
              </button>
            </div>
            {rangerDetails.map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-between bg-slate-100 text-gray-800 font-medium text-md rounded-lg p-2 mb-4 my-2"
              >
                {editedFeatures[index] ? (
                  <input
                    type="text"
                    value={feature}
                    className="pl-4"
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                ) : (
                  <div>{item.bannerImage}</div>
                )}
                <div>
                  <div className="flex flex-row justify-around">
                    <div
                      className="hover:bg-white hover:font-bold mx-3"
                      onClick={() => handleEditClick(index)}
                    >
                      Edit
                    </div>
                    <div
                      className="hover:bg-white hover:font-bold mx-3"
                      onClick={() => removeFeature(index)}
                    >
                      <TrashIcon height={20} width={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <label className="text-lg font-medium mb-2 my-3">
              Ranger Images
            </label>
            <input type="file" onChange={handleFileChange} multiple />
            <div className="grid grid-cols-3 gap-3 place-items-center">
              {fileUrls?.map((prodImg, index) => {
                return (
                  <img
                    className="h-40 w-40 mix-blend-multiply object-scale-down"
                    src={prodImg}
                    key={index}
                  />
                );
              })}
            </div>
            <button
              className="w-3/5 bg-blue-800 text-white hover:bg-blue-700 rounded-lg p-3"
              type="button"
            >
              Change Product Images (must upload all images at once)
            </button>

            <button
              className="w-1/3 text-center bg-green-800 text-white hover:bg-green-700 rounded-lg p-1 m-5"
              type="submit"
            >
              Edit Product
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white p-5 rounded-lg m-5">
        <p className="font-bold text-3xl ">Ranger Metrics</p>
        <div className="grid grid-cols-2 gap-3 place-items-start">
          <img
            className="h-40 mix-blend-multiply"
            src={productDoc?.bannerImage}
          />
          <div className="flex flex-col justify-between">
            <p className="font-medium text-2xl">
              Order Count :{" "}
              <span className="font-bold text-green-500">
                {productDoc?.orderCount}
              </span>
            </p>
            <p className="font-medium text-2xl">
              Product Status:{" "}
              <span className="font-bold ">{productDoc?.prodStatus}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminRangerDetails;
