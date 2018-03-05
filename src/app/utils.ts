import { UrlSegment } from '@angular/router';

export function ng1Matcher(url: UrlSegment[]) {
  if (url.length > 1 && url[1].path === 'ng1') {
    return { consumed: url }; // if we consume everything, the URL will match.
  } else {
    return { consumed: [] }; // if we don't consume anything, the router will keep matching.
  }
}
