import React from "react";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";
import { ShareSettings } from "@/constants/social_media";
import { DOMAIN } from "@/constants/config";
import { testResults, House } from "@/constants/house";

const ResultPage: React.FC<{ resultId: string }> = ({ resultId }) => {
  const myHouse = testResults[resultId as House];

  // Info: (20250205 - Julian) 如果沒有對應結果，顯示 404 頁面
  if (!myHouse) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-center">
          Oops! 你似乎來錯地方了！😵‍💫
        </h1>
      </div>
    );
  }

  const shareText = `我在分院帽的財務挑戰中被分配到了${myHouse.title}！快來試試看吧！`;
  const shareUrl = `${DOMAIN}/s/${resultId}`; // Info: (20250205 - Julian) 導入分享頁面

  const bgColor =
    resultId === "gryffindor"
      ? "bg-[#ffc4c6]"
      : resultId === "hufflepuff"
      ? "bg-[#fff9c4]"
      : resultId === "ravenclaw"
      ? "bg-[#c4f1ff]"
      : "bg-[#c4ffc4]";

  const socialMediaList = Object.entries(ShareSettings).map(([key, value]) => {
    // Info: (20250205 - Julian) Facebook 不再支援 text 參數，所以不用填入
    const isShareText = key === "FACEBOOK" ? "" : `&text=${shareText}`;

    const onClick = () => {
      if (shareUrl === "") throw new Error("Share url is empty");

      window.open(
        `${value.url}${encodeURIComponent(shareUrl)}${isShareText}`,
        `${value.type}`,
        `${value.size}`
      );
    };

    return (
      <button
        key={key}
        type="button"
        className="p-[8px] hover:invert-[80%] hover:cursor-pointer"
        onClick={onClick}
      >
        <Image
          src={`/${key.toLowerCase()}.png`}
          alt={key}
          width={20}
          height={20}
        />
      </button>
    );
  });

  return (
    <div className={`bg-[#f7f7f7] min-h-screen font-['Arial', sans-serif]`}>
      <Head>
        <title>分院帽的財務挑戰</title>
        <meta name="description" content="分院帽的財務挑戰" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />

        {/* Info: (20250205 - Julian) Safari */}
        <meta name="application-name" content="分院帽的財務挑戰" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" />
        <meta name="apple-mobile-web-app-title" content="分院帽的財務挑戰" />

        {/* Info: (20250205 - Julian) Open Graph Tag */}
        <meta property="og:title" content="分院帽的財務挑戰" />
        <meta name="og:type" content="website" />
        {/* Info: (20250205 - Julian) 導入首頁 */}
        <meta name="og:url" content={DOMAIN} />
        <meta name="og:image" content={`${DOMAIN}${myHouse.image}`} />
        <meta name="og:image:width" content="1200" />
        <meta name="og:image:height" content="630" />
        <meta name="og:image:alt" content={myHouse.title} />
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
        <meta name="twitter:image" content={`${DOMAIN}${myHouse.image}`} />
        <meta name="twitter:image:alt" content={myHouse.title} />
      </Head>

      {/* Info: (20250205 - Julian) Background Music */}
      <audio id="background-music" autoPlay loop>
        <source src="BackgroudMusic.m4a" type="audio/mpeg" />
        <source src="BackgroudMusic.mp3" type="audio/mpeg" />
        您的瀏覽器不支援音訊播放。
      </audio>

      <main className="flex flex-1 flex-col items-center">
        <h1 className="font-bold text-[2em] pt-[32px]">分院帽的財務挑戰</h1>

        <div
          className={`${bgColor} mx-auto gap-[10px] w-full flex flex-col items-center box-border overflow-hidden max-w-[550px] my-[10px] p-[10px] border-2 border-[#333] rounded-[10px]`}
        >
          <h2 className="font-bold text-[1.17em] py-[10px]">{myHouse.title}</h2>
          <p className="text-center">{myHouse.text}</p>

          <Image
            src={myHouse.image}
            alt={myHouse.title}
            width={550}
            height={550}
          />
        </div>

        <div className="flex font-semibold items-center mt-[8px]">
          <p>分享到社群：</p>
          {socialMediaList}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params || !params.resultId || typeof params.resultId !== "string") {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      resultId: params.resultId,
    },
  };
};

export default ResultPage;
