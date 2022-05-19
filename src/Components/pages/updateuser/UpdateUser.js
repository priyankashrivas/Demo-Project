import React, { useState } from "react";
import { Label, Input, Button } from "reactstrap";

const UpdateUser = () => {
  const initialValues = {
    tourist_name: "",
    tourist_email: "",
    tourist_location: "",
  };

  const [user, setUser] = useState(initialValues);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div>
      <h3>Update User Here</h3>
      <form>
        <div>
          <Label for="tourist-name">Name</Label>
          <Input
            type="text"
            name="tourist_name"
            value={user.tourist_name}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label for="tourist_email">Email</Label>
          <Input
            type="text"
            name="tourist_email"
            value={user.tourist_email}
            onChange={changeHandler}
          />
        </div>

        <div>
          <Label for="tourist_location">Location</Label>
          <Input
            type="text"
            name="tourist_location"
            value={user.tourist_location}
            onChange={changeHandler}
          />
        </div>
        <br />

        <Button type="submit" className="btn btn-info">
          Update User
        </Button>
      </form>
    </div>
  );
};

export default UpdateUser;
