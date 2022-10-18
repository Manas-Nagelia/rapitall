import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Stack,
  Divider,
} from "@mantine/core";
import { NextPage } from "next";
import { useState } from "react";
import { GoogleButton, TwitterButton } from "../components/SocialButtons";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import Head from "next/head";
import { useEffect } from "react";
import * as Realm from "realm-web";

const Auth: NextPage = () => {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Stack
        align="center"
        style={{
          position: "relative",
          top: "50%",
          transform: type == "register" ? "translateY(3%)" : "translateY(10%)",
        }}
      >
        <Container size={420} my={40}>
          <Paper radius="md" withBorder shadow="md" mt="lg" px={50} py={40}>
            {type == "register" ? (
              <>
                <Title
                  align="center"
                  sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                  })}
                >
                  Welcome to Bull Investments
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                  Already have an account?{" "}
                  <Anchor onClick={() => toggle()}>Login</Anchor>
                </Text>
              </>
            ) : (
              <>
                <Title
                  align="center"
                  sx={(theme) => ({
                    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                    fontWeight: 900,
                  })}
                >
                  Welcome back
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                  Do not have an account yet?{" "}
                  <Anchor onClick={() => toggle()}>Create account</Anchor>
                </Text>
              </>
            )}
            <Group grow mb="md" mt="xl">
              <GoogleButton radius="xl">Google</GoogleButton>
              <TwitterButton radius="xl">Twitter</TwitterButton>
            </Group>

            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
            />

            <form
              onSubmit={form.onSubmit(async () => {
                const app = new Realm.App({ id: process.env.NEXT_PUBLIC_REALM_APP_ID! });

                if (type == "register") {
                  const email = form.values.email;
                  const password = form.values.password;
                  const res = await app.emailPasswordAuth.registerUser({
                    email,
                    password,
                  });
                  console.log(res);
                } else if (type == "login") {
                  const credentials = Realm.Credentials.emailPassword(
                    form.values.email,
                    form.values.password
                  );
                  try {
                    // Authenticate the user
                    const user = await app.logIn(credentials);
                    // `App.currentUser` updates to match the logged in user
                    console.assert(user.id === app!.currentUser!.id);
                    console.log(user);
                  } catch (err) {
                    console.error("Failed to log in", err);
                  }
                }
              })}
            >
              <Stack>
                {type === "register" && (
                  <TextInput
                    label="First Name"
                    placeholder="Your first name"
                    value={form.values.name}
                    onChange={(event) =>
                      form.setFieldValue("name", event.currentTarget.value)
                    }
                  />
                )}

                <TextInput
                  required
                  label="Email"
                  placeholder="hello@mantine.dev"
                  value={form.values.email}
                  onChange={(event) =>
                    form.setFieldValue("email", event.currentTarget.value)
                  }
                  error={form.errors.email && "Invalid email"}
                />

                <PasswordInput
                  required
                  label="Password"
                  placeholder="Your password"
                  value={form.values.password}
                  onChange={(event) =>
                    form.setFieldValue("password", event.currentTarget.value)
                  }
                  error={
                    form.errors.password &&
                    "Password should include at least 6 characters"
                  }
                />

                {type === "register" && (
                  <Checkbox
                    label="I accept terms and conditions"
                    checked={form.values.terms}
                    onChange={(event) =>
                      form.setFieldValue("terms", event.currentTarget.checked)
                    }
                  />
                )}
                <Button type="submit">{upperFirst(type)}</Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Stack>
    </>
  );
};

export default Auth;
