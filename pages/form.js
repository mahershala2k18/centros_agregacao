import React from "react";
import { useState } from "react";
import { Stack } from "@mui/system";

const MyForms = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    console.log(e);
  };

  return (
    <>
      <form
        action="https://survey.terrafirma.co.mz:446/v1/pg/login"
        method="post"
      >
        <Stack sx={{ width: "30%", margin: 2 }}>
          <input
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button onSubmit={() => handleSubmit()}>submit</button>
        </Stack>
      </form>
    </>
  );
};

export default MyForms;
