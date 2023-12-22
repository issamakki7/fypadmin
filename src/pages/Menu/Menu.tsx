import { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { StoreItem } from "../../components/StoreItem/StoreItem";
import "./Menu.css";
import axios from 'axios';

export function Menu() {
  const [storeItems, setStoreItems] = useState();
  
  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("currentUser")}`;
    axios.get(`https://localhost:7290/api/Menu`,{
      headers: {
        "Authorization": token,
      },
    }).then((response) => {
    setStoreItems(response.data);
  });
}, [storeItems]);


// Function to handle editing a StoreItem
const handleEditStoreItem = (id, updatedItemData) => {
  const token = `Bearer ${localStorage.getItem("currentUser")}`;

  const { name, price } = updatedItemData;

  const requestBody = {
    plateId: id,
    plateName: name,
    platePrice: price,
  };

  console.log(requestBody)

  axios
    .put(`https://localhost:7290/api/Menu/${id}`,requestBody,{
      headers: {
        "Authorization": token,
      },
    })
    .then((response) => {
      const updatedItems = storeItems?.map((item) =>
        item.id === id ? { ...item, ...response.data } : item
      );
      setStoreItems(updatedItems);
    })
    .catch((error) => {
      // Handle error
      console.error("Error editing store item:", error);
    });
};


// Function to handle deleting a StoreItem
const handleDeleteStoreItem = (id) => {
  const token = `Bearer ${localStorage.getItem("currentUser")}`;
  // const updatedItems = storeItems?.filter((item) => item.id !== id);
  // setStoreItems(updatedItems);
  axios.delete(`https://localhost:7290/api/Menu/${parseInt(id)}`,{
    headers: {
      "Authorization": token,
    },
  }).then((response) => {
    console.log(response.data)
  });

};


return (
  <Container>
  <Typography
  style={{
    marginTop: "7rem",
    textAlign: "center",
  }}
  className="menu-main"
  variant="h1"
  component="h1"
  >
  Menu
  </Typography>
  
  
  {storeItems?.map((categoryData) => (
    <div key={categoryData.category}>
    <Container className="category">
    <Typography className="menu-title" variant="h2" component="h2">
    {categoryData.category}
    </Typography>
    <hr className={`line-${categoryData.category.toLowerCase()}`}></hr>
    <Grid container spacing={3}>
    {categoryData.plates.map((item) => (
      <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
      <StoreItem {...item} 
      onEdit={(updatedItemData) =>
        handleEditStoreItem(item.id, updatedItemData)
      }
      onDelete={() => handleDeleteStoreItem(item.id)}
      
      />
      </Grid>
      ))}
      </Grid>
      </Container>
      </div>
      ))}
      
     
      </Container>
      );
    }
    