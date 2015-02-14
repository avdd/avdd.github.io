i.avdd.co
=========

## Quickstart

```bash
sudo apt-get install bundler
bundle install --path ~/.cache/$(basename $PWD).bundle
bundle exec jekyll serve --watch --drafts --trace --config _config.yml,_devel.yml
```

