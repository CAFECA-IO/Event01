import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";

const STEPS = {
  starter: "starter",
  rule: "rule",
  questions: "questions",
  result: "result",
};

const Button = ({ text, onClick }: { text: string; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="text-white bg-[#4caf50] py-[10px] px-[20px] text-[16px] border-none rounded-[5px] hover:bg-[#45a049]"
  >
    {text}
  </button>
);

export default function Home() {
  const [currentStep, setCurrentStep] = useState<string>(STEPS.starter);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    gryffindor: 0,
    hufflepuff: 0,
    ravenclaw: 0,
    slytherin: 0,
  });

  const questions = [
    {
      question: "如果宴會預算不足，你會怎麼做？",
      image: "/Q1.jpg",
      options: [
        { text: "取消部分菜單", house: "hufflepuff" },
        { text: "徵收額外費用", house: "slytherin" },
        { text: "自己掏腰包", house: "gryffindor" },
        { text: "寫申請向魔法部借款", house: "ravenclaw" },
      ],
    },
    {
      image: "/Q2.jpg",
      question: "分院帽需要維修費，你覺得應該怎麼籌資？",
      options: [
        { text: "與所有學生均分費用", house: "hufflepuff" },
        { text: "舉辦募款活動，吸引捐助", house: "slytherin" },
        { text: "主動捐款並號召其他人參與", house: "gryffindor" },
        { text: "提出提案，申請校董會撥款", house: "ravenclaw" },
      ],
    },
    {
      image: "/Q3.jpg",
      question: "魔法書籍價格上漲，導致教具預算超支，你會？",
      options: [
        { text: "建議學生租借而非購買", house: "hufflepuff" },
        { text: "提高新生入學費用", house: "slytherin" },
        { text: "自己籌錢補貼新生", house: "gryffindor" },
        { text: "找廠商協商批量優惠", house: "ravenclaw" },
      ],
    },
  ];

  const currentImg =
    currentStep === STEPS.starter
      ? "/starter.jpg"
      : currentStep === STEPS.rule
      ? "/rule.jpg"
      : currentStep === STEPS.result
      ? "/loading.svg"
      : questions[currentQuestion].image;

  const startStage = () => setCurrentStep(STEPS.rule);
  const startGame = () => setCurrentStep(STEPS.questions);

  useEffect(() => {
    if (currentStep === STEPS.result) {
      const sortedHouses = Object.keys(scores).sort(
        (a, b) => scores[b] - scores[a]
      );

      window.location.href = `/${sortedHouses[0]}`;
    }
  }, [currentStep]);

  return (
    <div className={`bg-[#f7f7f7] min-h-screen font-['Arial', sans-serif]`}>
      <Head>
        <title>分院帽的財務挑戰</title>
        <meta name="description" content="分院帽的財務挑戰" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Info: (20250204 - Julian) Background Music */}
      <audio id="background-music" autoPlay loop>
        <source src="BackgroudMusic.m4a" type="audio/mpeg" />
        <source src="BackgroudMusic.mp3" type="audio/mpeg" />
        您的瀏覽器不支援音訊播放。
      </audio>

      <main className="flex flex-1 flex-col items-center">
        <h1 className="font-bold text-[2em] py-[32px]">分院帽的財務挑戰</h1>
        <p>「戴上我吧，我會看穿你的財務靈魂，將你分配到最適合你的分院！」</p>

        <div className="mx-auto gap-[10px] w-full flex flex-col items-center box-border overflow-hidden max-w-[600px] bg-[#fff] my-[10px] p-[10px] border border-[#ddd] rounded-[10px]">
          {currentStep === STEPS.questions && (
            <p className="text-[1.17em] font-bold my-[12px]">
              {questions[currentQuestion].question}
            </p>
          )}

          {currentStep !== STEPS.result && (
            <Image
              src={currentImg}
              alt="圖片無法載入"
              width={500}
              height={500}
            />
          )}

          {currentStep === STEPS.result && (
            <div className="flex flex-col gap-2 items-center justify-center h-[400px]">
              <Image src="/loading.svg" alt="loading" width={50} height={50} />
              <p>正在計算結果...</p>
            </div>
          )}

          {currentStep === STEPS.starter && (
            <Button text="開始遊戲" onClick={startStage} />
          )}

          {currentStep === STEPS.rule && (
            <Button text="進入遊戲" onClick={startGame} />
          )}

          {/* Info: (20250205 - Julian) 問題圖卡 */}
          {currentStep === STEPS.questions && (
            <div className="flex flex-wrap gap-[10px] justify-center">
              {questions[currentQuestion].options.map((option, index) => {
                const onClick = () => {
                  // Info: (20250205 - Julian) 加分至對應的分院
                  const house = option.house.toLowerCase();
                  setScores({ ...scores, [house]: scores[house] + 1 });

                  // Info: (20250205 - Julian) 進入到下一題或顯示結果
                  if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                  } else {
                    setCurrentStep(STEPS.result);
                  }
                };

                return (
                  <Button key={index} text={option.text} onClick={onClick} />
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
