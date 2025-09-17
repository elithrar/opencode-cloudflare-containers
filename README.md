## opencode + Cloudflare Containers

Just a demo.

```
$ docker build --no-cache -t opencode-example .
$ npx wrangler@latest deploy
```

Then:

```
$ opencode attach https://<url-you-deployed-to>:4096
```

### License

See LICENSE file for details.
