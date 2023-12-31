import React, { useState } from "react";
import axios from "axios";
import { DefaultLayout } from "../../src/layout/DefaultLayout";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid, Typography, Button } from "@mui/material";
import Link from "next/link";

const textFieldStyle = {
  width: "400px",
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#683212",
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#bb947c",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#683212",
  },
};

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null); // エラーメッセージのリセット
    setSuccess(null); // 完了メッセージのリセット

    try {
      const response = await axios.post(
        "http://localhost:18888/api/register",
        {
          mail_address: email,
          user_password: password,
        }
      );
      setSuccess(response.data.message);
    } catch (error) {
      if (error.response) {
        // リクエストは行われましたが、サーバが2xxの範囲外のステータスコードで応答しました
        console.log(error.response.data);
        console.log(error.response.status);
        setError(error.response.data.message);
      } else if (error.request) {
        // リクエストは行われましたが、応答は受け取られませんでした
        setError("サーバが応答しなかったので、後でもう一度試してください。");
      } else {
        // リクエストの設定中にエラーが発生した何かが起きました
        setError(
          "リクエストの設定中にエラーが発生しました。再試行してください。"
        );
      }
    }
  };

  return (
    <DefaultLayout>
      <Grid
        container
        direction="column"
        sx={{ alignItems: "center", width: "100%", paddingTop: "80px" }}
      >
        <Typography variant="h4">新規ユーザー登録</Typography>
        <Grid item xs={12}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            <Grid
              item
              sx={{ alignItems: "center", width: "100%", paddingTop: "40px" }}
            >
              <TextField
                id="outlined-email"
                label="メールアドレス"
                variant="outlined"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                InputLabelProps={{
                  style: { color: "#683212" },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "center",
                width: "100%",
                paddingTop: "20px",
                paddingBottom: "10px",
              }}
            >
              <TextField
                id="outlined-password"
                label="パスワード"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputLabelProps={{
                  style: { color: "#683212" },
                }}
                sx={textFieldStyle}
              />
            </Grid>
            <span style={{ color: "gray" }}>
              半角英数・記号の8文字以上で入力してください。
            </span>
            <Grid sx={{ paddingTop: "20px" }}>
              {error && <Typography color="error">{error}</Typography>}
              {success && <Typography color="primary">{success}</Typography>}
            </Grid>
            <Grid
              item
              sx={{ alignItems: "center", width: "100%", paddingTop: "30px" }}
            >
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#f59e0b",
                  color: "#ffffff",
                  "&:hover": {
                    backgroundColor: "#f59f0bc5",
                  },
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                アカウントを作成する
              </Button>
            </Grid>
            <Grid sx={{ paddingTop: "20px" }}>
              <span>すでにアカウントをお持ちですか？</span>
              <Link href={"/login"}>
                <span style={{ color: "#F59E0B", cursor: "pointer" }}>
                  ログイン
                </span>
              </Link>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
};

export default Signup;
