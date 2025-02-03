import React,{useEffect, useRef } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch ,useSelector} from "react-redux";
import { loginRequest } from "../Redux/slices/Student";
import { useNavigate} from "react-router-dom";  // Import useNavigate
import { toast } from "react-toastify"; // Import toast

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate hook
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "", // ✅ Ensures input starts controlled
      password: "",
    },
  });
  
  // const loginError = useSelector(state => state.student.error);
  const isLoggedIn = useSelector(state => state.student.isAuthenticated); // Assuming you have a login state flag
  // // console.log(loginError)
  // const isFirstRender = useRef(true);
  // useEffect(() => {

  //   if (isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return;
  //   }
  //   if (loginError && loginError.status === 401) {
  //     console.log(loginError)
  //     toast.error(loginError.data.message);
  //     navigate('/register'); // Navigate to register page if 401 Unauthorized
  //   } else if (isLoggedIn) {
  //     toast.success("Login Successful!");
  //     navigate("/instruction"); // Navigate to instruction page after successful login
  //   }
  // }, [loginError, isLoggedIn]);

  
  useEffect(()=>{
    if(isLoggedIn){
      navigate("/instruction"); 
    }
  },[isLoggedIn])
  const onSubmit = (data) => {
    dispatch(loginRequest(data)); // Dispatch login action
  
    // Assuming successful login, show toast and navigate
    // toast.success("Login Successful!", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    // });
    
    // Navigate to the instruction page after login
    // navigate("/instruction");  // Make sure the instruction route exists
  };

    // Watch for login failure (you can use redux state here, for example, loginError)
  // If 401 happens, navigate to register page


 

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller 
          name="email" 
          control={control} 
          render={({ field }) => (
            <TextField {...field} label="Email" fullWidth margin="normal" value={field.value ?? ""}
            error={!!errors.email} helperText={errors.email?.message} />
          )}
        />

        <Controller 
          name="password" 
          control={control} 
          render={({ field }) => (
            <TextField {...field} label="Password" type="password"value={field.value ?? ""} fullWidth margin="normal" error={!!errors.password} helperText={errors.password?.message} />
          )}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
