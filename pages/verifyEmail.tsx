import { Loader } from "@mantine/core";
import { NextPage } from "next";
import * as Realm from "realm-web";
import { useEffect } from "react";
import { useRouter } from "next/router";

const VerifyEmail: NextPage = () => {
  const router = useRouter();
  const token: any = router.query.token;
  const tokenId: any = router.query.tokenId;

  useEffect(() => {
    const confirmUser = async () => {
      const REALM_APP_ID = "bull-investments-tivlr";
      const app = new Realm.App({ id: REALM_APP_ID });
      const res = await app.emailPasswordAuth.confirmUser({ token, tokenId });
    };

    if (token && tokenId) confirmUser();
  }, [token, tokenId]);

  return <Loader />;
};

export default VerifyEmail;
