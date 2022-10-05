import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12';
import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';

const FIVERR_ENDPOINT = 'https://wwww.fiverr.com';

const app = new Router();
const headers: Record<string, string> = {
  'User-Agent':
    'Mozilla/5.0 (X11; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/101.0',
};

let csrf: string | null = null;

const fetchUserData = async (username: string) => {
  if (csrf) headers['X-CSRF-Token'] = csrf;

  const res = await fetch(`${FIVERR_ENDPOINT}/${username}`, {
    headers,
  });

  if (!res.ok) throw res;

  const text = await res.text();

  const $ = cheerio.load(text);

  const data = $('#perseus-initial-props');
  const token = $('meta[property=csrfToken]').attr('content');

  if (token) csrf = token;

  return JSON.parse(data.text());
};

app.get('/:username', async (ctx) => {
  const info = await fetchUserData(ctx.params.username);
  const user_id = info.userData.user.id;
  const reviews = [...info.userData.buying_reviews.reviews];
  const payload: Record<string, unknown> = {
    user_id,
  };

  let hasNext = info.userData.buying_reviews.has_next;

  while (hasNext) {
    const res = await fetch(
      `${FIVERR_ENDPOINT}/reviews/user_page/fetch_user_reviews/${user_id}`,
      {
        headers,
        body: JSON.stringify(payload),
      },
    );

    if (!res.ok) {
      console.warn(res);
      break;
    }

    const data = await res.json();

    reviews.push(...data.reviews);
    payload.last_star_rating_id = reviews.at(-1).id;
    payload.last_review_id = reviews.at(-1).id;
    hasNext = data.has_next;
  }

  ctx.response.body = reviews;
});

await new Application().use(app.routes()).listen({ port: 8000 });
