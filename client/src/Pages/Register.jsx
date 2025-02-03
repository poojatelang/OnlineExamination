import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection
import { registerRequest } from "../Redux/slices/Student";
import { toast } from "react-toastify";  // Import Toastify
// import "react-toastify/dist/ReactToastify.css";  // Import Toastify CSS

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  age: yup.number().typeError("Age must be a number").required("Age is required"),
  phoneNumber: yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Use navigate for redirection
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: "",
      phoneNumber: "",
      image: "",
    },
  });

  const [image, setImage] = useState("");  // Controlled value (empty string instead of null)
  const [imageError, setImageError] = useState("");

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        setImageError("Only image files are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setImageError("File size must be less than 2MB.");
        return;
      }
      setImageError("");
      setImage(file);
    }
  };

  const onSubmit = (data) => {
    // dispatch registration action
    dispatch(registerRequest(data));

    // Show success toast
    // toast.success("Registration successful!");

    // Check if token exists in localStorage

    // Add delay before checking the token and navigating
    setTimeout(() => {
      const token = localStorage.getItem("token");
      if (token) {
        navigate("/instruction");  // Redirect to instruction page
      }
    }, 2000);  // Wait for 2 seconds before checking the token
  
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller name="name" control={control} render={({ field }) => (
          <TextField {...field} label="Name" fullWidth margin="normal"value={field.value ?? ""} error={!!errors.name} helperText={errors.name?.message} />
        )} />
        
        <Controller name="email" control={control} render={({ field }) => (
          <TextField {...field} label="Email" type="email" fullWidth value={field.value ?? ""}margin="normal" error={!!errors.email} helperText={errors.email?.message} />
        )} />

        <Controller name="password" control={control} render={({ field }) => (
          <TextField {...field} label="Password" type="password"value={field.value ?? ""} fullWidth margin="normal" error={!!errors.password} helperText={errors.password?.message} />
        )} />

        <Controller name="confirmPassword" control={control} render={({ field }) => (
          <TextField {...field} label="Confirm Password"value={field.value ?? ""} type="password" fullWidth margin="normal" />
        )} />

        <Controller name="age" control={control} render={({ field }) => (
          <TextField {...field} label="Age" type="number"value={field.value ?? ""} fullWidth margin="normal" error={!!errors.age} helperText={errors.age?.message} />
        )} />

        <Controller name="phoneNumber" control={control} render={({ field }) => (
          <TextField {...field} label="Phone Number"value={field.value ?? ""} type="number" fullWidth margin="normal" error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
        )} />

        <Controller name="image" control={control} render={({ field }) => (
          <TextField {...field} label="User Photo"value={field.value ?? ""} fullWidth margin="normal" />
        )} />

        {/* Image Upload Field */}
        {/* <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: "16px" }} />
        {imageError && <Typography color="error">{imageError}</Typography>} */}

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>

      {/* ToastContainer for toasts */}
      {/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover /> */}
    </Container>
  );
};

export default Register;
