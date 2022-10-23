import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stack,
  Divider,
  Loader,
} from "@mantine/core";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { GoogleButton } from "../components/SocialButtons";
import { useForm } from "@mantine/form";
import Head from "next/head";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import Link from "next/link";
import Router from "next/router";
import redirect from "nextjs-redirect";
import Loading from "../components/Loading";

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
    },
  });

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(undefined);

  const Redirect = redirect("/");

  const supabase = useSupabaseClient();

  const session = useSession();
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, [supabase]);

  if (loading) {
    return <Loading />
  } else {
    if (user == null) {
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
                    Log In
                  </Title>
                  <Text color="dimmed" size="sm" align="center" mt={5}>
                    Do not have an account yet?{" "}
                    <Link href="/signup" passHref>
                      <Anchor component="a">Create one</Anchor>
                    </Link>
                  </Text>
                </>
                {/* Start using this once Google Cloud and OAuth is setup (needs credit card) -> https://supabase.com/docs/guides/auth/auth-google
                <Group grow mb="md" mt="xl">
                  <GoogleButton
                    radius="xl"
                    onClick={async () => {
                      
                    }}
                  >
                    Google
                  </GoogleButton>
                </Group> */}

                <Divider
                  label="Or continue with email"
                  labelPosition="center"
                  my="lg"
                />

                <form
                  onSubmit={form.onSubmit(async () => {
                    const { data, error } =
                      await supabase.auth.signInWithPassword({
                        email: form.values.email,
                        password: form.values.password,
                      });

                    if (error) {
                      form.setErrors({ password: "Invalid Credentials" });
                      console.log(error);
                    } else {
                      Router.push("/");
                    }
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
                        form.setFieldValue(
                          "password",
                          event.currentTarget.value
                        )
                      }
                      error={form.errors.password}
                    />
                    <Button type="submit">Login</Button>
                  </Stack>
                </form>
              </Paper>
            </Container>
          </Stack>
        </>
      );
    } else {
      return (
        <Redirect>
          <Loading />
        </Redirect>
      );
    }
  }
};

export default Login;
