import { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import { formatCurrency } from "../../utils/formatCurrency";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  onEdit: (updatedItemData: Partial<StoreItemProps>) => void;
  onDelete: () => void;
};

export function StoreItem({ id, name, price, image, onEdit, onDelete }: StoreItemProps) {
  // You can use local state to manage the edit form visibility
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [editedPrice, setEditedPrice] = useState(price);

  // Function to handle saving the edited data
  const handleSaveEdit = () => {
    onEdit({ name: editedName, price: editedPrice });
    setIsEditing(false);
  };

  

  return (
    <Card sx={{ height: "100%" }}>
      <CardMedia component="img" height="200" src={image} alt={name} />
      <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <input
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(Number(e.target.value))}
            />
           
          </>
        ) : (
          <>
            <Typography variant="h5" component="div" sx={{ mb: 2 }}>
              {name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {formatCurrency(price)}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions>
        {isEditing ? (
          <IconButton onClick={handleSaveEdit}>
            <SaveIcon />
          </IconButton>
        ) : (
          <>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </Card>
  );
}
