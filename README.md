## Cutiefly - a cute url masker ✨

To get started, use `docker-compose up`. By default, the app uses `cfly.io` to mask URLs, to make the urls correct you can either

 - set the environment variable `CUTIEFLY_HOST` to another value ( like `http://localhost` )
 - include `127.0.0.1 cfly.io` in your hosts file

#### Other code

This project relies on the javascript http router `expressjs`
