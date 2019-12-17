## Books Application
---
### 1.0 - Folder Structure
```
web-books
├── package.json
├── package-lock.json
├── public
│   ├── index.html
│   └── robots.txt
├── README.md
└── src
    ├── components
    │   ├── Alert
    │   │   └── index.js
    │   ├── App
    │   │   ├── index.js
    │   │   └── style.module.css
    │   ├── Button
    │   │   ├── index.js
    │   │   └── style.module.css
    │   ├── CardList
    │   │   └── index.js
    │   ├── CartResume
    │   │   └── index.js
    │   ├── CustomCard
    │   │   └── index.js
    │   ├── CustomDialog
    │   │   └── index.js
    │   ├── Navbar
    │   │   └── index.js
    │   └── Spacing
    │       └── index.js
    ├── contexts
    │   └── bookContext.js
    ├── css
    │   ├── index.css
    │   ├── reset.css
    │   └── tokens.css
    ├── images
    ├── index.js
    ├── pages
    │   ├── BookDetail.js
    │   ├── Checkout.js
    │   ├── Home.js
    │   └── Login.js
    ├── Routes.js
    ├── serviceWorker.js
    └── utils
        ├── books.js
        ├── is-null.js
        ├── normalize.js
        ├── serialize.js
        ├── sleep.js
        ├── storage-handler.js
        └── string-is-json.js
```
#### 1.1 - ./components
Components have just visual elements, no logic in here.

#### 1.2 - ./contexts
Have all React API Context's Container's.

#### 1.3 - ./css 
CSS for hole app.

#### 1.4 - ./pages
The page itself. Build some  together components to render.

#### 1.5 - ./Routes.js
Has all app Routes and Context provider (later can separate provider into different file).

#### 1.6 - ./utils
All app utils and reusable functions.

#### 1.6.1 - ./utils/books.js
Where is locate the data
I use the following script to get the data.
``` javascript
// Url: https://www.casadocodigo.com.br/collections/todos
var json = [];
document.querySelectorAll(".vitrineDaColecao-lista li").forEach(function(item) {
  var a = item.querySelector("a");
  var image = a.querySelector("div img").src;
  json.push({image: image, title: a.title});
})
console.log(JSON.stringify(json));
```
### 2.0 - Pages
- **Login - /login**
  - is the first page user see. If user doesn't login he will be redirect into here. (using local storage to persist user login).
- **Home - /**
  - listing books getting data from context provider. When a book is clicked, use react history to push Detail route.
- **Detail - /livro/:id**
  - get a book with id from url parameter and then find in book list defined in context. When add to cart is clicked, add the book into cart context and then redirect to checkout.
- **Checkout - /checkout**
  - List all books in cart context, and display a simple form and a button to pay. When pay is clicked, shows a back button and a success message. 
