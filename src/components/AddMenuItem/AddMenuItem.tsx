import React, { useState } from "react";
import axios from "axios";
import "./AddMenuItem.css";

interface FormData {
  plateName: string;
  platePrice: string; // Change to string
  categoryId: number;
}

interface PostData {
  plateName: string;
  userId: number;
  platePrice: string; // Change to string
  plateImage: string | null;
  categoryId: number;
}

function AddMenuItem(): JSX.Element {
  const [plateImage, setPlateImage] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    plateName: "",
    platePrice: "0", // Initialize as a string
    categoryId: 1, // Initialize with a default value
  });

  const [postData, setPostData] = useState<PostData>({
    plateName: "",
    userId: 1, // You may need to adjust this based on your user data
    platePrice: "0", // Initialize as a string
    plateImage: null,
    categoryId: 1, // Initialize with a default value
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Data = reader.result as string;
        setPlateImage(base64Data);
        setPostData((prevData) => ({
          ...prevData,
          plateImage: base64Data,
        }));
      };
    }
  };

  const onChangePostDataHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    // Handle categoryId separately
    if (name === "categoryId") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value),
      }));
      setPostData((prevData) => ({
        ...prevData,
        [name]: parseInt(value),
      }));
    } else {
      setPostData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    const token = `Bearer ${localStorage.getItem("currentUser")}`;

    event.preventDefault();

    // Parse the price to float before submitting
    const submitData = {
      ...postData,
      platePrice: parseFloat(postData.platePrice),
    };
    console.log(postData);

    axios
      .post(`https://localhost:7290/api/Menu`, submitData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data);
        alert("Successfully Submitted Menu Item");
      })
      .catch((error) => {
        console.log(submitData);
        console.log(error);
        alert(error.response.data.message);
      });
  };

  return (
    <div className="sell-house-main">
      <h1 className="sell-house-title">Add Menu Item</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="sellform-group">
          <label htmlFor="plateImage" className="sellform-label">
            Input Menu Item Image
          </label>
          <p></p>
          <input name="plateImage" type="file" onChange={handleImageUpload} />
          {plateImage && (
            <img
            style={{width :"30%"}}
              id="plateImage"
              src={plateImage}
              alt="user uploaded"
            />
          )}
        </div>

        <div className="sellform-group">
          <label htmlFor="plateName" className="sellform-label">
            Item Name
          </label>
          <input
            className="sellform-control"
            name="plateName"
            onChange={onChangePostDataHandler}
            value={postData.plateName}
          />
        </div>

        <div className="sellform-group">
          <label htmlFor="platePrice" className="sellform-label">
            Item Price
          </label>
          <input
            className="sellform-control"
            name="platePrice"
            onChange={onChangePostDataHandler}
            value={postData.platePrice}
          />
        </div>

        <div className="sellform-group">
          <label htmlFor="categoryId" className="sellform-label">
            Category
          </label>
          <select
            className="sellform-control"
            name="categoryId"
            onChange={onChangePostDataHandler}
            value={postData.categoryId}
          >
            <option value={1}>Appetizers</option>
            <option value={2}>Burger</option>
            <option value={3}>Salads</option>
            <option value={4}>Soups</option>
            <option value={5}>Desserts</option>
            <option value={6}>Drinks</option>
          </select>
        </div>

        <div className="sellform-group">
          <button className="sell-btn" type="submit">
            Submit
          </button>
          <p></p>
        </div>
      </form>
    </div>
  );
}

export default AddMenuItem;
