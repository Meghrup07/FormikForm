import {
    Button,
    Card,
    Container,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getSingleUser } from "../services/UserServices";
import { userDetails } from "../types/types";

function EditUser() {

    const { id } = useParams();

    const userValues = {
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        dob: "",
        role: "",
        pic: ""
    }

    const navigate = useNavigate()

    const role = [{ key: "admin", value: "Admin" }, { key: "teacher", value: "Teacher" }, { key: "student", value: "Student" }]

    const [userData, setUserData] = useState<userDetails>(userValues)

    const handleChange = (e: any) => {
        setUserData({ ...userData, [e.targer.name]: e.target.value })
    }

    const handleFormSubmit = (userData: userDetails) => {
        editUser(id, userData).then((res: any) => {
            alert("User updated successfully!");
            navigate("/")
        }).catch((error) => {
            alert(error)
        })
    }

    const getUserDetails = () => {
        getSingleUser(id)
            .then((res: any) => {
                setUserData(res.data);
            })
            .catch((error) => {
                alert(error);
            });
    };

    useEffect(() => {
        getUserDetails();
    }, []);


    return (
        <Container sx={{ mt: 4 }} maxWidth="lg">
            <Card variant="outlined" sx={{ p: 4 }}>
                <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
                    Edit User
                </Typography>

                <Formik enableReinitialize initialValues={{
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    mobileNumber: userData.mobileNumber,
                    dob: userData.dob,
                    role: userData.role,
                    pic: userData.pic,
                }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            setSubmitting(true);
                            handleFormSubmit(values);
                            resetForm();
                            setSubmitting(false);
                        }, 500)
                    }}
                >
                    {({ values, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item md={6} sx={{ mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="First name"
                                        variant="outlined"
                                        name="firstName"
                                        value={values.firstName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item md={6} sx={{ mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Last name"
                                        variant="outlined"
                                        name="lastName"
                                        value={values.lastName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item md={6} sx={{ mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Email"
                                        variant="outlined"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item md={6} sx={{ mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Mobile No."
                                        variant="outlined"
                                        name="mobileNumber"
                                        value={values.mobileNumber}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item md={6} sx={{ mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        id="outlined-basic"
                                        label="DOB"
                                        variant="outlined"
                                        name="dob"
                                        value={values.dob}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item md={6} sx={{ mb: 1 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        id="outlined-basic"
                                        label="Role"
                                        variant="outlined"
                                        name="role"
                                        value={values.role}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    >
                                        {role.map((roles) => (
                                            <MenuItem key={roles.key} value={roles.value}>{roles.value}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item md={6} sx={{ mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Pic"
                                        variant="outlined"
                                        name="pic"
                                        value={values.pic}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled
                                    />
                                </Grid>
                            </Grid>
                            <div className="mt-4 text-center">
                                <Button type="submit" disabled={isSubmitting} variant="contained" color="success">
                                    Update
                                </Button>
                                <Button
                                    onClick={() => navigate("/")}
                                    type="button"
                                    sx={{ ml: 1 }}
                                    variant="contained"
                                    color="primary"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Card>
        </Container>
    )
}

export default EditUser