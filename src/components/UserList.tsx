import {
    Button,
    Card,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetails } from "../types/types";
import { deleteUser, getUser } from "../services/UserServices";

function UserList() {
    const navigate = useNavigate();

    const [userList, setUserList] = useState<userDetails[]>([])

    const getUserList = () => {
        getUser().then((res: any) => {
            setUserList(res.data);
        }).catch((error) => {
            alert(error)
        })
    }

    const deleteHandler = (id: any) => {
        deleteUser(id).then((res) => {
            if (window.confirm("Do you really want to delete?")) {
                alert("User deleted successfully!")
            }
            getUserList()
        }).catch((error) => {
            alert(error)
        })
    }

    useEffect(() => {
        getUserList()
    }, [])

    return (
        <Container sx={{ mt: 4 }} maxWidth="lg">
            <Card variant="outlined" sx={{ p: 4 }}>
                <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
                    Users List
                </Typography>
                <div className="text-end mb-5">
                    <Button onClick={() => navigate("/add")} type="button" variant="contained">
                        Add User
                    </Button>
                </div>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Mobile No.</TableCell>
                                <TableCell>Date of Birth </TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userList.map((user) => (
                                <TableRow hover key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.mobileNumber}</TableCell>
                                    <TableCell>{user.dob}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => navigate(`/userInfo/${user.id}`)}>
                                            <Tooltip title="View" placement="top">
                                                <VisibilityIcon color="info" />
                                            </Tooltip>
                                        </Button>
                                        <Button onClick={() => navigate(`/edit/${user.id}`)} sx={{ ml: 1 }}>
                                            <Tooltip title="Edit" placement="top">
                                                <EditIcon color="primary" />
                                            </Tooltip>
                                        </Button>
                                        <Button onClick={() => deleteHandler(user.id)} sx={{ ml: 1 }}>
                                            <Tooltip title="Delete" placement="top">
                                                <DeleteIcon color="error" />
                                            </Tooltip>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </Container>
    )
}

export default UserList