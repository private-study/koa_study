const parsePostData = require("../utils/parsePostData");
const post = async ctx => {
  if (ctx.url === "/" && ctx.method === "GET") {
    // 当GET请求时候返回表单页面
    let html = `
      <form method="post" action="/from">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `;
    ctx.body = html;
  } else if (ctx.url === "/from" && ctx.method === "POST") {
    // 当POST请求的时候，解析POST表单里的数据，并显示出来
    let postData = await parsePostData(ctx);
    ctx.set("content-type", "text/html; charset=utf-8");
    ctx.body = `<div>${postData}</div>`;
  } else {
    // 其他请求显示404
    ctx.body = "<h1>404！！！ o(╯□╰)o</h1>";
  }
};

module.exports = () => {
  return async (ctx, next) => {
    post(ctx);
    await next();
  };
};
