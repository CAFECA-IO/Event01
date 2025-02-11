import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { DOMAIN } from "@/constants/config";
import { House, testResults } from "@/constants/house";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params || !params.shareId || typeof params.shareId !== "string") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      shareId: params.shareId,
    },
  };
};

export default function SharePage({ shareId }: { shareId: string }) {
  const { title, image } = testResults[shareId as House];

  // Info: (20250205 - Julian) 一進入此頁面，就引導至首頁
  useEffect(() => {
    window.location.href = DOMAIN;
  }, []);

  return (
    <>
      {/* Info: (20250205 - Julian) Open Graph Tag */}
      <meta property="og:title" content="分院帽的財務挑戰" />
      <meta name="og:type" content="website" />
      {/* Info: (20250205 - Julian) 導入首頁 */}
      <meta name="og:url" content={DOMAIN} />
      <meta name="og:image" content={`${DOMAIN}${image}`} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="og:image:alt" content={title} />
      <meta property="og:description" content="分院帽的財務挑戰" />
      <meta name="og:site_name" content="分院帽的財務挑戰" />
      <meta name="og:locale" content="zh_TW" />

      {/* Info: (20250205 - Julian) Twitter */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@isunfa" />
      <meta name="twitter:creator" content="@isunfa" />
      {/* Info: (20250205 - Julian) 導入首頁 */}
      <meta name="twitter:url" content={DOMAIN} />
      <meta name="twitter:title" content="分院帽的財務挑戰" />
      <meta name="twitter:description" content="分院帽的財務挑戰" />
      <meta name="twitter:image" content={`${DOMAIN}${image}`} />
      <meta name="twitter:image:alt" content={title} />
    </>
  );
}
