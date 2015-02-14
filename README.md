i.avdd.co
=========

## Quickstart

```bash
sudo apt-get install bundler
bundle install --path ~/.cache/$(basename $PWD).bundle
# regenerate CSS
# bundle exec sass _build/sass/avdd.scss etc/css/avdd.css
# or (in background)
# bundle exec sass --watch _build/sass/avdd.scss:etc/css/avdd.css
bundle exec jekyll serve --watch --drafts --trace --config _config.yml,_devel.yml
```

