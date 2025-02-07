export type ISocialMedia = "FACEBOOK" | "TWITTER" | "LINE";

export interface ISocialMediaSetting {
  url: string;
  text?: string;
  type: string;
  size: string;
}

export const ShareSettings: Record<ISocialMedia, ISocialMediaSetting> = {
  FACEBOOK: {
    url: "https://www.facebook.com/sharer/sharer.php?u=",
    type: "facebook-share-dialog",
    size: "width=800,height=600",
  },
  TWITTER: {
    url: "https://twitter.com/intent/tweet?url=",
    type: "twitter-share-dialog",
    size: "width=800,height=600",
  },
  LINE: {
    url: "https://social-plugins.line.me/lineit/share?url=",
    type: "_blank",
    size: "width=600,height=400",
  },
};
