# TransIt
An application that aims to help shipping companies perform their job pool faster and more efficiently.

TransIt is a smart digital work scheduler.
It does this in two ways:
1. Courier collects the works for himself, instead of company will do it.
2. A smart search engine optimizes the scheduling between the all targets for the shortest route.

 Its general design resembles an online store, and much of its internal dynamics is taken from there. Responds to a private business that has its own couriers as well as shipping companies.

-----

# Technically
Written in React Native, except for the search engine itself, so the app is compatible with iOS as well as Android. Uses MongoDB for the database and NodeJS for the server.

-----

Methods as a company user:
1. [ Push in jobs (and edit, delete, etc) ](#optical-flow-via-lucas-kanade)
2. [ Tracking the progress of the shipment and the progress of the messengers. ](#find-translationrigid-matrix)
3. [ A general follow-up review of their work pool and its performance. ](#image-warping)
4. [ Ranking jobs according to urgency, alongside building a bar of preferred jobs. ](#gaussian-pyramid)

Methods as a courier user:
5. [ Fill a trunk with jobs from the pool. ](#laplacian-pyramid)
6. [ Update a job / trunk execution status. ](#image-blending)
7. [ Arrange the order of execution of the works. ]()
8. [ Accept/reject the system proposal for the execution order. ]()

-----

<h2>Optical Flow By Lucas Kanade</h2>
Accepting both gray-scale and color images as an input, but working on a gray-scale copy.
Calculate the Optical Flow by the Lucas Kanade algorithm which is optimized by the Iterative Algorithm.

<div align="center">

| Lucas Kanade Output |
| ------------- |
| <p align="center"><img src=""/></p>  |
  
 </div>

-----

<h2>Find Translation/Rigid Matrix</h2>

 <div align="center">

| Find Translation Using LK |
| ------------- |
| <p align="center"><img src=""/></p>  |
  
 </div>

-----

<h2>Image Warping</h2>

 <div align="center">
 
| Image Warping |
| ------------- |
| <p align="center"><img src=""/></p>  |
  
 </div>

-----

<h2>Gaussian Pyramid</h2>
 <div align="center">
 
| Gaussian Pyramid |
| ------------- |
| <p align="center"><img src=""/></p>  |
  
 </div>

-----

<h2>Laplacian Pyramid</h2>
 <div align="center">
 
| Laplacian Pyramid |
| ------------- |
| <p align="center"><img src=""/></p>  |
  
 </div>
 
-----

<h2>Image Blending</h2>
 <div align="center">
 
| Image Blending |
| ------------- |
| <p align="center"><img src=""/></p>  |
  
 </div>
 
-----



# How to use

