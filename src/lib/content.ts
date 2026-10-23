import { getCollection } from 'astro:content';

const visible = ({ data }: { data: { draft: boolean; demo: boolean } }) =>
  import.meta.env.DEV || (!data.draft && !data.demo);
export const articles = async () => (await getCollection('articles', visible))
  .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
export const projects = async () => (await getCollection('projects', visible))
  .sort((a, b) => a.data.order - b.data.order);
export const research = async () => (await getCollection('research', visible))
  .sort((a, b) => a.data.order - b.data.order);
export const dateLabel = (date: Date) => new Intl.DateTimeFormat('zh-CN', {
  year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC',
}).format(date);
