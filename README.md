# Link shortener site

![License](https://img.shields.io/github/license/Shikiiii/link-shortener-site)

Simple website that allows shortening of links and processing the short links, alongside with authentication support & a nice-looking dashboard that allows users to view, edit & delete their links, alongside with choosing their own short code.

Built in an attempt to understand Next.js and React. Back-end made with Django.

> [!CAUTION]
> The tech stack is pretty bad. Next.js has built in API support, but these API requests are currently being re-forwarded towards Django. It is not recommend to use this project. It was meant as an easy way to learn a new framework as I already understand Django. But I cannot recommend learning from this project.

## Usage

Clone the repostitory:

```git
git clone https://github.com/Shikiiii/link-shortener-site.git 
```

Install the following:
```
Python 3.11 (or similar)
NPM 10.2.3 (or similar)
PostgreSQL
```

Setup .env & .env.local (inside frontend folder) using the .example files - if unsure, just copy & paste the contents of .example

Run setup.py:
```py
python setup.py
```

Run the backend & frontend:
```
python manage.py runserver
cd frontend && npm run dev
```

Visit https://localhost:3000 (or whatever domain you have set otherwise) 🔥

## License
This project is under the MIT license.