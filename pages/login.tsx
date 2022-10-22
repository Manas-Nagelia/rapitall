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
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";

const Login: NextPage = () => {
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

  const supabase = useSupabaseClient();

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
          transform: "translateY(10%)",
        }}
      >
        <Container size={420} my={40}>
          <Paper radius="md" withBorder shadow="md" mt="lg" px={50} py={40}>
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
                  <Link href="/signup" passHref><Anchor component="a">Login</Anchor></Link>
                </Text>
              </>
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
                
              })}
            >
              <Stack>
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
                <Button type="submit">Login</Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Stack>
    </>
  );
};

export default Login;
