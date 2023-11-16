<p align="center">
  <a href="https://github.com/Yrobot/mail-bot" target="_blank" rel="noopener noreferrer">
    <img width="180" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDI0MCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMjQwIiByeD0iMTAiIGZpbGw9IiMwMDAwMDAiLz4KPHRleHQgeD0iMTIwIiB5PSIxNjAiIGZvbnQtc2l6ZT0iMTIwIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmYiPk1CPC90ZXh0Pgo8L3N2Zz4=" alt="logo">
  </a>
</p>
<br/>

<h2 align="center">
  <a href="https://github.com/Yrobot/mail-bot">Mail-Bot</a>
</h2>
<p align="center">
  A nice tool transform mail smtp to http request, and manage all mails in one place.
</p>

![yubEFV-13-26-09](https://images.yrobot.top/2023-11-16/yubEFV-13-26-09.png)

<!-- ## Demos -->

## How To Start

### Install [Docker]

```bash
docker run -d \
  --name mail-bot \
  -p 3000:3000 \
  -v $HOME/data/mail-bot:/app/data \
  yrobot/mail-bot:latest
```

### Add SMTP Email

- click `新建邮箱` in the `邮箱` page
- fill in the fields and click `提交`

```
Email Address: $EMAIL_ADDRESS
Host: smtp.xxx.com
Post: 465
Token: xxxxxx
```

### Test SMTP Email

- click `测试` in the Email list Actions

  or

- send POST http request to `http://localhost:3000/email/$EMAIL_ADDRESS`

```ts
// copy this code to your browser console and run

const EMAIL_ADDRESS = "xxx@xxx";
const TO_EMAIL_ADDRESS = "xxx@xxx";

(async () => {
  fetch(`http://localhost:3000/email/${EMAIL_ADDRESS}`, {
    method: "POST",
    body: JSON.stringify({
      subject: "Hi Mail-Bot",
      text: "Hello This is a test mail form Mail-Bot API",
      to: TO_EMAIL_ADDRESS,
      from: `Mail-Bot <${EMAIL_ADDRESS}>`,
    }),
  })
    .then((res) => {
      console.log(res.status);
      return res;
    })
    .then((res) => res?.text() ?? res?.json())
    .then((res) => console.log(res));
})();
```
