from django.db import models
from django.core.validators import MaxValueValidator

# Create your models here.


class Team(models.Model):
    team_name = models.CharField("Ime ekipe", max_length=20, null=False)

    class Meta:
        verbose_name = "Ekipa"
        verbose_name_plural = "Ekipe"

    def __str__(self):
        return self.team_name


class Season(models.Model):
    season_name = models.CharField("Sezona", max_length=20, null=False)
    season_start = models.DateField("Začetek", null=False)
    season_end = models.DateField("Konec", null=False)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    is_active = models.BooleanField("Aktivna", default=True)
    goal_per_month = models.BooleanField("Knjiga na mesec", default=True)
    goal_per_month_no = models.IntegerField(
        "Številko knjig na mesec",
        validators=[MaxValueValidator(10)],
        help_text="1",
        default=0,
        blank=True,
        null=True,
    )
    goal_per_season = models.BooleanField("Številko knjig na sezono", default=False)
    goal_per_season_no = models.PositiveIntegerField(
        "Število knjig na sezono",
        validators=[MaxValueValidator(500)],
        help_text="100",
        default=0,
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Sezona"
        verbose_name_plural = "Sezone"

    def __str__(self):
        return self.season_name


class Reader(models.Model):
    name = models.CharField("Ime", max_length=20, null=False)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    started_reading = models.DateField("Datum začetka branja", null=False)
    color = models.CharField("Barva", max_length=7, help_text="#3f51b5", null=False)

    class Meta:
        verbose_name = "Bralec/Bralka"
        verbose_name_plural = "Bralci"

    def __str__(self):
        return self.name


class Book(models.Model):
    reader = models.ForeignKey(Reader, on_delete=models.CASCADE)
    name = models.CharField("Naslov knjige", max_length=80, null=False)
    author = models.CharField("Avtor", max_length=80, null=False)
    pages = models.IntegerField(
        "Število strani", help_text="298", default=0, blank=False, null=False
    )
    description = models.TextField("Opis knjige", max_length=300, blank=True)
    date_read = models.DateField("Datum", null=False)

    class Meta:
        verbose_name = "Knjiga"
        verbose_name_plural = "Knjige"

    def __str__(self):
        return self.name