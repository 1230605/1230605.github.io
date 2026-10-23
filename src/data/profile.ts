// Only add information you want to make public. Empty fields stay unpublished.
export const profile = {
  name: '',
  headline: '',
  englishHeadline: '',
  bio: '',
  email: '',
  github: '',
  resume: '',
  research: [] as { title: string; english: string; description: string }[],
};
export const site = {
  title: '个人研究与技术主页',
  description: '关于研究、技术与持续探索的个人空间。记录问题、分享思考，让想法逐渐成形。',
};
