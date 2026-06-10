import { useEffect, useState } from "react";
import axios from "axios";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Checkbox,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);



  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // const handleDelete = async (id: number) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/users/${id}`);
  //     setUsers((prev) => prev.filter((user) => user.id !== id));
  //     setSelected((prev) => prev.filter((item) => item !== id));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className="p-3 text-3xl font-bold text-yellow-500 ">
        Users List

        <div className="mt-3 rounded-3xl">
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                <TableCell>Select</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  {/* Checkbox */}
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(user.id)}
                      onChange={() => handleSelect(user.id)}
                    />
                  </TableCell>

                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>

                  {/* Delete Button */}
                  <TableCell>
                    <IconButton
                      color="error"
                      // onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      </div>
    </div>
  );
}