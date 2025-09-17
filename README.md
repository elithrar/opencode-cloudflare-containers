## opencode + Cloudflare Containers

Just a demo. No auth. Run opencode [in server mode](https://opencode.ai/docs/server/) from a remote container, running on Cloudflare.

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
