export type House = "gryffindor" | "hufflepuff" | "ravenclaw" | "slytherin";
export const testResults: Record<
  House,
  { title: string; text: string; image: string }
> = {
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
