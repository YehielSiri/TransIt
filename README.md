# TransIt
An application that aims to help shipping companies perform their job pool faster and more efficiently.

TransIt is a smart digital work scheduler.
It does this in two ways:
1. Courier collects the works for himself, instead of company will do it.
2. A smart search engine optimizes the scheduling between the all targets for the shortest route.

<div align="center">

| Deliver with TransIt |
| ------------- |
| <p align="center"><img src="https://github.com/YehielSiri/TransIt/blob/main/screenshots/1_name_%26_logo.jpg"/></p>  |
  
 </div>

 Its general design resembles an online store, and much of its internal dynamics is taken from there. Responds to a private business that has its own couriers as well as shipping companies.

-----

# Technically
Written in React Native, except for the search engine itself, so the app is compatible with iOS as well as Android. Uses MongoDB for the database and NodeJS for the server.

-----

# Methods
As a company user:
1. [ Push in jobs (and edit, delete, etc) ](#optical-flow-via-lucas-kanade)
2. [ Tracking the progress of the shipment and the progress of the messengers. ](#find-translationrigid-matrix)
3. [ A general follow-up review of their work pool and its performance. ](#image-warping)
4. [ Ranking jobs according to urgency, alongside building a bar of preferred jobs. ](#gaussian-pyramid)

As a courier user:
1. [ Fill a trunk with jobs from the pool. ](#laplacian-pyramid)
2. [ Update a job / trunk execution status. ](#image-blending)
3. [ Arrange the order of execution of the works. ]()
4. [ Accept/reject the system proposal for the execution order. ]()

<div align="center">

| The jobs pool in TransIt |
| ------------- |
| <p align="center"><img src="https://github.com/YehielSiri/TransIt/blob/main/screenshots/2_main_page.jpg"/></p>  |
  
 </div>

-----

<h2>Finding the Shortest Route</h2>
Actually, this is the Travelling Salesman Problem. This is an NPC problem which has a good enough solution until 3-4 target points.

<div align="center">

| Travelling Salesman Problem |
| ------------- |
| <p align="center"><img src="https://he.wikipedia.org/wiki/%D7%A7%D7%95%D7%91%D7%A5:Bruteforce.gif"/></p>  |
  
 </div>

Therefor, our will is one from three:
<p>    1. Optimizing an exist solution (which has built authomaticaly by the user).</p>
<p>    2. Gradually, point by point.</p>
<p>    3. An approximation algorithm.</p>


-----

# How to use

