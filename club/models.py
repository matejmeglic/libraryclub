from django.db import models

# Create your models here.


class Reader(models.Model):
    name = models.CharField("Ime in priimek", max_length=20)

    class Meta:
        verbose_name = "Bralec/Bralka"
        verbose_name_plural = "Bralci"

    def __str__(self):
        return self.name


class Book(models.Model):
    reader = models.ForeignKey(Reader, on_delete=models.CASCADE)
    name = models.CharField("Naslov knjige", max_length=80)
    author = models.CharField("Avtor", max_length=80)
    description = models.TextField("Opis knjige", max_length=300)
    date_read = models.DateField("Datum")

    class Meta:
        verbose_name = "Knjiga"
        verbose_name_plural = "Knjige"

    def __str__(self):
        return self.name