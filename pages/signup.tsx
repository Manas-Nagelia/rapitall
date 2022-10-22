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

const Signup: NextPage = () => {
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
          transform: "translateY(3%)",
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
                Welcome to Bull Investments
              </Title>
              <Text color="dimmed" size="sm" align="center" mt={5}>
                Already have an account? <Link href="/login" passHref><Anchor component="a">Login</Anchor></Link>
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
                const { data, error } = await supabase.auth.signUp({
                  email: form.values.email,
                  password: form.values.password,
                });

                if (error) console.log(error);
              })}
            >
              <Stack>
                <TextInput
                  label="First Name"
                  placeholder="Your first name"
                  value={form.values.name}
                  onChange={(event) =>
                    form.setFieldValue("name", event.currentTarget.value)
                  }
                />

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

                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) =>
                    form.setFieldValue("terms", event.currentTarget.checked)
                  }
                />
                <Button type="submit">Sign Up</Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      </Stack>
    </>
  );
};

export default Signup;
