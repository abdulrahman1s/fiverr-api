import * as cheerio from 'https://esm.sh/cheerio@1.0.0-rc.12';
import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts';
import { getHeaders, setCSRF, stringifyParams } from './util.ts';

const app = new Router();

const FIVERR_ENDPOINT = 'https://www.fiverr.com';

const fetchUserData = async (username: string) => {
  const res = await fetch(`${FIVERR_ENDPOINT}/${username}`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw res;

  const $ = cheerio.load(await res.text());
  const data = $('#perseus-initial-props');
  const token = $('meta[property=csrfToken]').attr('content');

  if (token) setCSRF(token);

  return JSON.parse(data.text());
};

app.get('/:username', async (ctx) => {
  const info = await fetchUserData(ctx.params.username);

  ctx.response.body = {
    ...info.userData.seller_card,
    ...info.userData.seller_profile,
  };
});

app.get('/:username/gigs', async (ctx) => {
  const info = await fetchUserData(ctx.params.username);
  ctx.response.body = info.gigs.gigs;
});

app.get('/:username/reviews', async (ctx) => {
  const { username } = ctx.params;
  const info = await fetchUserData(username);
  const user_id = info.userData.user.id;
  const reviews = [...info.userData.buying_reviews.reviews];
  const params: Record<string, string> = {
    user_id,
  };

  let hasNext = info.userData.buying_reviews.has_next;

  while (hasNext) {
    const res = await fetch(
      `${FIVERR_ENDPOINT}/reviews/user_page/fetch_user_reviews/${user_id}?${
        stringifyParams(params)
      }`,
      {
        headers: getHeaders('reviews'),
      },
    );

    if (!res.ok) {
      console.warn('BAD REQUEST', res);
      break;
    }

    const data = await res.json();

    reviews.push(...data.reviews);
    params.last_star_rating_id = reviews.at(-1).id;
    params.last_review_id = reviews.at(-1).id;
    hasNext = data.has_next;
  }

  ctx.response.body = reviews;
});

await new Application().use(app.routes()).listen({ port: 8000 });
