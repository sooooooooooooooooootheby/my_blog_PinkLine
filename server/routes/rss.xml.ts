import { serverQueryContent } from "#content/server";
import RSS from "rss";

export default defineEventHandler(async (event) => {
	const feed = new RSS({
		title: "River of star Dreams",
		site_url: "https://blog.sooooooooooooooooootheby.top/",
		feed_url: `https://blog.sooooooooooooooooootheby.top/rss.xml`,
	});
	const docs = await serverQueryContent(event).sort({ date: -1 }).find();
	const blogPosts = docs.filter((doc) => doc?._path?.includes("/articles"));

	for (const doc of blogPosts) {
		feed.item({
			title: doc.title ?? "-",
			url: `https://blog.sooooooooooooooooootheby.top/${doc._path}`,
			date: doc.data,
			description: doc.description,
		});
	}

	const feedString = feed.xml({ indent: true });
	event.res.setHeader("content-type", "text/xml");
	event.res.end(feedString);
});
