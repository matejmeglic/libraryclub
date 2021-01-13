https://dev.to/shakib609/deploy-your-django-react-js-app-to-heroku-2bck

heroku config:set GITHUB_USERNAME=joesmith

heroku run python manage.py createsuperuser

django_heroku.settings(locals(), staticfiles=False)

yarn build for react
python manage.py runserver
