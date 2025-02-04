import React from "react";
import Head from "next/head";
import Image from "next/image";
import { GetServerSideProps } from "next";

type House = "gryffindor" | "hufflepuff" | "ravenclaw" | "slytherin";
const results = {
  hufflepuff: {
    title: "赫夫帕夫（務實型）",
    text: "恭喜！你被分配到赫夫帕夫財務分院！你擁有一顆溫暖的心，總是願意為集體利益做出妥協與務實的選擇，但記得偶爾也要為自己的利益考慮一下！",
    image: "/hufflepuff.jpg",
  },
  slytherin: {
    title: "史萊哲林（策略型）",
    text: "太棒了！你是史萊哲林財務分院的代表！你擅長制定策略，總能在關鍵時刻找到創造收入的方法。但別忘了，適當考慮團隊的需求，也是一種智慧。",
    image: "/slytherin.jpg",
  },
  gryffindor: {
    title: "葛萊芬多（冒險型）",
    text: "哇！你是葛萊芬多財務分院的勇敢代表！你的決策充滿激情與正義感，總是願意為他人挺身而出。只要稍微多一些冷靜和計劃，你將更加無敵！",
    image: "/gryffindor.jpg",
  },
  ravenclaw: {
    title: "雷文克勞（理性型）",
    text: "棒極了！你被分配到雷文克勞財務分院！你的決策冷靜且邏輯清晰，總能找到最佳解決方案。記得偶爾放下數據，聽聽內心的聲音，也許會有意外的收穫！",
    image: "/ravenclaw.jpg",
  },
};

const ResultPage: React.FC<{ resultId: string }> = ({ resultId }) => {
  const myHouse = results[resultId as House];

  if (!myHouse) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-center">
          Oops! 你似乎來錯地方了！😵‍💫
        </h1>
      </div>
    );
  }

  const bgColor =
    resultId === "gryffindor"
      ? "bg-[#ffc4c6]"
      : resultId === "hufflepuff"
      ? "bg-[#fff9c4]"
      : resultId === "ravenclaw"
      ? "bg-[#c4f1ff]"
      : "bg-[#c4ffc4]";

  return (
    <div className={`bg-[#f7f7f7] min-h-screen font-['Arial', sans-serif]`}>
      <Head>
        <title>分院帽的財務挑戰</title>
        <meta name="description" content="分院帽的財務挑戰" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col items-center">
        <h1 className="font-bold text-[2em] py-[32px]">分院帽的財務挑戰</h1>

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

        <div className="flex font-semibold py-[20px]">
          <p>分享到社群：</p>
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
