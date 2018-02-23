# Skeleton-Webpack-Js

Originally made by https://github.com/moniac/skeleton-webpack-js/commits?author=infantito, trying to customize it to my needs right now.

## Requirement

- Node `^6.0.0`
- yarn `>= ^0.2x.x` or npm `>= ^3.x.x` 

## Getting started

First, clone the project:

```bash
$ git clone https://github.com/infantito/skeleton-webpack-js <project-name>
$ cd <project-name>
```

Then, install the dependencies. It is recommended to use Yarn, (because it is blazing fast). You can still use npm as well.

```bash
$ yarn install # or npm install
```

## Script usage

You can execute the scripts below by `yarn run <script>` or `npm run <script>`.

| Command | Description                                                   |
|---------|---------------------------------------------------------------|
| start   | Starts webpack development server; served at `localhost:8080` |
| build   | Bundles the source in `~/build` directory                     |

## Directory structure

```
- config               # webpack configuration files
- src                  # application source code 
----- *.pug            # templates and favicon
----- components       # directory for presentational components
----- containers       # directory for container components
----- images           # directory for images
----- styles           # directory for appliaction styles (in pcss format)
--------- base         # global styles
--------- components   # styles for each components
--------- utils        # styles for variables
--------- vendor       # styles for vendors
```

<summary><strong>Issue</strong></summary>
<p>- https://github.com/tcoopman/image-webpack-loader#libpng-issues</p>
<p>- https://github.com/tomasAlabes/stylefmt-loader/issues/10</p>
<p>- HMR doesn't work on IE/Edge</p>

<summary><strong>Sadly</strong></summary>
<p>Research about gzipped</p>
<p>https://github.com/jantimon/html-webpack-harddisk-plugin</p>
<p>Optimizejs [https://github.com/vigneshshanmugam/optimize-js-plugin]</p>
<p>Purifycss</p>

<p>¡To code 💩! [\u{1f4a9}]</p>
