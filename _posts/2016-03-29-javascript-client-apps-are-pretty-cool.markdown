---
layout: post_image
title:  "Javascript front-ends are the new hot sauce"
date:   2016-02-15 15:35:53
categories: hashcookies
image: /assets/images/api-first.png
tags: 'api-first'
author: "Milind Alvares"
---

Five years ago a good looking website that worked well on Internet Explorer was a job well done. Three years ago you weren’t competitive if responsive web design wasn’t part of your skill-set. Parallax. Webfonts. Vector graphic animation. All standard now. The web is always moving target. At Hash Cookies we’ve moved our focus to building API-first servers, with Javascript powered front-ends, _even on a smaller scale_. Allow me to explain.

Server-client separation is no new concept. Any software services company like Twitter or Instagram has an ‘API’ that feeds the client with data. What’s new is the concepts that power these platforms have made their way into tools through the hard work of some fantastic folks in the open source community. This means we don’t have to reinvent the wheel every time we attempt such a project. This means Hash Cookies, a five person team (where we use a cat to pad up our head count stat), can _quickly_ build high production quality client applications with flexible APIs, for smaller projects on tighter budgets. Take for instance an application we recently deployed: [I Speak Your Language](http://ispeakyourlanguage.com.au).

Aside from the slightly unfortunate acronym (ISYL), I Speak Your Language is a directory of health service providers with special emphasis on languages spoken, for older migrant populations in Australia. Our task was to create a website that made it simple for people with limited technical and language abilities to access that information.

Much of our approach hasn’t changed. We still put in a lot of effort in crafting the user interface, still argue over sentence structures, or semantics of UI labels. But where we would have previously built the site with a CMS like Wordpress, or serve pages from from Ruby on Rails server, we now separate the concerns of data (server) from the visual (client). A javascript client powered by the Ember framework.

### A non-technical technical explanation

Traditionally, if a user requests page ‘x’, the browser asks the server for that page, the server generates that page and sends it to the user’s browser. If a user then requests page ‘y’ (e.g. by clicking a link), the browser has to ask the server for a new page again, server generates a new page, sends it to the browser. This is now the web has worked for most of its existence and still does for most part. This start-stop experience, with a blank white screen and waiting for the server to process every request, has not been seen as a problem because we’ve accepted that that’s how the web works.

A front-end powered with javascript makes the user’s browser do all the hard work while the server purely handles data. A request for page ‘x’ or ‘y’ will send back the application structure in one response once, and the data in a separate response. The application then continues to exist on the user’s browser through the lifetime of that session, with the browser only making data requests to the server, _when required_. Which is important because if the first request had responded with the entire alphabet of items, a subsequent request to x, y, or z would not call back the server and the data would be presented instantaneously. And because we control every aspect of the client and server, we can fine tune these data payloads to common usage scenarios.

What all this boils down to is a fast desktop-like user experience where the page appears alive.

### Save in the long run

With a client side application, we can effortlessly handle calculations using the processing power of the client, so data like shopping cart totals, form validation, filtering and searching, can all happen instantaneously and without taxing the server. Why make your (expensive) server miles away do all that work when users have a powerful computer in their hands?

We also get a standards compliant API. Which means we can easily make it power a multitude of services like native mobile applications, b2b communication, and data analytics. Start small and effortlessly grow the platform as the need arises. An independent client means that if the server is overburdened, we don’t have a client that crashes along with it, such that we can show fallback data or point to a backup server.

What this means for our clients A better user experience translates to better user engagement for whatever the goals of your project. A device agnostic server means you can expand your business to more platforms, and even communicate with other platforms through a standards based api. And sticking to standards and conventions means your project’s code and API can be quickly understood and manipulated by any software developer of your choice. 

[Get in touch](mailto:fresh@hashcooki.es) if you have an interesting project in mind.
