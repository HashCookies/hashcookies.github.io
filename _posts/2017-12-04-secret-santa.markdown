---
layout: post
title:  "Secret Santa"
date:   2017-12-04 15:57:53
categories: hashcookies
author: "Milind Alvares"
description: "A little cheer before Christmas."
---

As it goes with so many things, we wrote a solution to a need we were having. There's tons of secret santa apps out there, but ours just hits the spot for us. It's just a few simple javascript functions, written within the Ember framework, that allow the anyone to:
1. Add a bunch of people and their emails.
2. Select pairs that can't draw each other,
3. And randomize the matching so that everyone gets a secret santa and is a <em>santee</em>.

This year we added the function of a wishlist, where the santee could contact their santa via a form, without knowing who they're messaging. But the application works in browser and we don't store any information in a database. What I ended up using was a simple base64 encoding that encodes the email into an obfuscated string that the user can't recognise, and reverses that when we finally need to send the email. So the entire process works in browser and the database for this is the URL itself. It's not even remotely secure, so anyone with some knowledge of how this works can reverse engineer who their santa is, but really, who wants to be that grinch?
