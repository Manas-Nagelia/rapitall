import {
  Paper,
  createStyles,
  TextInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Badge,
  Group,
  Center,
  Container,
  Box,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, FormEventHandler, FormEvent } from "react";
import { supabase } from "../../utils/supabaseClient";
import { IconX, IconCheck, IconArrowLeft } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";
import checkMail from "./checkMail.svg";
import { Logo } from "./Logo";
import Head from "next/head";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    marginTop: "-0.75em",
    marginRight: "-0.75em",
    marginBottom: "-0.75em",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundImage:
      "url(https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8bmJhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60)",
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  mailTitle: {
    fontSize: 26,
    fontWeight: 900,
  },

  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
}));

export function AuthenticationImage() {
  const [email, setEmail] = useState("");
  const [allowedEmails, setAllowedEmails] = useState<any>(null);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { classes } = useStyles();

  useEffect(() => {
    const fetchAllowedEmails = async () => {
      const { data, error } = await supabase.from("Admins").select();
      setAllowedEmails(data);
    };

    fetchAllowedEmails();

    return () => {};
  });

  const delay = (ms: any) => new Promise((res) => setTimeout(res, ms));

  const checkEmail = async (e: FormEvent) => {
    let found = false;
    allowedEmails.forEach((_email: any) => {
      if (_email.email === email) {
        found = true;
      }
    });

    if (found) {
      e.preventDefault();
      setLoading(true);
      showNotification({
        title: "Successfully signed in",
        message: "You are authorized. Check your email for the login link.",
        color: "green",
        icon: <IconCheck size="18" />,
        autoClose: 3000,
      });
      const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
      });
      await delay(3000);
      setSent(true);
      setLoading(false);
      if (!error) {
        setSent(true);
      }
    } else {
      e.preventDefault();
      showNotification({
        title: "Email not found",
        message:
          "We couldn't find your email in our system. If you believe that this is an error, please contact the site's owner",
        color: "red",
        icon: <IconX size="18" />,
        autoClose: 5000,
      });
    }
  };

  if (!sent) {
    return (
      <>
        <Head>
          <title>Login</title>
        </Head>
        <div className={classes.wrapper}>
          <Paper className={classes.form} radius={0} p={30}>
            <Logo />
            <Title
              order={2}
              className={classes.title}
              align="center"
              mt="md"
              mb="xl"
            >
              Login to your N3 account
            </Title>

            <Group position="center">
              <Badge color="yellow" mb="sm">
                Internal Use Only
              </Badge>
            </Group>

            <form
              onSubmit={async (e) => {
                await checkEmail(e);
              }}
            >
              <TextInput
                label="Email address"
                placeholder="hello@gmail.com"
                type="email"
                size="md"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                mt="xl"
                size="md"
                disabled={loading}
              >
                {!loading ? "Login" : "Loading..."}
              </Button>
            </form>
          </Paper>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Check your email</title>
        </Head>
        <Stack align="center" style={{ height: "95vh" }}>
          <Logo mb="md" />
          <Container size={460} my={30} mt={0}>
            <Title className={classes.mailTitle} align="center">
              Check your email
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={4}>
              Check your email for a magic link to sign in
            </Text>

            <Paper p={30} radius="md" mt="xl">
              <Image src={checkMail} alt="Email illustration" />
              <Group position="center" mt="xl" className={classes.controls}>
                <Anchor color="dimmed" size="sm" className={classes.control}>
                  <Center inline>
                    <IconArrowLeft size={12} stroke={1.5} />
                    <Box ml={5} onClick={() => {setSent(false)}}>Back to login page</Box>
                  </Center>
                </Anchor>
              </Group>
            </Paper>
          </Container>
        </Stack>
      </>
    );
  }
}
