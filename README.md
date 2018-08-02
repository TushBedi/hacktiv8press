# My  hacktiv8press app

##Rest API

List of User routes:

| **Route** | **HTTP** | **Description**|
|-----------|----------|----------------|
| /login     | POST     | Login user    |
| /register  | POST     | Register user |

List of Article routes:

| **Route**               | **HTTP** | **Description**|
|-------------------------|----------|----------------|
| /article                |   GET    | Get all articles uer                                              |
| /article?query          |    GET   | Get articles based on query search (either by author or category) |
| /article/:articleId     |    GET   | Get one article based on article id                               |
| /article                |   POST   | Add new article                                                   |
| /article/:articleId     |    PUT   | Update one article based on article id                            |
| /article/:articleId     |  DELETE  | Delete one article based on article id                            |
| /article/:articleId/img |   POST   | Add image to one article based on article id                      |

##Usage

```npm
npm install
npm start
```