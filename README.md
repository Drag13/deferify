# DEFERIFY

[![Build Status](https://travis-ci.org/Drag13/deferify.svg?branch=master)](https://travis-ci.org/Drag13/deferify) ![GitHub](https://img.shields.io/github/license/drag13/deferify.svg)

## Idea

If you have SPA, you, probably, dont' want to block loading your application with synchronius scripts. If so, you can manually add [defer](https://www.w3schools.com/tags/att_script_defer.asp) or [async](https://www.w3schools.com/tags/att_script_async.asp) attributes into your scripts. But what if you use cli for generating output? This tiny CLI parse your index.html file and adds defer attribute to your scripts tag

## Benefits

Just check lighthouse reports. Left side - before, right - after. All comparsions was done on default applications produced by the corresponding cli without any additional optimisation/changes.

### @angular/CLI

*(v. 7.3.8)*

Check this two image from lighthouse. Nothing was done except deferify. Looks better, yeah?
![lighthouse comparsion for angular/cli](https://raw.githubusercontent.com/Drag13/deferify/master/readme/comparsion-angular.PNG)

### create-react-app

*(v. 16.8.6)*

![lighthouse comparsion for create-react-app](https://raw.githubusercontent.com/Drag13/deferify/master/readme/comparsion-react.PNG)

All comparsions was done 21.04.2019

## How to use

Install deferify

```cmd
npm i --save-dev deferify
```

Add it to your build process:

```json
"build:prod" : "ng build --prod && deferify {folder}/{index.html}"
```

**Don't forget to set propper path!**

## Skipped tags

Deferify will not touch scripts without src, with already added defer or async attributes.

## What about adding async

Tool should do only one thing and do it well.

## Known gaps

Right now deferify works only with index.html and doesn't support globs to check another files

*Let's do our apps better*
