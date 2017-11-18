import gulp from "gulp";
import markdown from "gulp-markdown";
import filter from "gulp-filter";
import ReactDOM from "react-dom/server";
import React from "react";
import include from "gulp-include";
import hash from "gulp-hash";
import rename from "gulp-rename";
import connect from "gulp-connect";
import postcss from "gulp-postcss";
import modules from "postcss-modules";
import concat from "gulp-concat";
import assets from "postcss-assets";
import sort from "gulp-sort";
import s2j from "gulp-sheets2json";
import xls2json from "gulp-spreadsheet2json";
import gulpXlsx from "gulp-js-xlsx";
import sequence from "gulp-sequence";
import renderToString from "gulp-render-to-string";
import paginate from "gulp-paginate";
import imagemin from "gulp-imagemin";
import replace from "./lib/plugins/replace";
import stats from "./lib/plugins/stats";
require("images-require-hook")([".svg", ".png", ".ico"], "/assets/img");

const { Page } = require('./lib/components/page');
const { Article } = require("./lib/components/article");
const { PageIndex } = require("./lib/components/page-index");

const CONSTANT = 10;

gulp.task("dev", sequence("make-site", "watch-site", "server"));

gulp.task("make-site",
  sequence(
    "stylesheets",
    "images",
    "article-stats",
    ["index-pages", "articles"],
    "articles-images"
  )
);

gulp.task("watch-site", () => {
  return gulp.watch(
    ["lib/**/*.js", "lib/**/*.css", "lib/**/*.svg", "articles/**/*"],
    ["stylesheets", "images", "index-pages", "articles"]
  );
});

gulp.task("article-stats", () => {
  return gulp.src("articles/**/*").pipe(
    stats(stats => {
      articleCount = stats.fileCount;
    })
  );
});


// gulp.task("bulid:json", function() {
//   gulp
//     .src(["xls/**/*"])
//     .pipe(filter(file => file.path.match(/test/)))
//     .pipe(
//       xls2json({
//         headRow: 1,
//         valueRowStart: 2,
//         trace: false
//       })
//     )
//     .pipe(
//       rename(path => {
//         path.extname = ".json";
//       })
//     )
//     .pipe(gulp.dest("./distxls"));
// });
//www.npmjs.com/package/gulp-js-xlsx
https: gulp.task("bulid:json", function() {
  gulp
    .src(["xls/**/*"])
    .pipe(filter(file => file.path.match(/test/)))
    .pipe(gulpXlsx.run({ parseWorksheet: "tree" }))
    .pipe(
      rename(path => {
        path.extname = ".json";
      })
    )
    .pipe(gulp.dest("./distxls"));
});

gulp.task("articles", function() {
  return gulp
    .src(["articles/**/*"])
      .pipe(filter(file => file.path.match(/chartdata/)))
      .pipe(include())
      .pipe(sort({ asc: false }))
      .pipe(rename(path => {
          console.log(path);
          path.basename += "-index";;
          path.extname = ".html";
          // path.dirname = path.dirname.replace(/\d{4}\-\d{2}\-\d{2}\-/, "");
        }))
      .pipe(renderToString(Article,{ pageCount: CONSTANT }))
      .pipe(renderToString(Page))
      .pipe(gulp.dest("./dist"));
});

gulp.task("articles-images", function() {
  return gulp
    .src([
      "articles/**/*.png",
      "articles/**/*.jpg",
      "articles/**/*.gif"
    ])
    .pipe(sort({ asc: false }))
    .pipe(
      rename(path => {
        path.dirname = path.dirname.replace(/\d{4}\-\d{2}\-\d{2}\-/, "");
      })
    )
    .pipe(imagemin())
    .pipe(gulp.dest("./dist"));
});
