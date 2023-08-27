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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../services/UserServices";
import { userDetails } from "../types/types";
import * as  Yup from "yup"

function AddUser() {

    const userValues = {
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        dob: "",
        role: "",
        pic: ""
    }

    const role = [{ key: "admin", value: "Admin" }, { key: "teacher", value: "Teacher" }, { key: "student", value: "Student" }]

    const navigate = useNavigate();

    const [userData, setUserData] = useState<userDetails>(userValues)

    const handleChange = (e: any) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const formSubmitHandler = (userData: userDetails) => {
        addUser(userData).then((res: any) => {
            alert("User Added Successfully!")
            navigate("/")
        }).catch((error) => {
            alert(error);
        })
    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        email: Yup.string().required("Email is required").email("Please enter valid email"),
        mobileNumber: Yup.string().required("Mobile no. is required")
            .matches(phoneRegExp, "Please enter valid mobile no.")
            .min(10, "Please enter valid mobile no.")
            .max(10, "Please enter valid mobile no."),
        dob: Yup.string().required("DOB is required"),
        role: Yup.string().required("Role is required")
    })

    return (
        <Container sx={{ mt: 4 }} maxWidth="lg">
            <Card variant="outlined" sx={{ p: 4 }}>
                <Typography variant="h4" className="text-center" sx={{ mb: 4 }}>
                    Add User
                </Typography>
                <Formik initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    mobileNumber: "",
                    dob: "",
                    role: "",
                    pic: "",
                    isSubmitting: true,
                }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            setSubmitting(true);
                            formSubmitHandler(values);
                            resetForm();
                            setSubmitting(false)
                        }, 500)
                    }}>
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (

                        <form noValidate onSubmit={handleSubmit}>
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
                                    <Typography className="form-text text-danger">{errors.firstName && touched.firstName && errors.firstName}</Typography>
                                </Grid>
                                <Grid item md={6} sx={{ mb: 1 }}>
                                    <TextField
                                        fullWidth
                                        id="outlined-basic"
                                        label="Last name"
                                        variant="outlined"
                                        value={values.lastName}
                                        name="lastName"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                    <Typography className="form-text text-danger">{errors.lastName && touched.lastName && errors.lastName}</Typography>
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
                                    <Typography className="form-text text-danger">{errors.email && touched.email && errors.email}</Typography>
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
                                    <Typography className="form-text text-danger">{errors.mobileNumber && touched.mobileNumber && errors.mobileNumber}</Typography>
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
                                    <Typography className="form-text text-danger">{errors.dob && touched.dob && errors.dob}</Typography>
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
                                    <Typography className="form-text text-danger">{errors.role && touched.role && errors.role}</Typography>
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
                                    />
                                </Grid>
                            </Grid>
                            <div className="mt-4 text-center">
                                <Button disabled={isSubmitting} type="submit" variant="contained" color="success">
                                    Save
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
        </Container >
    )
}

export default AddUser