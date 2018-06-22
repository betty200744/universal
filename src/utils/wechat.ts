import { post } from '@util/srequest';
import { isWeixin } from '@util/useragent';
import Cookie from 'js-cookie';

export const isAuthed = () => {
  if (isWeixin()) {
    if (Cookie.get('openId') && Cookie.get('token')) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export const auth = () => {
  if (!isAuthed()) {
    const query = `query($hostname: String!, $endPoint: String!){
      wechatH5Login(hostname: $hostname, endPoint: $endPoint)
    }`;
    const variables = {
      hostname: window.location.origin,
      endPoint: window.location.pathname + window.location.search + window.location.hash,
    };
    post('/api/graphql', { query, variables }).then((result: any) => {
      // console.log(result.wechatH5Login);
      window.location.href = result.wechatH5Login;
    });
  }
};