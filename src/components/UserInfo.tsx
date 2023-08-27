import { Button, Card, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleUser } from "../services/UserServices";
import { userDetails } from "../types/types";

function UserInfo() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<userDetails>();

  const getUserDetails = () => {
    getSingleUser(id)
      .then((res: any) => {
        setUserInfo(res.data);
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
        <Typography variant="h4" className="text-center">
          User Info
        </Typography>
        <div className="mt-4 text-end">
          <Button onClick={()=>(navigate("/"))} type="button" variant="contained" color="primary">
            Back to Users
          </Button>
        </div>
        {userInfo && (
          <div className="detail-card mt-5" key={userInfo.id}>
            <div className="card-description">
              <Typography className="card-description-title">
                {userInfo.firstName} {userInfo.lastName}
              </Typography>

              <Typography className="card-description-profession">
                Email: {userInfo.email}
              </Typography>

              <Typography className="card-description-company">
                Mobile No: {userInfo.mobileNumber}
              </Typography>

              <Typography className="card-description-company">
                Role: {userInfo.role}
              </Typography>

              <div className="card-description-social">
                <Typography className="card-description-social-follow">
                  DOB: {userInfo.dob}
                </Typography>
              </div>
            </div>
            <img alt="img" src={userInfo.pic} className="card-image" />
          </div>
        )}
      </Card>
    </Container>
  );
}

export default UserInfo;
