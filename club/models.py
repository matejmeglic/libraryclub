from django.db import models

# Create your models here.


class Reader(models.Model):
    name = models.TextField("Ime in priimek")

    class Meta:
        verbose_name = "Bralec/Bralka"
        verbose_name_plural = "Bralci"

    def __str__(self):
        return self.name


class Book(models.Model):
    reader = models.ForeignKey(Reader, on_delete=models.CASCADE)
    name = models.TextField("Naslov knjige", max_length=40)
    author = models.TextField("Avtor", max_length=40)
    description = models.TextField("Opis knjige", max_length=300)
    date_read = models.DateField("Datum")

    class Meta:
        verbose_name = "Knjiga"
        verbose_name_plural = "Knjige"

    def __str__(self):
        return self.name