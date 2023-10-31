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

<!-- ## Demos -->

## How To Start

### Docker


```bash
docker run -d \
  --name mail-bot \
  -p 3000:3000 \ 
  -v $HOME/data/mail-bot:/app/data \
  yrobot/mail-bot:latest
```