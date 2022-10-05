export function stringifyParams(params: Record<string, string>) {
  return Object.entries(params).map(([key, value]) =>
    `${key}=${encodeURIComponent(value as string)}`
  ).join(
    '&',
  );
}

let csrf: string | null = null;

export function getHeaders(type = 'default') {
  const headers: Record<string, string> = {
    'User-Agent':
      'Mozilla/5.0 (X11; Linux x86_64; rv:90.0) Gecko/20100101 Firefox/101.0',
  };

  if (csrf) headers['X-CSRF-Token'] = csrf;

  if (type === 'reviews') {
    Object.assign(headers, {
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Upgrade-Insecure-Requests': '1',
      'TE': 'trailers',
    });
  }


  return headers;
}

export function setCSRF(token: string) {
    csrf = token
}
