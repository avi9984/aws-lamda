import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
  Button,
} from "@mui/material";
import axios from "axios";

const Component = styled(Box)`
  width: 100%;
  margin: 50px auto;
  & > h4 {
    margin-bottom: 10px;
  }
  & > div > table > thead {
    background-color: #000;
  }
  & > div > table > thead > tr > th {
    color: #fff;
    font-size: 16px;
    font-weight: 600;
  }
  & > div > table > tbody > tr > td {
    font-size: 16px;
  }
`;

// const defaultUserObj = [
//   {
//     id: 1,
//     name: "Avinash Kumar",
//     email: "avinashkumar151199@gmail.com",
//     phone_no: "7652084062",
//     address: "Mumbai",
//   },
// ];
const User = () => {
  const [users, setUsers] = useState([]);
  const API_URL = "https://qrurjweleg.execute-api.us-east-1.amazonaws.com/dev";
  useEffect(()=>{
    const getData=async()=>{
      const response= await axios.get(API_URL);
      setUsers(JSON.parse(response.data.body).Items)
    }
    getData();
  },[])
  const deleteFunction = (id) => {
    const updatedUser = users.filter((user) => user.id !== id);
    setUsers(updatedUser);
  };

  return (
    <Component>
      <Typography variant="h4" align="center">
        Users
      </Typography>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone No.</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone_no}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => deleteFunction(user.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Component>
  );
};

export default User;
